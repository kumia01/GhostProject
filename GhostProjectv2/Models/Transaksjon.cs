using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{
    public class Transaksjon
    {
        public int Id { get; set; }
        //[RegularExpression(@"[0-9]{1,20}")]
        public int Volum { get; set; }
        //[RegularExpression(@"^[0-9]([\.\,][0-9]{1,10})?")]
        public double Pris { get; set; }
        //[RegularExpression(@"[0,9]{1,20}")]
        public int BrukereId { get; set; }
        //[RegularExpression(@"[0,9]{1,20}")]
        public int FlereAksjerId { get; set; }
        [RegularExpression(@"[0-9a-zA-Z. \-]{2,35}$")]
        public string Ticker { get; set; }
    }
}
