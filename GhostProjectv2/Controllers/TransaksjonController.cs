using GhostProjectv2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using GhostProjectv2.DAL;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace GhostProjectv2.Controllers
{
    [Route("[controller]/[action]")]
    public class TransaksjonController : ControllerBase
    {
        private readonly ITransaksjonRepository _db;

        private ILogger<TransaksjonController> _log;

        public TransaksjonController(ITransaksjonRepository db, ILogger<TransaksjonController> log)
        {
            _db = db;
            _log = log; 
        }


        //Lagrer en ny rad i databasen med innTransaksjon, ved kjøp og salg
        public async Task<ActionResult> Lagre(Transaksjon innTransaksjon)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }

            if (ModelState.IsValid)
            {
                bool returOK = await _db.Lagre(innTransaksjon);
                if (!returOK)
                {
                    _log.LogInformation("Transaksjonen ble ikke lagret!");
                    return BadRequest("Transaksjonen ble ikke lagret!");
                }
                return Ok("Transaksjonen ble lagret!");
            }
            _log.LogInformation("Feil i inputvalidering!");
            return BadRequest("Feil i inputvalidering!");
        }

        //Henter alle transaksjoner fra databasen og oppretter en liste med objektene
        public async Task<ActionResult> HentAlle()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }
            List<Transaksjon> alleTransaksjoner = await _db.HentAlle();
            return Ok(alleTransaksjoner);
        }

        //Henter alle transaksjoner til en bruker ved hjelp av brukerId
        public async Task<ActionResult> HentBrukerTransaksjoner(int brukerId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }
            List<Transaksjon> alleTransaksjoner = await _db.HentBrukerTransaksjoner(brukerId);
            return Ok(alleTransaksjoner);
        }
        public async Task<ActionResult> HentBrukerTransaksjonHistorikk(int brukerId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }
            List<Transaksjon> alleUnikTransaksjoner = await _db.HentBrukerTransaksjonHistorikk(brukerId);
            return Ok(alleUnikTransaksjoner);
        }


        public async Task<ActionResult> HentInnskuddUttak(int brukerId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }
            List<Transaksjon> alleTransaksjoner = await _db.HentInnskuddUttak(brukerId);
            return Ok(alleTransaksjoner);
        }


        //Henter alle transaksjoner til en aksje ved hjelp av aksjeId
        public async Task<ActionResult> HentAksjeTransaksjoner(string ticker) 
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }
            List<Transaksjon> alleTransaksjoner = await _db.HentAksjeTransaksjoner(ticker);
            return Ok(alleTransaksjoner);
        }

        public async Task<ActionResult> EndreSaldo(Transaksjon innTransaksjon)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(BrukerController._loggetInn)))
            {
                return Unauthorized();
            }
            if (ModelState.IsValid)
            {
                bool returOK = await _db.EndreSaldo(innTransaksjon);
                if (!returOK)
                {
                    _log.LogInformation("Saldoen ble ikke endret!");
                    return BadRequest("Saldoen ble ikke endret!");
                }
                return Ok("Saldoen endret");
            }
            _log.LogInformation("Feil i inputvalidering!");
            return BadRequest("Feil i inputvalidering!");
        }
    }
}