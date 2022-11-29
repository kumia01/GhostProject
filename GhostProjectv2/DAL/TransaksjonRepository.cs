using GhostProjectv2.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.Security.Cryptography.X509Certificates;

namespace GhostProjectv2.DAL
{
    public class TransaksjonRepository : ITransaksjonRepository
    {
        private readonly DB _db;

        private ILogger<TransaksjonRepository> _log; 
        public TransaksjonRepository(DB db, ILogger<TransaksjonRepository> log)
        {
            _db = db;
            _log = log;
        }


        //Lagrer en ny rad i databasen med innTransaksjon, ved kjøp og salg
        public async Task<bool> Lagre(Transaksjon innTransaksjon) //Tar inn et objekt av transaksjon
        {
            try
            {
                var bruker = await _db.Brukere.FindAsync(innTransaksjon.BrukereId); //Finner riktig bruker i brukere tabellen ved hjelp av brukerid
                double totalPris = innTransaksjon.Volum * innTransaksjon.Pris; //Setter totaprisen for handel til handels volumet * aksje prisen
                var nyTransaksjonsRad = new Transaksjoner(); //Oppretter nytt objekt av Transaksjoner
                var sum = bruker.Saldo - totalPris; //Setter sum til bruker sin tilgjengelige saldo - totalprisen
                if (innTransaksjon.Volum > 0) //Hvis volum er positivt altså bruker kjøper en aksje
                {
                    if (sum >= 0) //Hvis bruker sin saldo - totalpris er 0 eller større har bruker nok penger til kjøp
                    {
                        nyTransaksjonsRad.Volum = innTransaksjon.Volum;
                        nyTransaksjonsRad.Pris = innTransaksjon.Pris;
                        nyTransaksjonsRad.BrukereId = innTransaksjon.BrukereId;
                        nyTransaksjonsRad.Ticker = innTransaksjon.Ticker;
                        nyTransaksjonsRad.FlereAksjerId = innTransaksjon.FlereAksjerId;
                        bruker.Saldo -= totalPris; //Setter ny brukersaldo til saldo - totalpris

                    }
                    else if (sum < 0) //Hvis bruker sin saldo ikke har tilstrekkelig beløp
                    {
                        _log.LogInformation("Ikke tilstrekkelig beløp på konto!"); //Logger feilmelding at brukeren ikke har nok penger på konto
                        return false;
                    }
                }
                else if (innTransaksjon.Volum < 0) //Hvis volum er et negativt tall vil det si at bruker selger en aksje og derfor skal få beløpet de selger for på saldoen sin
                {
                    nyTransaksjonsRad.Volum = innTransaksjon.Volum;
                    nyTransaksjonsRad.Pris = innTransaksjon.Pris;
                    nyTransaksjonsRad.BrukereId = innTransaksjon.BrukereId;
                    nyTransaksjonsRad.Ticker = innTransaksjon.Ticker;
                    nyTransaksjonsRad.FlereAksjerId = innTransaksjon.FlereAksjerId;
                    bruker.Saldo -= totalPris; //Setter ny brukersaldo til bruker saldo - totalpris hvor totalpris er negativ og dermed vil saldo stige
                }


                _db.Transaksjoner.Add(nyTransaksjonsRad); //Lagrer transaksjonen i transaksjoner db tabell
                await _db.SaveChangesAsync(); //Lagrer endringer
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return false;
            }
        }

        //Henter alle transaksjoner fra databasen og oppretter en liste med objektene
        public async Task<List<Transaksjon>> HentAlle()
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon //Går gjennom alle radene i transaksjoner tabellen og lager en liste med alle transaksjon objektene
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    Ticker = t.Ticker

                }).ToListAsync();
                return alleTransaksjoner;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }

        }

        //Henter alle unike transaksjoner med samlet volum til en bruker ved hjelp av brukerId
        public async Task<List<Transaksjon>> HentBrukerTransaksjoner(int brukerId)
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon() //Går gjennom alle radene i transaksjoner tabellen og lager en liste med alle transaksjon objektene utenom den med ticker == NOK som er norske kroner
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    Ticker = t.Ticker,
                    FlereAksjerId = t.FlereAksjerId
                }).Where(t => t.BrukereId == brukerId && t.Ticker != "NOK").ToListAsync();
                var transaksjoner = alleTransaksjoner.GroupBy(t => t.Ticker); //Lager ny liste hvor alle transaksjonen blir gruppert ved ticker
                List<Transaksjon> nyliste = new List<Transaksjon>(); //Opretter en ny liste av transaksjon klassen
                foreach(var ticker in transaksjoner) //Går igjennom listen ved alle tickers
                {
                    var sum = 0;
                    Transaksjon nyTransaksjon = new Transaksjon(); //Oppretter nytt objekt av transaksjon klassen
                    foreach(var volum in ticker) //Går gjennom alle volum for hver ticker
                    {
                        nyTransaksjon.Ticker = volum.Ticker; //Setter ticker til denne tickeren
                        nyTransaksjon.Pris = volum.Pris; //Setter pris til denne prisen
                        sum += volum.Volum; //Adderer sammen alt volumet for alle transaksjonene med lik ticker
                    }
                    nyTransaksjon.Volum = sum; //Legger til totale volumet i objektet nyTransaksjon
                    if(sum > 0)
                    {
                        nyliste.Add(nyTransaksjon); //Hvis volumet er større enn null altså en bruker har aksjer blir transaksjon objektet lagt til i listen
                    }
                }
                return nyliste; //Returner ferdig listen

            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }

        }
        //Henter alle transaksjoner til en bruker ved hjelp av brukerId
        public async Task<List<Transaksjon>> HentBrukerTransaksjonHistorikk(int brukerId) //Tar inn brukerid
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon() //Går gjennom alle radene i transaksjoner tabellen og lager en liste med alle transaksjon objektene utenom den med ticker == NOK som er norske kroner
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    Ticker = t.Ticker,
                    FlereAksjerId = t.FlereAksjerId
                }).Where(t => t.BrukereId == brukerId && t.Ticker != "NOK").ToListAsync();
              
                return alleTransaksjoner;

            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }

        }

        public async Task<List<Transaksjon>> HentInnskuddUttak(int brukerId) //Tar inn brukerid
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon //Går gjennom alle radene i transaksjoner tabellen og lager en liste med alle transaksjon objektene hvor ticker == NOK, som vil da bli en liste med innskudd og uttak i NOK(KR)
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    Ticker = t.Ticker
                }).Where(t => t.BrukereId == brukerId && t.Ticker == "NOK").ToListAsync();
                return alleTransaksjoner;

            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return null;
            }

        }



        public async Task<bool> EndreSaldo(Transaksjon innTransaksjon) //Tar inn et objekt av klassen transaksjon
        {
            try
            {
                var endreObjekt = await _db.Brukere.FindAsync(innTransaksjon.BrukereId); //Finner riktig bruker i brukere tabellen ved hjelp av brukerid
                var nyTransaksjonRad = new Transaksjoner();

                if (innTransaksjon.Volum > 0) //Hvis saldoen som kommer inn er større enn 0 betyr det at bruker gjør innskudd
                {
                    endreObjekt.Saldo += innTransaksjon.Volum;
                    nyTransaksjonRad.Volum = innTransaksjon.Volum;
                    nyTransaksjonRad.Pris = 1; //1kr = 1kr
                    nyTransaksjonRad.BrukereId = innTransaksjon.BrukereId;
                    nyTransaksjonRad.Ticker = "NOK"; //Setter ticker til NOK for å indikere kjøp av KR ikke en aksje
                    nyTransaksjonRad.FlereAksjerId = innTransaksjon.FlereAksjerId; //Setter transaksjoner sin flereaksjerid til 811 alltid, som er id'en til norske kroner


                }
                else if (innTransaksjon.Volum < 0) //Hvis saldoen er negativ betyr det at bruker gjør et uttak
                {
                    if (innTransaksjon.Volum <= endreObjekt.Saldo) //Hvis bruker har nok på konto til å gjøre ønsket uttak
                    {
                        endreObjekt.Saldo += innTransaksjon.Volum;
                        nyTransaksjonRad.Volum = innTransaksjon.Volum;
                        nyTransaksjonRad.Pris = 1; //1kr = 1kr
                        nyTransaksjonRad.BrukereId = innTransaksjon.BrukereId;
                        nyTransaksjonRad.Ticker = "NOK"; //Setter ticker til NOK for å indikere kjøp av KR ikke en aksje
                        nyTransaksjonRad.FlereAksjerId = innTransaksjon.FlereAksjerId; //Setter transaksjoner sin flereaksjerid til 811 alltid, som er id'en til norske kroner

                    }
                    else
                    {
                        _log.LogInformation("Ikke nok penger til uttak!"); //Logger feilemelding om bruker ikke har nok penger på konto for uttak
                        return false;
                    }
                }

                _db.Transaksjoner.Add(nyTransaksjonRad); //Legger til ny transaksjon i transaksjoner tabellen
                await _db.SaveChangesAsync(); //Lagrer endringen
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return false;
            }
            return true;
        }

    }
}
