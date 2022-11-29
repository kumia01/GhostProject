using GhostProjectv2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security.Cryptography;
using System.Threading.Tasks;
using GhostProjectv2.DAL;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace GhostProjectv2.Controllers
{
    
    [Route("[controller]/[action]")]
    public class AksjeController : ControllerBase
    {
        private readonly IAksjeRepository _dbAksje;

        private ILogger<AksjeController> _log;

        public AksjeController(IAksjeRepository db, ILogger<AksjeController> log)
        {
            _dbAksje = db;
            _log = log;
        }

        //Henter alle aksjer fra DB og returner liste med Aksje objekter
        public async Task<ActionResult> HentAlle()
        {
            List<Aksje> alleAksjer = await _dbAksje.HentAlle();
            return Ok(alleAksjer);
        }

        //Henter en aksje fra DB ved hjelp av aksje id
        public async Task<ActionResult> HentEn(string data)
        {
            Aksje enAksje = await _dbAksje.HentEn(data);
            if (enAksje == null) //Hvis aksjen ikke finnes
            {
                _log.LogInformation("Finner ikke aksjen!");
                return NotFound("Finner ikke aksjen!");
            }
            return Ok(enAksje);
        }

        //Endrer prisen på alle aksjer i DB, setter den eldre prisen til gammelPris
        public async Task<ActionResult> endrePris(List<Aksje> innAskje)
        {
            bool returOK = await _dbAksje.endrePris(innAskje);
            if(!returOK) //Hvis endrepris returnerer false
            {
                _log.LogInformation("Prisen på aksjene ble ikke endret!");
                return BadRequest("Prisen på aksjene ble ikke endret!");
            }
            return Ok("Prisen på aksjen ble endret");
        }


        //Tar inn en liste med aksjer fra api og lagrer dem i databasen
        public async Task<ActionResult> Lagre([FromBody] List<Aksje> innAksje)
        { 
            bool returOK = await _dbAksje.Lagre(innAksje);
            if(!returOK)
            {
                _log.LogInformation("akjser ikke lagret!");
                return BadRequest("akjser ikke lagret!");
            }
            return Ok("Aksjer lagret inn i databasen");
        }
    }
}