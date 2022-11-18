import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row, CardBody, CardTitle, CardSubtitle, CardText, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export class Profil extends Component {
    static displayName = Profil.name;

    constructor(props) {
        super(props);

        this.state = {
            input: {
                brukernavn: '',
                fornavn: '',
                etternavn: '',
                adresse: '',
                postnr: '',
                poststed: ''
            }
        }
    }

    hentBruker() {
        let ut;
        const kundeid = "id=" + localStorage.getItem('kundeId');

        console.log(kundeid);
        $.get("../Bruker/HentEn?" + kundeid, function (bruker) {
            /*this.setState({
                input: 
                    brukernavn: bruker.brukernavn,
                    fornavn: bruker.fornavn,
                    etternavn: bruker.etternavn,
                    adresse: bruker.adresse,
                    postnr: bruker.postnr,
                    poststed: bruker.poststed
                })*/

            console.log(bruker);
            
        })
            .fail(function (feil) {
                if (feil.status == 401) {
                    //relocate bruker til logginn
                    console.log("Ikke logget inn!");
                    return false;
                }
                else {
                    //Feil melding til siden, feil med server - prøv igjen senere
                    console.log("Feil med DB!");
                    return false;
                }
            });
        return true;
    }
    //Kode for Cards og Kode for dropdown og Labels er hentet fra https://reactstrap.github.io/

    render() {
        
        return (
            <Container>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col md="6" sm="12" lg="6">
                            <h2 className="text-center text-md-center"><strong>Hei, Bruker</strong></h2>

                            <p>Din profil er ikke synlig for andre brukere. Hvis du ønsker å oppdatere din profil kan du kontakte kundeservice.</p>
                            <p>Slett eller endre brukerkonto</p>
                            <p>Du kan slette din konto her, om du ikke lenger vil ha tilgang til tjenesten. Du kan også endre informasjon her.</p>

                            <FormGroup>
                                <Label for="brukernavn">Innlogget bruker: </Label>
                                <input
                                    ref="brukernavn"
                                    type="text"
                                    className="form-control"
                                    value={this.state.input.brukernavn}
                                    readOnly
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="fornavn">Fornavn: </Label>
                                <input
                                    ref="fornavn"
                                    type="text"
                                    className="form-control"
                                    value={this.state.input.fornavn}
                                    readOnly
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="etternavn">Etternavn: </Label>
                                <input
                                    ref="etternavn"
                                    type="text"
                                    className="form-control"
                                    value={this.state.input.etternavn}
                                    readOnly
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="adresse">Adresse: </Label>
                                <input
                                    ref="adresse"
                                    type="text"
                                    className="form-control"
                                    value={this.state.input.adresse}
                                    readOnly
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="postnr">Postnr: </Label>
                                <input
                                    ref="postnr"
                                    type="text"
                                    className="form-control"
                                    value={this.state.input.postnr}
                                    readOnly
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="poststed">Poststed: </Label>
                                <input
                                    ref="poststed"
                                    type="text"
                                    className="form-control"
                                    value={this.state.input.poststed}
                                    readOnly
                                />
                            </FormGroup>

                            <FormGroup>
                                <Button className="btn btn-md mb-2" color="danger" onClick={this.slett}>Slett Bruker</Button>{' '}
                            </FormGroup>
                            {this.hentBruker()}

                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}