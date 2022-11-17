import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row, CardBody, CardTitle, CardSubtitle, CardText, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export class Profil extends Component {
    static displayName = Profil.name;


    //Kode for Cards og Kode for dropdown og Labels er hentet fra https://reactstrap.github.io/

    render() {
        return (
            <Container>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col md="6" sm="12" lg="6">
                            <h2 className="text-center text-md-center"><strong>Hei, Bruker</strong></h2>

                            <p>Din profil er ikke synlig for andre brukere. Hvis du ønsker å oppdatere din profil kan du kontakte kundeservice.</p>
                            <p>Slett eller endre brukerkonte</p>
                            <p>Du kan slette din konto her, om du ikke lenger vil ha tilgang til tjenesten. Du kan også endre informasjon her.</p>
                            <FormGroup>
                                <Label for="Bruker">Innlogget bruker: </Label>
                            </FormGroup>
                            <Button className="btn btn-md mb-2" color="danger">Slett Bruker</Button>{' '}
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}