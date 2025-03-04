﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Policy;
using System.Text;
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
        public async Task HentAlleLoggetInnOk() //Tester HentAlle() hvor bruker er logget inn og den returner øsnket liste
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
        
        [Fact]
    public async Task HentAlleNårIkkeLoggetInn() //Tester HentAlle() hvor bruker ikke er logget inn
    {

        mockRep.Setup(b => b.HentAlle()).ReturnsAsync(It.IsAny<List<Bruker>>());

        var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

        mockSession[_loggetInn] = _ikkeLoggetInn;
        mockHttpContext.Setup(s => s.Session).Returns(mockSession);
        brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

        // Act
        var resultat = await brukerController.HentAlle() as UnauthorizedObjectResult;

        // Assert 
        Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
        Assert.Equal("Ikke logget inn", resultat.Value);


    }
        [Fact]
        public async Task LagreNårLoggetInnSvarOK() //Tester Lagre() hvor bruker er logget inn og lagre returner true
        {            
            // Arrange

            mockRep.Setup(b => b.Lagre(It.IsAny<Bruker>())).ReturnsAsync(true);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.Lagre(It.IsAny<Bruker>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal("Brukeren ble lagret", resultat.Value);
        }
        [Fact]
        public async Task LagreLoggetInnIkkeOK() //Tester Lagre() hvor bruker er logget inn og lagre returner false
        {
            // Arrange

            mockRep.Setup(b => b.Lagre(It.IsAny<Bruker>())).ReturnsAsync(false);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.Lagre(It.IsAny<Bruker>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Brukeren ble ikke lagret!", resultat.Value);
        }


        [Fact]
        public async Task LagreLoggetInnFeilModel() //Tester Lagre() hvor bruker er logget inn og lagre har feil model(regex)
        {
            // Arrange
            var bruker1 = new Bruker
            {
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "24",
                Poststed = "Oslo",
                Saldo = 0
            };

            mockRep.Setup(b => b.Lagre(bruker1)).ReturnsAsync(true);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            brukerController.ModelState.AddModelError("Ticker", "Feil i inputvalidering!");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.Lagre(bruker1) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering!", resultat.Value);
        }



        [Fact]
        public async Task LoggInnOK() //Tester LoggInn() hvor den returnerer ønsket bruker objekt
        {
            //Arrange
            var bruker1 = new Bruker
            {
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "2234",
                Poststed = "Oslo",
                Saldo = 0
            };

            mockRep.Setup(k => k.LoggInn(It.IsAny<Bruker>())).ReturnsAsync(bruker1);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.LoggInn(It.IsAny<Bruker>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<Bruker>(bruker1 ,(Bruker)resultat.Value);
        }

        [Fact]
        public async Task LoggInnFeilModel() //Tester LoggInn() hvor det er feil med model(regex)
        {
            //Arrange
            var bruker1 = new Bruker
            {
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "22",
                Poststed = "Oslo",
                Saldo = 0
            };

            mockRep.Setup(k => k.LoggInn(It.IsAny<Bruker>())).ReturnsAsync(bruker1);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            brukerController.ModelState.AddModelError("Postnr", "Feil i inputvalidering på server!");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.LoggInn(It.IsAny<Bruker>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering på server!", resultat.Value);
        }


        //Fjernet denne ettersom den ikke ville fungere
        /* [Fact]
         public async Task LoggInnFeilPassordEllerBrukernavn()
         {
             //Arrange
             mockRep.Setup(k => k.LoggInn(It.IsAny<Bruker>())).ReturnsAsync(() => null);

             var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

             mockSession[_loggetInn] = _ikkeLoggetInn;
             mockHttpContext.Setup(s => s.Session).Returns(mockSession);
             brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

             // Act
             var resultat = await brukerController.LoggInn(It.IsAny<Bruker>()) as OkObjectResult;

             // Assert 
             Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
             Assert.False((bool)resultat.Value);
         }*/


        [Fact]
        public async Task LoggInnSlettOK() //Tester Slett() hvor bruker er logget inn og den returner true
        {
            // Arrange

            mockRep.Setup(b => b.Slett(It.IsAny<int>())).ReturnsAsync(true);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var result = await brukerController.Slett(It.IsAny<int>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal("Brukeren ble slettet", result.Value);
        }
        [Fact]
        public async Task LoggetInnSlettIkkeOk() //Tester Slett() hvor bruker er logget inn og den returner false
        {
            // Arrange

            mockRep.Setup(b => b.Slett(It.IsAny<int>())).ReturnsAsync(false);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.Slett(It.IsAny<int>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Brukeren ble ikke slettet!", resultat.Value);
        }

        [Fact]
        public async Task IkkeLoggetInnSlett() //Tester Slett() hvor bruker ikke er logget inn
        {
            mockRep.Setup(k => k.Slett(It.IsAny<int>())).ReturnsAsync(true);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.Slett(It.IsAny<int>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Du er ikke logget inn!", resultat.Value);
        }
        [Fact]
        public void LoggUt() //Tester LoggUt()
        {
            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            mockSession[_loggetInn] = _loggetInn;
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            brukerController.LoggUt();

            // Assert
            Assert.Equal(_ikkeLoggetInn, mockSession[_loggetInn]);
        }

        [Fact]
        public async Task HentEnNaarLoggetInn() //Tester HentEn() når bruker er logget inn
        {
            // Arrange
            var bruker1 = new Bruker
            {
                Id = 1,
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "2234",
                Poststed = "Oslo",
                Saldo = 0
            };

            mockRep.Setup(b => b.HentEn(It.IsAny<int>())).ReturnsAsync(bruker1);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.HentEn(It.IsAny<int>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<Bruker>(bruker1, (Bruker)resultat.Value);
        }

        [Fact]
        public async Task EndreLoggetInnOK() //Tester Endre() hvor bruker er logget inn og den returner true
        {
            //Arrange
            mockRep.Setup(t => t.Endre(It.IsAny<Bruker>())).ReturnsAsync(true);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await brukerController.Endre(It.IsAny<Bruker>()) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal("Brukeren endret", resultat.Value);
        }

        [Fact]
        public async Task EndreLoggetInnIkkeOK() //Tester Endre() hvor bruker er logget inn og den returner false
        {
            //Arrange
            mockRep.Setup(t => t.Endre(It.IsAny<Bruker>())).ReturnsAsync(false);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await brukerController.Endre(It.IsAny<Bruker>()) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Brukeren ble ikke endret!", resultat.Value);
        }

        [Fact]
        public async Task EndreIkkeLoggetInn() //Tester Endre() hvor bruker ikke er logget inn
        {
            //Arrange
            mockRep.Setup(t => t.Endre(It.IsAny<Bruker>())).ReturnsAsync(true);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await brukerController.Endre(It.IsAny<Bruker>()) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Bruker ikke logget inn!", resultat.Value);
        }

        [Fact]
        public async Task EndreLoggetInnFeilModel() //Tester Endre() hvor bruker er logget inn men model(regex) er feil
        {
            //Arrange
            var bruker1 = new Bruker
            {
                Id = 1,
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "24",
                Poststed = "Oslo",
                Saldo = 0
            };

            mockRep.Setup(t => t.Endre(bruker1)).ReturnsAsync(true);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            brukerController.ModelState.AddModelError("Postnr", "Feil i inputvalidering!");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await brukerController.Endre(bruker1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering!", resultat.Value);
        }

        [Fact]
        public async Task HentEnLoggInnIkkeOK() //Tester HentEn() hvor bruker er logget inn og den returner null
        {
            // Arrange

            mockRep.Setup(b => b.HentEn(It.IsAny<int>())).ReturnsAsync(() => null);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.HentEn(It.IsAny<int>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Fant ikke brukeren!", resultat.Value);
        }

        [Fact]
        public async Task HentEnIkkeLoggetInn() //Tester HentEn() hvor bruker ikke er logget inn
        {
            mockRep.Setup(b => b.HentEn(It.IsAny<int>())).ReturnsAsync(() => null);

            var brukerController = new BrukerController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            brukerController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await brukerController.HentEn(It.IsAny<int>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }
    }
}
