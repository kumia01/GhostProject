
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
    public class BrukerController : ControllerBase
    {
        private readonly IBrukerRepository _db;

        private ILogger<BrukerController> _log;

        public const string _loggetInn = "loggetInn";
        public const string _ikkeLoggetInn = "";

        public BrukerController(IBrukerRepository db, ILogger<BrukerController> log)
        {
            _db = db;
            _log = log; 
        }

        //Lager en ny rad i brukere tabellen med innbruker når en bruker registrerer en kunde,
        //lager også ny rad i poststeder tabellen om poststed ikke finnes fra før av
        public async Task<ActionResult> Lagre(Bruker innBruker)
        {
            
            if (ModelState.IsValid) //Sjekker regex
            {
                bool returOK = await _db.Lagre(innBruker);
                if (!returOK)
                {
                    _log.LogInformation("Brukeren ble ikke lagret!");
                    return BadRequest("Brukeren ble ikke lagret!");
                }
                return Ok("Brukeren ble lagret");
            }
            _log.LogInformation("Feil i inputvalidering!");
            return BadRequest("Feil i inputvalidering!");
        }

        //Henter alle brukere fra brukere tabellen i DB, returnerer liste av Bruker objekt
        public async Task<ActionResult> HentAlle()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            List<Bruker> alleBrukere = await _db.HentAlle();
            return Ok(alleBrukere);
        }

        //Sletter en brukerrad ved hjelp av bruker id
        public async Task<ActionResult> Slett(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn))) //Sjekker om bruker er logget inn
            {
                return Unauthorized("Du er ikke logget inn!");
            }
            bool returOK = await _db.Slett(id);
            HttpContext.Session.SetString(_loggetInn, ""); //Setter sessions til logget ut
            if (!returOK)
            {
                _log.LogInformation("Brukeren ble ikke slettet!");
                return BadRequest("Brukeren ble ikke slettet!");
            }
            return Ok("Brukeren ble slettet");
        }

        //Henter en bruker fra DB ve hjelp av bruker id
        public async Task<ActionResult> HentEn(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn))) //Sjekker at bruker er logget inn
            {
                return Unauthorized("Ikke logget inn");
            }
            Bruker enBruker = await _db.HentEn(id);
            if (enBruker == null) //Hvis bruker ikke finnes
            {
                _log.LogInformation("Fant ikke brukeren!");
                return NotFound("Fant ikke brukeren!");
            }
            return Ok(enBruker);
        }

        //Tar inn et bruker object og endrer brukeren ved hjelp av bruker id og setter ny bruker informasjon til innbruker sine properties
        public async Task<ActionResult> Endre(Bruker endreBruker)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn))) //Sjekker at bruker er logget inn
            {
                return Unauthorized("Bruker ikke logget inn!");
            }
            if (ModelState.IsValid) //Sjekker regex
            {
                bool returOK = await _db.Endre(endreBruker);
                if (!returOK)
                {
                    _log.LogInformation("Brukeren ble ikke endret!");
                    return BadRequest("Brukeren ble ikke endret!");
                }
                return Ok("Brukeren endret");
            }
            _log.LogInformation("Feil i inputvalidering!");
            return BadRequest("Feil i inputvalidering!");
            
        }

        //En bruker logger inn med brukernavn og passord, om det stemmer setter det session til _loggetInn og starter session timeren
        public async Task<ActionResult> LoggInn(Bruker innBruker)
        {
            

            if (ModelState.IsValid) //Sjekker regex
            {
                Bruker funnetBruker = await _db.LoggInn(innBruker);
                if (funnetBruker == null) //Hvis brukeren ikke finnes, passord eller brukernavn feil
                {
                    _log.LogInformation("Innlogging feilet for bruker " + innBruker.Brukernavn + "!");
                    HttpContext.Session.SetString(_loggetInn, _ikkeLoggetInn); //Setter session til ikke logget inn
                    return Ok(false);
                }
                HttpContext.Session.SetString(_loggetInn, _loggetInn); //Starter session
                return Ok(funnetBruker);
            }
            _log.LogInformation("Feil i inputvalidering!");
            return BadRequest("Feil i inputvalidering på server!");
        }

        //Tar inn et bruker objekt, sender tilbake et brukerobjekt med bruker id
        public async Task<ActionResult> HentKundeId(Bruker innBruker)
        {
            Bruker funnetKunde = await _db.HentKundeId(innBruker);
            if (funnetKunde == null)
            {
                _log.LogInformation("Fant ikke kunden!");
                return NotFound("Fant ikke kunden!");
            }
            return Ok(funnetKunde);
        }

        //Avslutter session og setter session variabelen til ikkeLoggetinn
        public void LoggUt()
        {
            HttpContext.Session.SetString(_loggetInn, _ikkeLoggetInn);
        }
    }
}
