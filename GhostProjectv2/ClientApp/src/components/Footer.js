import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import './Footer.css'

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer>
                <Container fluid id="footContainer" className="align-items-md-center">
                    <Container>
                    <Row fluid className="d-flex mx-auto">
                        { /*Kolonne1*/}
                        <Col fluid>
                            <h5><strong>Kontakt</strong></h5>
                            <ul className="list-unstyled">
                                <li>Pilestredet 35, Oslo</li>
                                <li>123 456 789</li>
                                <li>kontakt@ghost.com</li>
                            </ul>
                        </Col>
                       
                    { /*Kolonne2*/}
                    <Col fluid>
                    <h5><strong>Utforsk</strong></h5>
                            <ul className="list-unstyled">
                        <li>Hjem</li>
                        <li>Om oss</li>
                        <li>Utlyst stilling</li>
                    </ul>
                        </Col>    
                        { /*Kolonne3*/}
                            <Col fluid>
                                
                            <h5><strong>Ressurser & Lenker</strong></h5>
                            <ul className="list-unstyled">
                                <li>ReactStrap</li>
                                <li>Kilde </li>
                                    <li>Kilde</li>
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