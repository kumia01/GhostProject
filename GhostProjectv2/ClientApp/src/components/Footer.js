{/* Imports */}
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Container, Col, Row } from 'reactstrap';
import './Footer.css'

import { Link, Redirect } from 'react-router-dom';

// Js klassen Footer arver fra superklassen Component
export class Footer extends Component {

    // Setter displayName til Balanse for eventuelle debugging meldinger
    static displayName = Footer.name;

    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            < footer >
                <Container fluid="true" id="footContainer" className="align-items-md-center">
                    <Container>
                    <Row fluid="true" className="d-flex mx-auto">
                        { /*Kolonne1*/}
                        <Col fluid="true">
                            <h5><strong>Kontakt</strong></h5>
                            <ul className="list-unstyled">
                                <li>Pilestredet 35, Oslo</li>
                                <li>123 456 789</li>
                                <li>kontakt@ghost.com</li>
                            </ul>
                        </Col>
                       
                    { /*Kolonne2*/}
                    <Col fluid="true">
                    <h5><strong>Utforsk</strong></h5>
                            <ul className="list-unstyled">
                        <li><Link tag={Link} id="footerLink" to="/">Hjem</Link></li>
                        <li><Link tag={Link} id="footerLink" to="/om">Om oss</Link></li>
                        <li><Link tag={Link} id="footerLink" to="/kundeservice">Kundeservice</Link></li>
                    </ul>
                        </Col>    
                        { /*Kolonne3*/}
                            <Col fluid="true">
                                
                            <h5><strong>Ressurser & Lenker</strong></h5>
                                <ul className="list-unstyled">
                                    <li><a href="https://reactstrap.github.io/?path=/story/home-installation--page" id="footerLink">ReactStrap</a></li>
                                    <li><a href="https://rapidapi.com/" id="footerLink">Rapid API</a></li>
                                    <li><Link tag={Link} id="footerLink" to="/images">Bilder</Link></li>
                                </ul>
                                </Col>
                    </Row>
                    <hr/>
                    <div className="row">
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} Ghost Finance | OsloMet | WebApplikasjoner ITPE 3200 |
                        </p>
                        </div>
                    </Container>
                </Container>
            </footer>
    
        );

    }
}