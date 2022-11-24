using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{
    public class Kunde
    {
        public int Id { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public string Brukernavn { get; set; }
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$")]
        public string Passord { get; set; }
    }
}
