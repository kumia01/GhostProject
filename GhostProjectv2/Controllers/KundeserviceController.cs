using GhostProjectv2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using GhostProjectv2.DAL;
using Microsoft.AspNetCore.Http;

namespace GhostProjectv2.Controllers
{

    [Route("[controller]/[action]")]
    public class KundeserviceController : ControllerBase
    {
        private readonly IKundeserviceRepository _dbMelding;

        private ILogger<KundeserviceController> _log;

        public KundeserviceController(IKundeserviceRepository db, ILogger<KundeserviceController> log)
        {
            _dbMelding = db;
            _log = log;
        }

        //Henter alle aksjer fra DB og returner liste med Aksje objekter
        public async Task<ActionResult> Lagre(Melding innMelding)
        {
            if (ModelState.IsValid)
            {
                bool returOK = await _dbMelding.LagreMelding(innMelding);
                if (!returOK)
                {
                    _log.LogInformation("Meldingen ble ikke lagret!");
                    return BadRequest("Meldinge ble ikke lagret!");
                }
                return Ok("Meldingen ble lagret!");
            }
            _log.LogInformation("Feil i inputvalidering!");
            return BadRequest("Feil i inputvalidering!");
        }
        public async Task<ActionResult> HentAlle()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }
            List<Melding> alleMeldinger = await _dbMelding.HentAlleMeldinger();
            return Ok(alleMeldinger);
        }
    }
}