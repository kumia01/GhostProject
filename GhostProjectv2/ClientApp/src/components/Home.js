{/* Imports */ }
import React, { Component } from 'react';

{/* Henter bilde fra bildemappen og gir det en id */}
import blåstolpe from '../img/blåstolper.png';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, Form, Container, Col, Row, Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';

{/* Importerer klassen LiveNyheter, som er en api for å kunne vise ferske nyheter */}
import { StockTabell } from './StockTabell';

{/* Js klassen Home arver fra superklassen Component */ }
export class Home extends Component {

    // Setter displayName til Home for eventuelle debugging meldinger
    static displayName = Home.name;

    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container>

                {/* Rad som skalerer på enhet */}
                <Row fluid="true" className="align-items-center justify-content-center" id="home-row">

                    {/* Kolonne som skalerer på enhet, skal inneholde tekst på hjemmesiden */}
                    <Col fluid="true" sm="12" md="6" lg="6" xl="6">

                        {/* Undertittel, bruker elementet strong for å legge vekt på teksten */}
                        <h3><strong>Hjelper unge voksne vinne økonomisk.</strong></h3>

                        {/* Tekst */}
                        <p>
                            Ghost Finance er en brukervennlig aksjehandel- og investeringsplattform for unge investorer som deg.
                            <br />Jevnlig investering kan hjelpe deg bygge kapital og oppnå dine økonomiske mål.
                        </p>
                    </Col>

                    {/* Bildekolonne */}
                    <Col fluid="true" sm="12" md="6" lg="6" xl="6" className="bildekolonne">
                        <img
                            src={blåstolpe}
                            className="stolper"
                        />
                    </Col>

                </Row>

                {/* Brudd i koden for å kunne flytte nyhetene et par hakk under første raden */}
                <br />
                <br />
                <br />

                {/* Ny rad som skal vise nyheter */}
                <Row>
                    <Col></Col>
                    <Col fluid ="true"><h3 className="text-center"><strong>Aktuelle Aksjer nå</strong></h3></Col>
                    <Col></Col>
                </Row>

                {/* Rad for nyhets api */}
                <Row>
                    <Col></Col>
                    <Col sm="12" md="10" lg="10" xl="10">
                        <StockTabell />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}