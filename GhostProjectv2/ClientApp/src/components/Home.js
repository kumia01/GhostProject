import React, { Component } from 'react';
import blåstolpe from '../img/blåstolper.png';
import { Button, Form, Container, Col, Row, Card, CardTitle, CardText} from 'reactstrap';


export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Container>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col fluid="true">
                        <h3><strong>Hjelper unge voksne <br />vinne økonomisk.</strong></h3>
                        <p>
                            GhostCoin er en brukervennlig aksjehandel- og investeringsplattform for unge investorer som deg.
                            <br />Jevnlig investering kan hjelpe deg bygge kapital og oppnå dine økonomiske mål.
                        </p>
                    </Col>
                    <Col fluid="true">
                        <img src={blåstolpe} width="450" />
                    </Col>
                </Row>

                <Row>
                    <Col fluid="true">
                    <p>tester om dette funker</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}