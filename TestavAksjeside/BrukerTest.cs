using GhostProjectv2.Controllers;
using GhostProjectv2.DAL;
using GhostProjectv2.Models;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace TestavAksjeside
{
    public class BrukerTest
    {
        [Fact]
        public async Task Lagre()
        {
            //Arrange   
            var innBruker = new Bruker
            {
                Id = 1,
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Saldo = 0

            };

            var mock = new Mock<IBrukerRepository>();
            mock.Setup(b => b.Lagre(innBruker)).ReturnsAsync(true);
            var brukerController = new BrukerController(mock.Object);


            //Act
            bool result = await brukerController.Lagre(innBruker);

            //Assert
            Assert.True(result);

        }
    }
}
