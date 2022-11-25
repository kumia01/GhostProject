{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, Form, Container, Col, Row, } from 'reactstrap';

{/* Js klassen Uttak arver fra superklassen Component */ }
export class Uttak extends Component {

    // Setter displayName til Uttak for eventuelle debugging meldinger
    static displayName = Uttak.name;

    // Funksjon som kontrollerer noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container>

                {/* Rad som tar hensyn til enhet */}
                <Row fluid="true" className="align-items-center">

                    {/* Kolonne som tar 1/4 av rad */}
                    <Col fluid="true" sm="3">

                        {/* Undertittel */}
                        <h3 style={{ color: "#023e73" }} className="text-center">Overføringer</h3>

                        {/* Tom rad og kolonne for å plassere undertittel */}
                        <Row fluid="true">
                            <Col fluid="true" className="text-center">
                            </Col>
                        </Row>
                    </Col>

                    {/* Tom kolonne for å skille Col1 og Col3, 1/4 av rad */}
                    <Col sm="3">
                    </Col>

                    {/* Kolonne for tekst, tar opp 2/4 av rad */}
                    <Col fluid="true" sm="6" className="text-center">

                        {/* Undertittel */}
                        <h3 style={{ color: "#023e73"  }}>Hvordan ønsker du å sette inn penger?</h3>
                    </Col>
                </Row>

                {/* Rad for knapper */}
                <Row fluid="true" className="align-items-center">

                    {/* Kolonne for første gruppe knapper */}
                    <Col fluid="true" className="btn-group-vertical mt-3" sm="3">
                        {/* Knapper for betalingsalternativer */}
                        <Button className="btn btn-primary btn-sm mb-1">Overfør</Button>
                        <Button className="btn btn-primary btn-sm mb-1">Uttak</Button>
                        <Button className="btn btn-primary btn-sm mb-1">Aktiva</Button>
                        <Button className="btn btn-primary btn-sm mb-1">Overfør aksjer</Button>
                    </Col>

                    <Col sm="3"></Col>

                    <Col fluid="true" className="btn-group-vertical mt-3" sm="6">
                        <Button className="btn btn-md mb-2" color="primary">Vipps</Button>{' '}
                        <Button className="btn btn-md mb-2" color="primary">Apple Pay</Button>{' '}
                        <Button className="btn btn-md mb-2" color="primary">Credit- eller debitkort</Button>{' '}
                        <Button className="btn btn-md mb-2" color="primary">Bankoverføring</Button>{' '}
                    </Col>
                </Row>
            </Container>
        );
    }
}