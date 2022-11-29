{/* Imports */}
import React, { Component } from 'react';

{/* Henter et bilde og gir det en id */}
import oslomet from '../img/oslometp35.jpg';

{/* Henter funksjonaliteten for link fra react-router-dom */}
import { Link } from 'react-router-dom';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { FormGroup, Container, Col } from 'reactstrap';

{/* Js klassen Handel arver fra superklassen Component */ }
export class Om extends Component {

    // Setter displayName til Historikk for eventuelle debugging meldinger
    static displayName = Om.name;

    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container fluid="true" className="wrapperAbout">
                <Col fluid="true" className="align-items-center justify-content-md-center col-md-auto">
                    
                    {/* Overskrift, bruker html elementet strong for å få fet skrift */}
                    <h2 className="text-center pb-3"><strong>Om oss</strong></h2>

                    {/* Henter bildet fra id gitt i import */}
                    <img src={oslomet} className="oslomet" />

                    {/* Tekst */}
                    <p>
                        Adresse: Pilestredet 35, 0166 Oslo <br />
                        Telefon: +47 46 53 47 44
                    </p>
                    
                        {/* Undertittel */}
                        <h5 className="text-center p-2"><strong>Ghost Finance</strong></h5>

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
                        <br />
                            Våre utviklere: <br />
                            Kandidatnummer - 684 <br />
                            Kandidatnummer - 665 <br />
                            Kandidatnummer - 689 <br />
                            Kandidatnummer - 576 <br />
                            Kandidatnummer - 635 <br />
                        </p>
                    
                        {/* Bruker FormGroup for å kunne lage hyperlink til en komponent */}
                        <FormGroup>
                            <Link className="link-primary" to="/kundeservice">Til kundeservice</Link>
                        </FormGroup>

                </Col>
                    {/* Tom kolonne siden det er ønskelig at linken ligger under teksten og ikke på midten */}

            </Container>
        );
    }
}