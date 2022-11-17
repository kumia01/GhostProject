using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using WebEx2.DAL;

namespace WebEx2.Models
{
    public static class DBinit
    {

        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DB>();

                // må slette og opprette databasen hver gang når den skalinitieres (seed`es)
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                
                var poststed1 = new Poststeder { Postnr = "0372", Poststed = "Oslo" };
                //var poststed2 = new Poststeder { Postnr = "1900", Poststed = "Oslo" };
                var aksje1 = new FlereAksjer { Ticker = "NOK", Selskap = "Norske Kroner", Pris = 20, gammelPris = 1 };
                
                var bruker1 = new Brukere { Fornavn = "Ole", Etternavn = "Hansen", Adresse = "Olsloveien 82", Poststed = poststed1 };
                var bruker2 = new Brukere { Fornavn = "Jens", Etternavn = "Jenseberg", Adresse = "Svingen 2", Poststed = poststed1 };
                var bruker3 = new Brukere { Fornavn = "Per", Etternavn = "Persson", Adresse = "Grensen 22", Poststed = poststed1 };

                var transaksjon1 = new Transaksjoner { Pris = aksje1.Pris, Volum = 200 };
                var transaksjon2 = new Transaksjoner { Pris = aksje1.Pris, Volum = 20052 };



                var nyTransaksjon = new List<Transaksjoner>();
                nyTransaksjon.Add(transaksjon1);
                nyTransaksjon.Add(transaksjon2);
                bruker1.Transaksjoner = nyTransaksjon;
                aksje1.Transaksjoner = nyTransaksjon;

                var kunde1 = new Kunder();
                kunde1.Brukernavn = "OleErBest";
                string passord = "Jegheterole";
                byte[] salt = BrukerRepository.LagSalt();
                byte[] hash = BrukerRepository.LagHash(passord, salt);
                kunde1.Passord = hash;
                kunde1.Salt = salt;
                context.Kunder.Add(kunde1);

                var kunde2 = new Kunder();
                kunde2.Brukernavn = "Jensemann123";
                string passord2 = "hei123";
                byte[] salt2 = BrukerRepository.LagSalt();
                byte[] hash2 = BrukerRepository.LagHash(passord2, salt2);
                kunde2.Passord = hash2;
                kunde2.Salt = salt2;
                context.Kunder.Add(kunde2);

                var kunde3 = new Kunder();
                kunde3.Brukernavn = "RikePer";
                string passord3 = "Pererrik";
                byte[] salt3 = BrukerRepository.LagSalt();
                byte[] hash3 = BrukerRepository.LagHash(passord3, salt3);
                kunde3.Passord = hash3;
                kunde3.Salt = salt3;
                context.Kunder.Add(kunde3);

                context.Brukere.Add(bruker1);
                context.Brukere.Add(bruker2);
                context.Brukere.Add(bruker3);
                context.FlereAksjer.Add(aksje1);

                context.SaveChanges();
            }
        }
    }
}
