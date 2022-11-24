{/* Imports */}
import React, { Component } from 'react';

{/* Henter et bilde og gir det en id */}
import oslomet from '../img/oslomet.jpg';

{/* Henter funksjonaliteten for link fra react-router-dom */}
import { Link } from 'react-router-dom';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, Form, FormGroup, Label, Container, Col, Row } from 'reactstrap';

{/* Js klassen Handel arver fra superklassen Component */ }
export class Om extends Component {

    // Setter displayName til Historikk for eventuelle debugging meldinger
    static displayName = Om.name;

    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container>

                {/* Rad som skalerer på enhet */}
                <Row fluid="true" className="align-items-center justify-content-center">

                    {/* Kolonne som skal ta 100% av container vidde */}
                    <Col sm="12" md="6" lg="6">
                        {/* Overskrift, bruker html elementet strong for å få fet skrift */}
                        <h2 className="text-center"><strong>Om Oss</strong></h2>
                    </Col>
                </Row>

                {/* Rad som skalerer på enhet */}
                <Row fluid="true" className="align-items-center justify-content-center">

                    {/* Kolonne som bestå av tekst, i denne raden skal det være to kolonner */}
                    {/* Men, når det er en mobil eller en mindre enhet skal det bare være en kolonne */}
                    <Col md="6">
                        {/* Undertittel */}
                        <h5 className="text-center"><strong>Ghost Finance</strong></h5>

                        {/* Tekst */}
                        <p className="text-left">
                            Ghost Finance er en brukervennlig aksjehandel- og investeringsplattform.
                            Vårt mål er å gi både nybegynnere og mer erfarne aksjehandlere en høyfunksjonell og enkel plattform basert på det nordiske aksjemarkedet.
                            Alle våre ansatte er dedikerte på å lever et bra produkt og satser på at kuden blir fornøyd og gir applikasjonen en bra karakter.
                        </p>
                        <p className="text-left">
                            Vi tar ikke ansvar for store finansielle tap eller eksistensiell krise som kan medfølge ved bruk av vår platform.
                            Vi oppfordrer absolutt ikke å gå "all in" på en riskikabel aksje, selv om dette er ufattelig gøy og ganske kult.
                            Vår anbefaling er at du snakker med en økonomisk rådgiver før du tar valg som kan føre til tap av hus eller andre verdier.
                        </p>
                        <p className="text-left">
                            Plattformen vår er utviklet primært på C# og React av våre flinke og pliktoppfyllende utviklere. <br />
                            Våre utviklere: <br />
                            Thien Long Tran Nguyen - s351908 <br />
                            Gjermund Glomnes Hertzberg - s354563 <br />
                            Ersan Sinani - s333944 <br />
                            Ivanna Ustymenko -  <br />
                            Storm Villenfeldt Viken - s351936 <br />
                        </p>
                    </Col>

                    {/* Kolonne som skal bestå av bilde og informasjon om firma. Denne blir som en ny rad på mindre enheter */}
                    <Col fluid="true" md="6">
                        {/* Henter bildet fra id gitt i import */}
                        <img src={oslomet} width="450" />

                        {/* Tekst */}
                        <p>
                            Adresse: Pilestredet 35, 0166 Oslo <br />
                            Telefon: +47 46 53 47 44
                        </p>
                    </Col>
                </Row>

                {/* Rad som skal innehold link til kundeservice */}
                <Row fluid="true" className="align-items-center justify-content-center">
                    {/* Kolonne som tar halve siden, link skal stå under tekst elementene fra forrige rad */}
                    <Col md="6">
                        {/* Bruker FormGroup for å kunne lage hyperlink til en komponent */}
                        <FormGroup>
                            <Link className="link-primary" to="/kundeservice">Til kundeservice</Link>
                        </FormGroup>
                    </Col>

                    {/* Tom kolonne siden det er ønskelig at linken ligger under teksten og ikke på midten */}
                    <Col md="6"></Col>
                </Row>
            </Container>
        );
    }
}