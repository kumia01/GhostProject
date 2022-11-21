import React, { Component } from 'react';
import oslomet from '../img/oslomet.jpg';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Container, Col, Row } from 'reactstrap';


export class Om extends Component {
    static displayName = Om.name;

    render() {
        return (
            <Container>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col sm="12" md="6" lg="6">
                        <h2 className="text-center"><strong>Om Oss</strong></h2>
                    </Col>
                </Row>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col md="6">
                        <h5 className="text-center"><strong>Ghost Finance</strong></h5>
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
                    <Col fluid="true" md="6">
                        <img src={oslomet} width="450" />
                    </Col>
                </Row>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col md="6">
                        <FormGroup>
                            <Link className="link-primary" to="/kundeservice">Til kundeservice</Link>
                        </FormGroup>
                    </Col>
                    <Col md="6"></Col>
                </Row>
            </Container>
        );
    }
}