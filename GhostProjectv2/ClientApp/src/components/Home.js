import React, { Component } from 'react';
import blåstolpe from '../img/blåstolper.png';
import { Button, Form, Container, Col, Row, Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';
import { LiveNyheter } from './LiveNyheter';


export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Container>
                <Row fluid="true" className="align-items-center justify-content-center" id="home-row">
                    <Col fluid="true">
                        <h3><strong>Hjelper unge voksne vinne økonomisk.</strong></h3>
                        <p>
                            Ghost Finance er en brukervennlig aksjehandel- og investeringsplattform for unge investorer som deg.
                            <br />Jevnlig investering kan hjelpe deg bygge kapital og oppnå dine økonomiske mål.
                        </p>
                    </Col>
                    <Col fluid="true">
                        <img src={blåstolpe} width="450" />
                    </Col>
                </Row>

                <br />
                <br />
                <br />

                <Row>
                    <Col></Col>
                    <Col fluid ="true"><h3 className="text-center"><strong>Nyheter</strong></h3></Col>
                    <Col></Col>
                </Row>

                <Row>
                    <LiveNyheter/>
                </Row>
            </Container>
        );
    }
}