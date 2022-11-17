using WebEx2.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebEx2.DAL
{
    public interface IBrukerRepository
    {
        Task<bool> Lagre(Bruker innBruker, Kunde innKunde);
        Task<List<Bruker>> HentAlle();
        Task<bool> Slett(int id);
        Task<Bruker> HentEn(int id);
        Task<bool> Endre(Bruker endreBruker);
        Task<bool> LoggInn(Kunde kunde);
        Task<Kunde> HentKundeId(Kunde kunde);
    }
}
