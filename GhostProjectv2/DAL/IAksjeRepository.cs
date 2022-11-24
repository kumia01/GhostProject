using GhostProjectv2.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GhostProjectv2.DAL
{
    public interface IAksjeRepository
    {
        Task<List<Aksje>> HentAlle();
        Task<Aksje> HentEn(int id);
        Task<bool> endrePris(List<Aksje> innAskje);
        Task<bool> Lagre(List<Aksje> innAskje);

    }
}
