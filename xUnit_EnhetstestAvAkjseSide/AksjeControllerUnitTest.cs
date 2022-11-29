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
    public class AksjeControllerUnitTest
    {
        private readonly Mock<IAksjeRepository> mockRep = new Mock<IAksjeRepository>();
        private readonly Mock<ILogger<AksjeController>> mockLog = new Mock<ILogger<AksjeController>>();

        [Fact]
        public async Task HentAlleOK() //Tester HentAlle() hvor alle aksjene blir hentet
        {
            //Arrange
            var aksje1 = new Aksje { Id = 1, Ticker = "TRAB", Selskap = "Trabanzospor", Pris = 10, gammelPris = 20 };
            var aksje2 = new Aksje { Id = 2, Ticker = "LSK", Selskap = "Lillestrøm Sportsklubb", Pris = 6900, gammelPris = 68 };
            var aksje3 = new Aksje { Id = 3, Ticker = "GOBA", Selskap = "GoBastards", Pris = 1, gammelPris = 2 };

            var aksjeList = new List<Aksje>();
            aksjeList.Add(aksje1);
            aksjeList.Add(aksje2);
            aksjeList.Add(aksje3);

            mockRep.Setup(k => k.HentAlle()).ReturnsAsync(aksjeList);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.HentAlle() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<List<Aksje>>((List<Aksje>)resultat.Value, aksjeList);
        }

        [Fact]
        public async Task HentEnOK() //Tester HentEn() hvor aksjen blir funnet
        {
            //Arrange
            var aksje1 = new Aksje() { Id = 2, Ticker = "LSK", Selskap = "Lillestrøm Sportsklubb", Pris = 6900, gammelPris = 68 };

            mockRep.Setup(k => k.HentEn(It.IsAny<String>())).ReturnsAsync(aksje1);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.HentEn(It.IsAny<string>()) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<Aksje>(aksje1, (Aksje)resultat.Value);
        }

        [Fact]
        public async Task HentEnIkkeFunnetAksje() //Tester HentEn() hvor aksjen ikke blir funnet
        {
            //Arrange 
            mockRep.Setup(k => k.HentEn(It.IsAny<string>())).ReturnsAsync(()=>null);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.HentEn(It.IsAny<string>()) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Finner ikke aksjen!", resultat.Value);
        }

        [Fact]
        public async Task endrePrisOK() //Tester endrePris() hvor den returnerer true
        {
            //Arrange
            mockRep.Setup(k => k.endrePris(It.IsAny<List<Aksje>>())).ReturnsAsync(true);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.endrePris(It.IsAny<List<Aksje>>()) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal("Prisen på aksjen ble endret", resultat.Value);
        }

        [Fact]
        public async Task endrePrisIkkeOK() //Tester endrePris() hvor den returnerer false
        {
            //Arrange
            mockRep.Setup(k => k.endrePris(It.IsAny<List<Aksje>>())).ReturnsAsync(false);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.endrePris(It.IsAny<List<Aksje>>()) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Prisen på aksjene ble ikke endret!", resultat.Value);

        }

        [Fact]
        public async Task LagreOK() //Tester Lagre() hvor den returnerer true
        {
            //Arrange
            mockRep.Setup(k => k.Lagre(It.IsAny<List<Aksje>>())).ReturnsAsync(true);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.Lagre(It.IsAny<List<Aksje>>()) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal("Aksjer lagret inn i databasen", resultat.Value);
        }

        [Fact]
        public async Task LagreIkkeOK() //Tester Lagre() hvor den returnerer false
        {
            //Arrange
            mockRep.Setup(k => k.Lagre(It.IsAny<List<Aksje>>())).ReturnsAsync(false);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.Lagre(It.IsAny<List<Aksje>>()) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("akjser ikke lagret!", resultat.Value);
        }
    }
}
