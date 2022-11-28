{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Container, Button, ButtonGroup, ButtonToolbar, Row, Col, Table} from 'reactstrap';

{/* Js klassen Handel arver fra superklassen Component */ }
export class Historikk extends Component {

    // Setter displayName til Historikk for eventuelle debugging meldinger
    static displayName = Historikk.name;

    constructor(props) {
        super(props)

        this.state = {
            aksjeList: [],
            innskuddUttakList: [],
            aksje: {
                Ticker: "",
                Volum: "",
                Pris: ""
            }
        }

    }







    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Div som inneholder html elementene til siden
            <div>

                {/* Tekst element */}
                <p>Overføringer</p>

                {/* Container som inneholder html elementer */}
                <Container fluid="true">

                    {/* Rad som skalerer på enhet */}
                    <Row fluid="true">

                        {/* Bruker ButtonToolbar for å holde knappe på rekke */}
                        <ButtonToolbar>

                            {/* ButtonGroup sørger for at knappene er samme størrelse */}
                            <ButtonGroup className="mr-2">

                                {/* Knapper, en av de bruker outline og den andre tar primary som farge */}
                                <Button color="primary" sm="1">Innskudd/Uttak</Button>
                                <Button color="primary" sm="1">Transaksjoner</Button>
                            </ButtonGroup>
                        </ButtonToolbar>  
                    </Row>

                    {/* Rad som skalerer på enhet */}
                    <Row fluid="true">

                        {/* Kolonne som skal ta halve raden */}
                        <Col md="6" pt="3">

                            {/* Tabell som skal holde på overføringer */}
                            <Table responsive borderless>

                                {/* Table Head, raden med informasjon om hva som står i kolonnene */}
                                <thead>
                                    {/* Markerer starten på en rad i tabellen */}
                                    <tr>
                                        {/* Table Head element */}
                                        <th>Dato</th>
                                    </tr>
                                </thead>

                                {/* Table Body, radene som skal inne holde informasjon */}
                                <tbody>
                                    {/* Table row, markerer start på en rad */}
                                    <tr>
                                        {/* Element i raden */}
                                        <td>11.02.2021</td>
                                    </tr>
                                    <tr>
                                        <td><i className="bi bi-arrow-left"> Overføring til konto: NOK 2, 0000</i></td>
                                    </tr>
                                    <tr>
                                        <td>03.01.2021</td>
                                    </tr>
                                    <tr>
                                        <td><i className="bi bi-arrow-right"> Innskudd: NOK 1, 000</i></td>
                                    </tr>
                                    <tr>
                                        <td>05.01.2021</td>
                                    </tr>
                                    <tr>
                                        <td><i className="bi bi-arrow-left"> Overføring av aksjer til bruker @ </i></td>
                                    </tr>
                                    <tr>
                                        <td>15.12.2020</td>
                                    </tr>
                                    <tr>
                                        <td><i className="bi bi-arrow-right"> Mottok aksjer fra bruker @</i></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
      }
    }