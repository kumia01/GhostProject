using GhostProjectv2.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GhostProjectv2.DAL
{
    public interface ITransaksjonRepository
    {
        Task<bool> Lagre(Transaksjon innTransaksjon);
        Task<List<Transaksjon>> HentAlle();
        Task<List<Transaksjon>> HentBrukerTransaksjoner(int brukerId);
        Task<List<Transaksjon>> HentInnskuddUttak(int brukerId);
        Task<List<Transaksjon>> HentAksjeTransaksjoner(string ticker);
        Task<bool> EndreSaldo(Transaksjon innTransaksjon);
    }
}
