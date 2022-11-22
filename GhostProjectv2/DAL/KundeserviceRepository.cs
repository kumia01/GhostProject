using GhostProjectv2.Models;
using GhostProjectv2.DAL;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace GhostProjectv2.DAL
{
    public class KundeserviceRepository : IKundeserviceRepository
    {
        private readonly DB _dbMelding;

        private ILogger<KundeserviceRepository> _log;

        public KundeserviceRepository(DB db, ILogger<KundeserviceRepository> log)
        {
            _dbMelding = db;
            _log = log;
        }

        public async Task<bool> LagreMelding(Melding innMelding)
        {
            try
            {
                var nyMeldingRad = new Meldinger();
                nyMeldingRad.Navn = innMelding.Navn;
                nyMeldingRad.Epost = innMelding.Epost;
                nyMeldingRad.Melding = innMelding.Tekst;

                _dbMelding.Add(nyMeldingRad);
                await _dbMelding.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }
        public async Task<List<Melding>> HentAlleMeldinger()
        {
            try
            {
                List<Melding> alleMeldinger = await _dbMelding.Meldinger.Select(b => new Melding
                {
                    Id = b.Id,
                    Navn = b.Navn,
                    Epost = b.Epost,
                    Tekst = b.Melding,
                }).ToListAsync();
                return alleMeldinger;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }
    }
}
