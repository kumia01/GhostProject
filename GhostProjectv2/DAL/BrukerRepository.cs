using GhostProjectv2.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.Extensions.Logging;
using System;

namespace GhostProjectv2.DAL
{
    public class BrukerRepository : IBrukerRepository
    {
        private readonly DB _db;

        private ILogger<BrukerRepository> _log;

        public BrukerRepository(DB db, ILogger<BrukerRepository> log)
        {
            _db = db;
            _log = log;
        }

        //Lager en ny rad i brukere tabellen med innbruker når en bruker registrerer en kunde,
        //lager også ny rad i poststeder tabellen om poststed ikke finnes fra før av
        public async Task<bool> Lagre(Bruker innBruker)
        {
            try
            {
                var nyBrukerRad = new Brukere(); //Opretter nytt objekt av Brukere og setter verdiene
                nyBrukerRad.Fornavn = innBruker.Fornavn;
                nyBrukerRad.Etternavn = innBruker.Etternavn;
                nyBrukerRad.Adresse = innBruker.Adresse;
                nyBrukerRad.Saldo = 0; //Ny bruker får 0kr i saldo

                var nyKundeRad = new Kunder(); //Lager et nytt objekt av Kunder og setter verdiene
                nyKundeRad.Brukernavn = innBruker.Brukernavn;
                string passord = innBruker.Passord;
                byte[] salt = LagSalt(); //Kaller på lagsalt funksjonen som lager et salt
                byte[] hash = LagHash(passord, salt); //Kaller på laghash funksjonen som tar inn passord og salt og oppretter en hash-verdi
                nyKundeRad.Passord = hash;
                nyKundeRad.Salt = salt;
                passord = "";

                var sjekkPostnr = await _db.Poststeder.FindAsync(innBruker.Postnr); //Sjekker om postnr eksisterer i poststeder tabellen
                if (sjekkPostnr == null) //Hvis postnr ikke finnes lager den en ny poststed rad med nytt postnr og poststed
                {
                    var poststedsRad = new Poststeder();
                    poststedsRad.Postnr = innBruker.Postnr;
                    poststedsRad.Poststed = innBruker.Poststed;
                    nyBrukerRad.Poststed = poststedsRad;
                }
                else
                {
                    nyBrukerRad.Poststed = sjekkPostnr; //Setter postnr og poststed til allerede eksisterende postnr og poststed
                }
                _db.Brukere.Add(nyBrukerRad);
                _db.Kunder.Add(nyKundeRad);
                await _db.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return false;
            }
        }

        //Henter alle brukere fra brukere tabellen i DB, returnerer liste av Bruker objekt
        public async Task<List<Bruker>> HentAlle()
        {
            try
            {
                List<Bruker> alleBrukere = await _db.Brukere.Select(b => new Bruker //Lager en liste som går gjennom alle brukerne i brukere tabellen
                {
                    Id = b.Id,
                    Fornavn = b.Fornavn,
                    Etternavn = b.Etternavn,
                    Adresse = b.Adresse,
                    Postnr = b.Poststed.Postnr,
                    Poststed = b.Poststed.Poststed
                }).ToListAsync();
                return alleBrukere;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }
        }

        //Sletter en brukerrad ved hjelp av bruker id
        public async Task<bool> Slett(int id)
        {
            try
            {
                Brukere enDBBruker = await _db.Brukere.FindAsync(id); //Finner riktig rad i Brukerer tabellen ved hjelp av brukerid
                Kunder enDBKunde = await _db.Kunder.FindAsync(id); //Finner riktig rad i Kunder tabellen ved hjelp av brukerid
                _db.Kunder.Remove(enDBKunde); //Fjerner kunden fra kunder tabeller
                _db.Brukere.Remove(enDBBruker); //Fjerner bruker fra brukere tabellen
                await _db.SaveChangesAsync(); //Lagrer endringer
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return false;
            }
        }

        //Henter en bruker fra DB ve hjelp av bruker id
        public async Task<Bruker> HentEn(int id)
        {
            try
            {
                Brukere enBruker = await _db.Brukere.FindAsync(id); //Finner riktig rad i Kunder tabellen ved hjelp av brukerid
                Kunder enKunde = await _db.Kunder.FindAsync(id); //Finner riktig rad i Kunder tabellen ved hjelp av brukerid
                var hentetBruker = new Bruker() //Oppretter nytt bruker objekt setter properties til kunder og brukere sine properties
                {
                    Fornavn = enBruker.Fornavn,
                    Etternavn = enBruker.Etternavn,
                    Adresse = enBruker.Adresse,
                    Postnr = enBruker.Poststed.Postnr,
                    Poststed = enBruker.Poststed.Poststed,
                    Saldo = enBruker.Saldo,
                    Brukernavn = enKunde.Brukernavn
                };
                return hentetBruker;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }
        }

        //Endrer en bruker ved hjelp av bruker id og redigerer brukerraden i DB
        public async Task<bool> Endre(Bruker endreBruker)
        {
            try
            {
                var endreObjekt = await _db.Brukere.FindAsync(endreBruker.Id); //Finner riktig bruker i brukere tabellen ved hjelp av brukerid
                if (endreObjekt.Poststed.Postnr != endreBruker.Postnr) //Går bare inn om postnr er endret og ikke det samme som før
                {
                    var sjekkPostnr = _db.Poststeder.FindAsync(endreBruker.Postnr); //Sjekker om postnr finnes i posteder tabellen
                    if (sjekkPostnr == null) //Hvis postnr finnes i poststeder tabellen oppretter den en ny poststed rad i poststeder tabellen
                    {
                        var poststedsRad = new Poststeder();
                        poststedsRad.Postnr = endreBruker.Postnr;
                        poststedsRad.Poststed = endreBruker.Poststed;
                        endreObjekt.Poststed = poststedsRad;
                    }
                    else
                    {
                        endreObjekt.Poststed.Postnr = endreBruker.Postnr; //Setter postnr til allerede eksisterende postnr og posted
                    }
                }
                endreObjekt.Fornavn = endreBruker.Fornavn;
                endreObjekt.Etternavn = endreBruker.Etternavn;
                endreObjekt.Adresse = endreBruker.Adresse;
                await _db.SaveChangesAsync(); //Lagrer endringene
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return false;
            }
            return true;
        }


        public static byte[] LagHash(string passord, byte[] salt) //Tar inn passord og salt og oppretter en hash
        {
            return KeyDerivation.Pbkdf2(
                password: passord,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 1000,
                numBytesRequested: 32);
        }

        public static byte[] LagSalt() //Lager et salt
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;
        }

        public async Task<Bruker> LoggInn(Bruker innBruker)
        {
            try
            {
                Kunder funnetKunde = await _db.Kunder.FirstOrDefaultAsync(b => b.Brukernavn == innBruker.Brukernavn); //Finner riktig rad i kunder tabellen ved hjelp av brukernavn

                if (funnetKunde == null) //Hvis kunden ikke ble funnet returnerer den null
                {
                    return null;
                }
                byte[] hash = LagHash(innBruker.Passord, funnetKunde.Salt); //Lager hash ved hjelp av innPassord og salt fra kunder tabellen hvor brukernavn ble funnet
                bool ok = hash.SequenceEqual(funnetKunde.Passord); //Returnerer true om hashen stemmer overens med den i DB, false om den ikke er riktig

                if (ok) //Hvis hashen stemmer, lager den et bruker objekt med brukerid og returnerer
                {
                    var returBruker = new Bruker(); 
                    returBruker.Id = funnetKunde.Id;
                    return returBruker;
                }
                return null; //Returner null om hashen ikke stemmer
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }
        }

        public async Task<Bruker> HentKundeId(Bruker innBruker)
        {
            try
            {
                Kunder funnetKunde = await _db.Kunder.FirstOrDefaultAsync(b => b.Brukernavn == innBruker.Brukernavn); //Finner riktig rad i kunder tabellen ved hjelp av brukernavn

                byte[] hash = LagHash(innBruker.Passord, funnetKunde.Salt); //Lager hash ved hjelp av innPassord og salt fra kunder tabellen hvor brukernavn ble funnet
                bool ok = hash.SequenceEqual(funnetKunde.Passord); //Returnerer true om hashen stemmer overens med den i DB, false om den ikke er riktig

                if (ok) //Hvis hashen stemmer, lager den et bruker objekt med brukerid og returnerer
                {
                    var hentetKunde = new Bruker()
                    {
                        Id = funnetKunde.Id,
                    };
                    return hentetKunde;
                }
                return null; //Returner null om hashen ikke stemmer
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }
        }
    }
}
