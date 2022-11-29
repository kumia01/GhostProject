{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, ButtonGroup, Form, Container, Col, Row } from 'reactstrap';

{/* Henter klassen StockTabell for å printe ut informasjon fra api */}
import { StockTabell } from "./StockTabell";


{/* Js klassen Handel arver fra superklassen Component */}
export class Handel extends Component {

    // Setter displayName til Handel for eventuelle debugging meldinger
    static displayName = Handel.name;

    constructor(props){
        super(props)
        this.state={
            random: (Math.random()*790)
        }
        this.nyListe = this.nyListe.bind(this)
    }

    nyListe(){
        
    //lager en tilfeldig tall fra 0 til 790
        const random = Math.random() * 790;
        this.setState({
            random: random
        })
    }

    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container>

                { /* Rad for overskrift */ }
                <Row>

                    { /* Kolonne som strekker seg 100% */ }
                    <Col sm="12" md="12" lg="12" xl="12">

                        { /* Overskrift */ }
                        <h2 className="text-center"><strong>Handelsfremsiden</strong></h2>
                    </Col>
                </Row>

                { /* Rad for knappemenyen */ }
                <Row>

                    { /* Kolonne for å holde knappe i rekke */ }
                    <Col sm="12" md="12" lg="12" xl="12" className="text-center">

                        { /* Bruker ButtonGroup for å holde knappene tett på hverandre */ }
                        <ButtonGroup id="btnCol">

                            { /* Knappene skal holde samme størrelse så derfor brukes et preset på className */ }
                            <Button className="btn btn-md mb-2" color="primary" onClick={this.nyListe} >Ny Aksjer liste</Button>
                        </ButtonGroup>
                    </Col>
                </Row>

                { /* Rad for tabellen */ }
                <Row>
                    { /* Bruker bare en kolonne siden tabellen skal ta opp hele siden */ }
                    <Col sm="12" md="12" lg="12" xl="12" className="text-center">

                        { /* Printer ut innholdet fra klassen StockTabell.js */ }
                        <StockTabell data = {{random: this.state.random}}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}