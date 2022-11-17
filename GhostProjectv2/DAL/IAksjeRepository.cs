using WebEx2.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebEx2.DAL
{
    public interface IAksjeRepository
    {
        Task<List<Aksje>> HentAlle();
        Task<Aksje> HentEn(int id);
        Task<bool> endrePris();

    }
}
