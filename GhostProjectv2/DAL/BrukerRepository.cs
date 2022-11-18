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
                var nyBrukerRad = new Brukere();
                nyBrukerRad.Fornavn = innBruker.Fornavn;
                nyBrukerRad.Etternavn = innBruker.Etternavn;
                nyBrukerRad.Adresse = innBruker.Adresse;

                var nyKundeRad = new Kunder();
                nyKundeRad.Brukernavn = innBruker.Brukernavn;
                string passord = innBruker.Passord;
                byte[] salt = LagSalt();
                byte[] hash = LagHash(passord, salt);
                nyKundeRad.Passord = hash;
                nyKundeRad.Salt = salt;
                passord = "";

                var sjekkPostnr = await _db.Poststeder.FindAsync(innBruker.Postnr);
                if (sjekkPostnr == null)
                {
                    var poststedsRad = new Poststeder();
                    poststedsRad.Postnr = innBruker.Postnr;
                    poststedsRad.Poststed = innBruker.Poststed;
                    nyBrukerRad.Poststed = poststedsRad;
                }
                else
                {
                    nyBrukerRad.Poststed = sjekkPostnr;
                }
                _db.Brukere.Add(nyBrukerRad);
                _db.Kunder.Add(nyKundeRad);
                await _db.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        //Henter alle brukere fra brukere tabellen i DB, returnerer liste av Bruker objekt
        public async Task<List<Bruker>> HentAlle()
        {
            try
            {
                List<Bruker> alleBrukere = await _db.Brukere.Select(b => new Bruker
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
                _log.LogInformation(e.Message);
                return null;
            }
        }

        //Sletter en brukerrad ved hjelp av bruker id
        public async Task<bool> Slett(int id)
        {
            try
            {
                Brukere enDBBruker = await _db.Brukere.FindAsync(id);
                Kunder enDBKunde = await _db.Kunder.FindAsync(id);
                _db.Kunder.Remove(enDBKunde);
                _db.Brukere.Remove(enDBBruker);
                await _db.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        //Henter en bruker fra DB ve hjelp av bruker id
        public async Task<Bruker> HentEn(int id)
        {
            try
            {
                Brukere enBruker = await _db.Brukere.FindAsync(id);
                Kunder enKunde = await _db.Kunder.FindAsync(id);
                var hentetBruker = new Bruker()
                {
                    Fornavn = enBruker.Fornavn,
                    Etternavn = enBruker.Etternavn,
                    Adresse = enBruker.Adresse,
                    Postnr = enBruker.Poststed.Postnr,
                    Poststed = enBruker.Poststed.Poststed,
                    Brukernavn = enKunde.Brukernavn
                };
                return hentetBruker;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }

        //Endrer en bruker ved hjelp av bruker id og redigerer brukerraden i DB
        public async Task<bool> Endre(Bruker endreBruker)
        {
            try
            {
                var endreObjekt = await _db.Brukere.FindAsync(endreBruker.Id);
                if (endreObjekt.Poststed.Postnr != endreBruker.Postnr)
                {
                    var sjekkPostnr = _db.Poststeder.Find(endreBruker.Postnr);
                    if (sjekkPostnr == null)
                    {
                        var poststedsRad = new Poststeder();
                        poststedsRad.Postnr = endreBruker.Postnr;
                        poststedsRad.Poststed = endreBruker.Poststed;
                        endreObjekt.Poststed = poststedsRad;
                    }
                    else
                    {
                        endreObjekt.Poststed.Postnr = endreBruker.Postnr;
                    }
                }
                endreObjekt.Fornavn = endreBruker.Fornavn;
                endreObjekt.Etternavn = endreBruker.Etternavn;
                endreObjekt.Adresse = endreBruker.Adresse;
                await _db.SaveChangesAsync();
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
            return true;
        }


        public static byte[] LagHash(string passord, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                password: passord,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 1000,
                numBytesRequested: 32);
        }

        public static byte[] LagSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;
        }

        public async Task<bool> LoggInn(Bruker innBruker)
        {
            try
            {
                Kunder funnetKunde = await _db.Kunder.FirstOrDefaultAsync(b => b.Brukernavn == innBruker.Brukernavn);

                byte[] hash = LagHash(innBruker.Passord, funnetKunde.Salt);
                bool ok = hash.SequenceEqual(funnetKunde.Passord);

                if (ok)
                {
                    return true;
                }
                return false;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<Bruker> HentKundeId(Bruker innBruker)
        {
            try
            {
                Kunder funnetKunde = await _db.Kunder.FirstOrDefaultAsync(b => b.Brukernavn == innBruker.Brukernavn);
                var hentetKunde = new Bruker()
                {
                    Id = funnetKunde.Id,
                };
                return hentetKunde;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }
    }
}
