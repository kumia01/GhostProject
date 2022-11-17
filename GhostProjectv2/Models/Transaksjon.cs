using System.ComponentModel.DataAnnotations;

namespace WebEx2.Models
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
        [RegularExpression(@"[0-9]{1,20}$")]
        public int FlereAksjerId { get; set; }
    }
}
