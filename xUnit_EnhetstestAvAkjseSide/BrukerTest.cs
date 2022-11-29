using GhostProjectv2.Controllers;
using GhostProjectv2.DAL;
using GhostProjectv2.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace xUnit_EnhetstestAvAkjseSide
{
    public class BrukerTest
    {
        /*[Fact]
        public async Task HentAlle()
        {
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

            var mock = new Mock<IBrukerRepository>();
            mock.Setup(b => b.HentAlle()).ReturnsAsync(brukerList);
            var brukerController = new BrukerController(mock.Object);
            List<Bruker> result = await BrukerController.HentAlle();
            Assert.Equal<List<Bruker>>(brukerList, result);
        }

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
                Postnr = "2234",
                Poststed = "Oslo",
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
        [Fact]
        public async Task Endre()
        {
            var innBruker = new Bruker
            {
                Id = 1,
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "2234",
                Poststed = "Oslo",
                Saldo = 0
            };
            var mock = new Mock<IBrukerRepository>();
            mock.Setup(b => b.Endre(innBruker)).ReturnsAsync(true);
            var brukerController = new BrukerController(mock.Object);
            bool resultat = await brukerController.Endre(innBruker);
            Assert.True(resultat);
        }
        [Fact]
        public async Task HentEn()
        {
            var returBruker = new Bruker
            {
                Id = 1,
                Fornavn = "Arnold",
                Etternavn = "Braunschweiger",
                Adresse = "Parkveien 11",
                Postnr = "2234",
                Poststed = "Oslo",
                Saldo = 0
            };
            var mock = new Mock<IBrukerRepository>();
            mock.Setup(b => b.HentEn(1)).ReturnsAsync(returBruker);
            var brukerController = new BrukerController(mock.Object);
            Bruker resultat = await BrukerController.HentEn(1);
            Assert.Equal<Bruker>(returBruker, resultat);
        }

        [Fact]
        public async Task Slett()
        {
            var mock = new Mock<IBrukerRepository>();
            mock.Setup(b => b.Slett(1)).ReturnsAsync(true);
            var brukerController = new BrukerController(mock.Object);
            bool result = await brukerController.Slett(1);
            Assert.True(result);
        }*/

    }
}
