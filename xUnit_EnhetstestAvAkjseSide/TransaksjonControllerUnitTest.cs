using System;
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
    public class TransaksjonControllerUnitTest
    {
        private const string _loggetInn = "loggetInn";
        private const string _ikkeLoggetInn = "";

        private readonly Mock<ITransaksjonRepository> mockRep = new Mock<ITransaksjonRepository>();
        private readonly Mock<ILogger<TransaksjonController>> mockLog = new Mock<ILogger<TransaksjonController>>();

        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();


        [Fact]
        public async Task LagreLoggetInnOK()
        {
            //Arrange
            mockRep.Setup(t => t.Lagre(It.IsAny<Transaksjon>())).ReturnsAsync(true);

            var transaksjonController = new TransaksjonController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            transaksjonController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await transaksjonController.Lagre(It.IsAny<Transaksjon>()) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal("Transaksjonen ble lagret!", resultat.Value);
        }

        [Fact]
        public async Task LagreLoggetInnIkkeOK()
        {
            //Arrange
            mockRep.Setup(t => t.Lagre(It.IsAny<Transaksjon>())).ReturnsAsync(false);

            var transaksjonController = new TransaksjonController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            transaksjonController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await transaksjonController.Lagre(It.IsAny<Transaksjon>()) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Transaksjonen ble ikke lagret!", resultat.Value);
        }

        [Fact]
        public async Task LagreLoggetInnFeilModel()
        {
            //Arrange
            var transaksjon1 = new Transaksjon {Id=1, Volum=2000, Pris=400, BrukereId=2, Ticker="G", FlereAksjerId=2 };

            mockRep.Setup(t => t.Lagre(transaksjon1)).ReturnsAsync(true);

            var transaksjonController = new TransaksjonController(mockRep.Object, mockLog.Object);

            transaksjonController.ModelState.AddModelError("Ticker", "Feil i inputvalidering!");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            transaksjonController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await transaksjonController.Lagre(transaksjon1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering!", resultat.Value);
        }

        [Fact]
        public async Task LagreIkkeLoggetInn()
        {
            //Arrange
            mockRep.Setup(t => t.Lagre(It.IsAny<Transaksjon>())).ReturnsAsync(true);

            var transaksjonController = new TransaksjonController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            transaksjonController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await transaksjonController.Lagre(It.IsAny<Transaksjon>()) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);

        }

        [Fact]
        public async Task HentAlleLoggetInnOK()
        {
            //Arrange
            var transaksjon1 = new Transaksjon { Id = 1, Volum = 2000, Pris = 400, BrukereId = 2, Ticker = "GUBA", FlereAksjerId = 2 };
            var transaksjon2 = new Transaksjon { Id = 2, Volum = 500000, Pris = 89, BrukereId = 1, Ticker = "SIUU", FlereAksjerId = 12 };
            var transaksjon3 = new Transaksjon { Id = 3, Volum = 20, Pris = 8000, BrukereId = 2, Ticker = "GDOG", FlereAksjerId = 1 };

            var transaksjonList = new List<Transaksjon>();
            transaksjonList.Add(transaksjon1);
            transaksjonList.Add(transaksjon2);
            transaksjonList.Add(transaksjon3);

            mockRep.Setup(t => t.HentAlle()).ReturnsAsync(transaksjonList);

            var transaksjonController = new TransaksjonController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            transaksjonController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await transaksjonController.HentAlle() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<List<Transaksjon>>((List<Transaksjon>)resultat.Value, transaksjonList);
        }

        [Fact]
        public async Task HentAlleIkkeLoggetInn()
        {
            //Arrange
            mockRep.Setup(t => t.HentAlle()).ReturnsAsync(It.IsAny<List<Transaksjon>>);

            var transaksjonController = new TransaksjonController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            transaksjonController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await transaksjonController.HentAlle() as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn!", resultat.Value);
        }

        [Fact]
        public async Task HentBrukerTransaksjonerLoggetInn()
        {
            //Arrange
            var transaksjon1 = new Transaksjon { Id = 1, Volum = 2000, Pris = 400, BrukereId = 2, Ticker = "GUBA", FlereAksjerId = 2 };
            var transaksjon2 = new Transaksjon { Id = 2, Volum = 500000, Pris = 89, BrukereId = 2, Ticker = "SIUU", FlereAksjerId = 12 };
            var transaksjon3 = new Transaksjon { Id = 3, Volum = 20, Pris = 8000, BrukereId = 2, Ticker = "GDOG", FlereAksjerId = 1 };

            var transaksjonList = new List<Transaksjon>();
            transaksjonList.Add(transaksjon1);
            transaksjonList.Add(transaksjon2);
            transaksjonList.Add(transaksjon3);

            mockRep.Setup(t => t.HentBrukerTransaksjoner(It.IsAny<int>())).ReturnsAsync(transaksjonList);

            var transaksjonController = new TransaksjonController(mockRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            transaksjonController.ControllerContext.HttpContext = mockHttpContext.Object;

            //Act
            var resultat = await transaksjonController.HentBrukerTransaksjoner(It.IsAny<int>()) as OkObjectResult;
        }
    }
}
