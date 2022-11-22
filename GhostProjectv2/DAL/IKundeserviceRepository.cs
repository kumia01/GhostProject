using GhostProjectv2.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GhostProjectv2.DAL
{
    public interface IKundeserviceRepository
    {
        Task<bool> LagreMelding(Melding innMelding);
        Task<List<Melding>> HentAlleMeldinger();
    }
}
