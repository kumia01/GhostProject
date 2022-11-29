using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Policy;
using System.Threading.Tasks;
using GhostProjectv2.Controllers;
using GhostProjectv2.DAL;
using GhostProjectv2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace xUnit_EnhetstestAvAkjseSide
{
    public class BrukerControllerUnitTest
    {
        private const string _loggetInn = "loggetInn";
        private const string _ikkeLoggetInn = "";

        private readonly Mock<IBrukerRepository> mockRep = new Mock<IBrukerRepository>();
        private readonly Mock<ILogger<BrukerController>> mockLog = new Mock<ILogger<BrukerController>>();

        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();

        [Fact]
        public async Task HentAlleLoggetInnOk()
        {
            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            

            var bruker1 = new Bruker
            {
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "2234",
                Poststed = "Oslo",
                Saldo = 0
            };
            var bruker2 = new Bruker
            {
                Id = 2,
                Fornavn = "Storme",
                Etternavn = "Gresvik",
                Adresse = "Grenlandsveien 22",
                Postnr = "2123",
                Poststed = "Oslo",
                Saldo = 1000

            };
            var bruker3 = new Bruker
            {
                Id = 3,
                Fornavn = "Slim",
                Etternavn = "Jimmy",
                Adresse = "Slependen 82",
                Postnr = "2310",
                Poststed = "Oslo",
                Saldo = 1792768
            };

            var brukerList = new List<Bruker>();
            brukerList.Add(bruker1);
            brukerList.Add(bruker2);
            brukerList.Add(bruker3);

            mockRep.Setup(b => b.HentAlle()).ReturnsAsync(brukerList);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;


            var resultat = await brukerController.HentAlle() as OkObjectResult;

            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<List<Bruker>>((List<Bruker>)resultat.Value, brukerList);

      

        }
    }
}
