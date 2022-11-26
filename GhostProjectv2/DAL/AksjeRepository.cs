using GhostProjectv2.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;

namespace GhostProjectv2.DAL
{
    public class AksjeRepository : IAksjeRepository
    {
        private readonly DB _dbAksje;

        private ILogger<AksjeRepository> _log;

        public AksjeRepository(DB db, ILogger<AksjeRepository> log)
        {
            _dbAksje = db;
            _log = log;
        }

        //Henter alle aksjer fra DB og returner liste med Aksje objekter
        public async Task<List<Aksje>> HentAlle()
        {
            try
            {
                List<Aksje> alleAksjer = await _dbAksje.FlereAksjer.Select(b => new Aksje
                {
                    Id = b.Id,
                    Ticker = b.Ticker,
                    Selskap = b.Selskap,
                    Pris = b.Pris,
                    gammelPris = b.gammelPris

                }).ToListAsync();

                return alleAksjer;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }

        //Henter en aksje fra DB ved hjelp av aksje id
        public async Task<Aksje> HentEn(string ticker)
        {
            try
            {
                List<FlereAksjer> AksjeListe = await _dbAksje.FlereAksjer.Where(m => m.Ticker == ticker).ToListAsync();
                var enAksje = AksjeListe[0];
                var hentetAskje = new Aksje()
                {
                    Id = enAksje.Id,
                    Ticker = enAksje.Ticker,
                    Selskap = enAksje.Selskap,
                    Pris = enAksje.Pris,
                    gammelPris = enAksje.gammelPris
                };
                return hentetAskje;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
            
        }

        //Endrer prisen på alle aksjer i DB, setter den eldre prisen til gammelPris
        public async Task<bool> endrePris(List<Aksje> innAksje)
        {
            
            try
            {
                List<Aksje> alleAksjer = await _dbAksje.FlereAksjer.Select(b => new Aksje
                {
                    Id = b.Id
                }).ToListAsync();
                foreach (Aksje i in innAksje)
                {
                    
                    var endreobjekt = await _dbAksje.FlereAksjer.Where(m => m.Ticker == i.Ticker).ToListAsync();
                    if (endreobjekt == null)
                    {
                        foreach (Aksje j in alleAksjer)
                        {
                            if (i.Ticker == j.Ticker)
                            {
                                
                            }
                        }
                    }


                }
                await _dbAksje.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }
        
        public async Task<bool> Lagre(List<Aksje> innAskje)
        {
            Debug.WriteLine(innAskje);
            

            Debug.WriteLine(innAskje);
            try
            {
                foreach (Aksje i in innAskje)
                {
                    
                    var sjekkAksje = await _dbAksje.FlereAksjer.Where(m => m.Ticker == i.Ticker).ToListAsync();
                    Debug.WriteLine(sjekkAksje);
                    if (sjekkAksje.Count == 0)
                    {
                        var nyAksje = new FlereAksjer();
                        nyAksje.Ticker = i.Ticker;
                        nyAksje.Selskap= i.Selskap;
                        nyAksje.Pris = i.Pris;
                        nyAksje.gammelPris = i.gammelPris;
                        _dbAksje.FlereAksjer.Add(nyAksje);
                        Debug.WriteLine(nyAksje);
                    }

                }
                await _dbAksje.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
    }
    }
}
