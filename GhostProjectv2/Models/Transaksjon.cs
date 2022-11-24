using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{
    public class Transaksjon
    {
        public int Id { get; set; }
        [RegularExpression(@"[0-9]{1,20}$")]
        public int Volum { get; set; }
        [RegularExpression(@"[0,9]{1,30}$")]
        public int Pris { get; set; }
        [RegularExpression(@"[0,9]{1,20}$")]
        public int BrukereId { get; set; }
        [RegularExpression(@"^[a-zA-Z. \-]{3,4}$")]
        public string Ticker { get; set; }
    }
}
