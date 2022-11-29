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

        public async Task<bool> LagreMelding(Melding innMelding) //Tar inn et objekt av melding
        {
            try
            {
                var nyMeldingRad = new Meldinger(); //Opretter nytt objekt av Meldinger og setter innVerdiene
                nyMeldingRad.Navn = innMelding.Navn;
                nyMeldingRad.Epost = innMelding.Epost;
                nyMeldingRad.Melding = innMelding.Tekst;

                _dbMelding.Add(nyMeldingRad); //Legger til i Db
                await _dbMelding.SaveChangesAsync(); //Lagrer endringene
                return true;
            }
            catch(Exception e)
            {
                _log.LogInformation(e.Message); //Logger feilmelding
                return false;
            }
        }
    }
}
