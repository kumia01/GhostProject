using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{

    //Oppretter tabellen brukere, med forhold til Poststeder og Transaksjoner
    public class Brukere
    {
        public int Id { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string Adresse { get; set; }
        public double Saldo { get; set; }
        virtual public Poststeder Poststed { get; set; } //Oppretter forhold mellom posteder og brukere hvor en bruker kan ha ett poststed
        virtual public List<Transaksjoner> Transaksjoner { get; set; } //Oppretter forhold mellom transaksjoner og brukere hvor en bruker kan ha flere transaksjoner
    }

    //Oppretter tabellen poststeder, med forhold til Brukere
    public class Poststeder
    {
        [Key]
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Postnr { get; set; }
        public string Poststed { get; set; }
        virtual public List<Brukere> Brukere { get; set; } //Oppretter forhold mellom brukere og poststeder, hvor et posted kan ha flere brukere
    }

    public class Kunder
    {
        public int Id { get; set; }
        public string Brukernavn { get; set; }
        public byte[] Passord { get; set; }
        public byte[] Salt { get; set; }
    }


    //Oppretter tabellen FlereAksjer, med forhold til Transaksjoner
    public class FlereAksjer
    {
        public int Id { get; set; }
        public string Ticker { get; set; }
        public string Selskap { get; set; }
        public double Pris { get; set; }
        public double gammelPris { get; set; }
        virtual public List<Transaksjoner> Transaksjoner { get; set; } //Oppretter forhold mellom Transaksjoner og flereAksjer hvor en Aksje kan ha flere transaksjoner

    }

    //Oppretter tabellen transaksjoner, med forhold til Brukere og FlereAksjer
    public class Transaksjoner
    {
        public int Id { get; set; }
        public int Volum { get; set; }
        public double Pris { get; set; }
        public int BrukereId { get; set; }
        public int FlereAksjerId { get; set; }
        public string Ticker { get; set; }
        virtual public Brukere Brukere { get; set; } //Oppretter forhold mellom Brukere og transaksjoner hvor en transaksjon kan ha en bruker
        virtual public FlereAksjer FlereAksjer { get; set; } //Oppretter forhold mellom flereaksjer og transaksjoner hvor en transaksjon kan ha en aksje
    }

    public class Meldinger
    {
        public int Id { get; set; }
        public string Navn { get; set; }
        public string Epost { get; set; }
        public string Melding { get; set; }
    }

    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        virtual public DbSet<Brukere> Brukere { get; set; }
        virtual public DbSet<FlereAksjer> FlereAksjer { get; set; }
        virtual public DbSet<Poststeder> Poststeder { get; set; }
        virtual public DbSet<Transaksjoner> Transaksjoner { get; set; }
        virtual public DbSet<Kunder> Kunder { get; set; }
        virtual public DbSet<Meldinger> Meldinger { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // må importere pakken Microsoft.EntityFrameworkCore.Proxies
            // og legge til"viritual" på de attriuttene som ønskes å lastes automatisk (LazyLoading)
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
