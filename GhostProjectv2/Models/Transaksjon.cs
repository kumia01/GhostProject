using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{
    public class Transaksjon
    {
        public int Id { get; set; }
        public int Volum { get; set; }
        public double Pris { get; set; }
        public int BrukereId { get; set; }
        public int FlereAksjerId { get; set; }
        public string Ticker { get; set; }
    }
}
