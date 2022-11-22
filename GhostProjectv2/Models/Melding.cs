using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{
    public class Melding
    {
        public int Id { get; set; }
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{1,35}$")]
        public string Navn { get; set; }
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
        public string Epost { get; set; }
        [RegularExpression(@"^.{5,4700}$")]
        public string Tekst { get; set; }
    }
}
