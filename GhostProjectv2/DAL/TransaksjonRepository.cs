using GhostProjectv2.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<bool> Lagre(Transaksjon innTransaksjon)
        {
            try
            {
                var bruker = await _db.Brukere.FindAsync(innTransaksjon.BrukereId);
                double totalPris = innTransaksjon.Volum * innTransaksjon.Pris;
                var nyTransaksjonsRad = new Transaksjoner();

                if (innTransaksjon.Volum > 0) //Hvis volum er positivt altså bruker kjøper en aksje
                {
                    if (bruker.Saldo - totalPris >= 0) //Hvis bruker sin saldo - total kostnad er 0 eller større har bruker nok penger til kjøp
                    {
                        nyTransaksjonsRad.Volum = innTransaksjon.Volum;
                        nyTransaksjonsRad.Pris = innTransaksjon.Pris;
                        nyTransaksjonsRad.BrukereId = innTransaksjon.BrukereId;
                        nyTransaksjonsRad.Ticker = innTransaksjon.Ticker;
                        nyTransaksjonsRad.FlereAksjerId = innTransaksjon.FlereAksjerId;
                        bruker.Saldo = bruker.Saldo - totalPris; //Setter ny brukersaldo til saldo - kjøpspris

                    }
                    else if (bruker.Saldo - totalPris < 0) //Hvis bruker sin saldo ikke har tilstrekkelig beløp
                    {
                        _log.LogInformation("Ikke tilstrekkelig beløp på konto!");
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
                    bruker.Saldo = bruker.Saldo + (-1 * totalPris); //Setter ny brukersaldo til bruker saldo + salgspris
                }


                _db.Transaksjoner.Add(nyTransaksjonsRad);
                await _db.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        //Henter alle transaksjoner fra databasen og oppretter en liste med objektene
        public async Task<List<Transaksjon>> HentAlle()
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon
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
                _log.LogInformation(e.Message);
                return null;
            }

        }

        //Henter alle transaksjoner til en bruker ved hjelp av brukerId
        public async Task<List<Transaksjon>> HentBrukerTransaksjoner(int brukerId)
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    Ticker = t.Ticker
                }).Where(t => t.BrukereId == brukerId && t.Ticker != "NOK").ToListAsync();
                return alleTransaksjoner;

            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }

        }


        public async Task<List<Transaksjon>> HentInnskuddUttak(int brukerId)
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon
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
                _log.LogInformation(e.Message);
                return null;
            }

        }


        //Henter alle transaksjoner til en aksje ved hjelp av aksjeId
        public async Task<List<Transaksjon>> HentAksjeTransaksjoner(string ticker)
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    Ticker = t.Ticker
                }).Where(t => t.Ticker == ticker).ToListAsync();
                return alleTransaksjoner;

            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }


        public async Task<bool> EndreSaldo(Transaksjon innTransaksjon)
        {
            try
            {
                var endreObjekt = await _db.Brukere.FindAsync(innTransaksjon.BrukereId);
                var nyTransaksjonRad = new Transaksjoner();
                Console.Write("111");
                Console.Write(innTransaksjon.Volum);

                if (innTransaksjon.Volum > 0) //Hvis saldoen som kommer inn er større enn 0 betyr det at bruker gjør innskudd
                {
                    Console.Write("222");
                    Console.Write(innTransaksjon.Volum);
                    endreObjekt.Saldo += innTransaksjon.Volum;
                    nyTransaksjonRad.Volum = innTransaksjon.Volum;
                    nyTransaksjonRad.Pris = 1;
                    nyTransaksjonRad.BrukereId = innTransaksjon.BrukereId;
                    nyTransaksjonRad.Ticker = "NOK";
                    nyTransaksjonRad.FlereAksjerId = innTransaksjon.FlereAksjerId;


                }
                else if (innTransaksjon.Volum < 0) //Hvis saldoen er negativ betyr det at bruker gjør et uttak
                {
                    if (innTransaksjon.Volum <= endreObjekt.Saldo) //Hvis bruker har nok på konto til å gjøre ønsket uttak
                    {
                        endreObjekt.Saldo += innTransaksjon.Volum;
                        nyTransaksjonRad.Volum = innTransaksjon.Volum;
                        nyTransaksjonRad.Pris = 1;
                        nyTransaksjonRad.BrukereId = innTransaksjon.BrukereId;
                        nyTransaksjonRad.Ticker = "NOK";
                        nyTransaksjonRad.FlereAksjerId = innTransaksjon.FlereAksjerId;
                        
                    }
                    else
                    {
                        _log.LogInformation("Ikke nok penger til uttak!");
                        return false;
                    }
                }

                _db.Transaksjoner.Add(nyTransaksjonRad);
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
            return true;
        }

    }
}
