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
    public class KundeServiceControllerUnitTest
    {
        private const string _loggetInn = "loggetInn";
        private const string _ikkeLoggetInn = "";

        private readonly Mock<IKundeserviceRepository> mockRep = new Mock<IKundeserviceRepository>();
        private readonly Mock<ILogger<KundeserviceController>> mockLog = new Mock<ILogger<KundeserviceController>>();

        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();

        [Fact]
        public async Task LagreOK()
        {
            //Arrange
            mockRep.Setup(t => t.LagreMelding(It.IsAny<Melding>())).ReturnsAsync(true);

            var kundeserviceController = new KundeserviceController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await kundeserviceController.LagreMelding(It.IsAny<Melding>()) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal("Meldingen ble lagret!", resultat.Value);
        }

        [Fact]
        public async Task LagreIkkeOK()
        {
            //Arrange
            mockRep.Setup(t => t.LagreMelding(It.IsAny<Melding>())).ReturnsAsync(false);

            var kundeserviceController = new KundeserviceController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await kundeserviceController.LagreMelding(It.IsAny<Melding>()) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Meldingen ble ikke lagret!", resultat.Value);
        }

        [Fact]
        public async Task LagreFeilModel()
        {
            //Arrange
            var melding1 = new Melding { Id = 1, Epost="kåreWillock.gmail.com", Navn="Kåre Willock", Tekst ="Absolutt nydelig aksjehandelplattform!!!" };

            mockRep.Setup(t => t.LagreMelding(melding1)).ReturnsAsync(true);

            var kundeserviceController = new KundeserviceController(mockRep.Object, mockLog.Object);

            kundeserviceController.ModelState.AddModelError("Epost", "Feil i inputvalidering!");

            //Act
            var resultat = await kundeserviceController.LagreMelding(melding1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering!", resultat.Value);
        }
    }
}
