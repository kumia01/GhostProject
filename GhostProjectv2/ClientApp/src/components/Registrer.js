import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { validerFornavn, validerPoststed, validerPostnr, validerPassord, validerAdresse, validerBrukernavn, validerEtternavn } from './Validering';


export class Registrer extends Component {
    static displayName = Registrer.name;


    registrer() {

        const bruker = {
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            adresse: $("#adresse").val(),
            postnr: $("#postnr").val(),
            poststed: $("#poststed").val(),
            brukernavn: $("#brukernavn").val(),
            passord: $("#passord").val()
        }

        const fornavnOK = validerFornavn(bruker.fornavn);
        const etternavnOK = validerEtternavn(bruker.etternavn);
        const adresseOK = validerAdresse(bruker.adresse);
        const postnrOK = validerPostnr(bruker.postnr);
        const poststedOK = validerPoststed(bruker.poststed);
        const brukernavnOK = validerBrukernavn(bruker.brukernavn);
        const passordOK = validerPassord(bruker.passord);

        if (fornavnOK && etternavnOK && adresseOK && postnrOK && poststedOK && brukernavnOK && passordOK) {
            
            $.post("../Bruker/Lagre", bruker, function (OK) {
                if (OK) {
                    //Sender kunde til logginn side
                    console.log("FUCK YEAH!!");
                }
                else {
                    //Fikse error melding
                    document.getElementById("feil").textContent = "Feil i db - prøv igjen senere!";
                    console.log("FEIL!!");
                }
            });
        }
    }



    render() {

        if (sessionStorage.getItem('kundeId') != null) {
            return <Redirect to="/profil"/>
        }

         
        return (
            <Container>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col md="6" sm="12" lg="6">
                            <h2>Fyll inn informasjon for å lage bruker</h2>

                            <FormGroup>
                                <Label for="¨brukernavn">Brukernavn:</Label>
                                <Input
                                    ref="brukernavn"
                                    type="text"
                                    placeholder="Brukernavn"
                                    className="form-control"
                                    id="brukernavn"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feilbrukernavn"></span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="passord">Passord:</Label>
                                <Input
                                    ref="passord"
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    id="passord"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feilpassord"></span>
                            </FormGroup>

                            <br />
                            <br />

                            <FormGroup>
                                <Label for="fornavn">Fornavn:</Label>
                                <Input
                                    ref="fornavn"
                                    type="text"
                                    placeholder="Fornavn"
                                    className="form-control"
                                    id="fornavn"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feilfornavn"></span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="etternavn">Etternavn:</Label>
                                <Input
                                    ref="etternavn"
                                    type="text"
                                    placeholder="Etternavn"
                                    className="form-control"
                                    id="etternavn"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feiletternavn"></span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="adresse">Adresse:</Label>
                                <Input
                                    ref="adresse"
                                    type="text"
                                    placeholder="Adresse"
                                    className="form-control"
                                    id="adresse"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feiladresse"></span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="postnr">Postnr:</Label>
                                <Input
                                    ref="postnr"
                                    type="text"
                                    placeholder="Postnr"
                                    className="form-control"
                                    id="postnr"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feilpostnr"></span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="poststed">Poststed:</Label>
                                <Input
                                    ref="poststed"
                                    type="text"
                                    placeholder="Poststed"
                                    className="form-control"
                                    id="poststed"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feilpoststed"></span>
                            </FormGroup>


                            <FormGroup>
                                <Button className="btn btn-primary" onClick={this.registrer}>Lag Bruker</Button>
                                <span style={{ color: "red" }} id="feil"></span>
                            </FormGroup>
                        </Col>

                    </Row>
                </Form>
            </Container>
        );
    }
}