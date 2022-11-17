using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{
    public class Aksje
    {
        public int Id { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{3}$")]
        public string Ticker { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public string Selskap { get; set; }
        [RegularExpression(@"[0-9]{1,20}$")]
        public int Pris { get; set; }
        [RegularExpression(@"[0-9]{1,20}$")]
        public int gammelPris { get; set; }

    }
}
