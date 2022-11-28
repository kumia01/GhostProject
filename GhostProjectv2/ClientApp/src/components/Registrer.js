{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, Form, Container, Col, FormGroup, Label, Input, Row } from 'reactstrap';

{/* Importerer funksjoner fra react-router-dom, disse brukes til å bytte til en annen js komponent */ }
import { Redirect, useHistory } from 'react-router-dom';

{/* Importerer jquery biblioteket */ }
import $ from 'jquery';

{/* Henter funksjoner fra js komponenten Validering */ }
import { validerFornavn, validerPoststed, validerPostnr, validerPassord, validerAdresse, validerBrukernavn, validerEtternavn } from './Validering';

function registrer() {

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
                return true;
            }
            else {
                //Fikse error melding
                document.getElementById("feil").textContent = "Feil i db - prøv igjen senere!";
                console.log("FEIL!!");
                return false;
            }
        });
        return true;
    }
}

{/* Js klassen Registrer arver fra superklassen Component */ }
export class Registrer extends Component {

    // Setter displayName til Registrer for eventuelle debugging meldinger
    static displayName = Registrer.name;
    
    state = {
        redirect: false
    }

    onSubmit = () => {
        if (registrer() == true) {
            this.setState({ redirect: true });
        }
    }

    // Funksjon som kontrollerer noden du står i
    render() {

        if (sessionStorage.getItem('kundeId') != null) {
            return <Redirect to="/profil"/>
        }
        
        if (this.state.redirect) {
            return <Redirect to="/login"/>;
        }

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container>

                {/* Bruker Form for å strukturere input-feltene */}
                <Form>

                    {/* Rad for alle input-feltene */}
                    <Row className="justify-content-md-center">

                        {/* Kolonne som tar hensyn til enhet */}
                        <Col sm="12" md="6" lg="6" xl="6">

                            {/* Undertittel */}
                            <h2>Fyll inn informasjon for å lage bruker</h2>

                            {/* FromGroup brukes for individuelle input-felter i Form */}
                            <FormGroup>

                                {/* Label for å markere hva som skal stå i input-felt */}
                                <Label for="¨brukernavn">Brukernavn:</Label>

                                {/* Input-felt for brukernavn */}
                                <Input
                                    ref="brukernavn"
                                    type="text"
                                    placeholder="Brukernavn"
                                    className="form-control"
                                    id="brukernavn"
                                    required="required"
                                />

                                {/* Span for eventuell feilmelding */}
                                <span style={{ color: "red" }} id="feilbrukernavn"></span>
                            </FormGroup>

                            {/* FormGroup for passord */}
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

                            {/* Brudd i koden for å lage rom */}
                            <br />
                            <br />

                            {/* FormGroup for fornavn */}
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

                            {/* FormGroup for etternavn */}
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

                            {/* FormGroup for adresse */}
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

                            {/* FormGroup for postnr */}
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

                            {/* FormGroup for poststed */}
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

                            {/* FormGroup for knapp */}
                            <FormGroup>

                                {/* Knapp som kaller på funksjonen onSubmit */}
                                <Button className="btn btn-primary" onClick={this.onSubmit}>Lag Bruker</Button>

                                {/* Span for eventuell feilmelding */}
                                <span style={{ color: "red" }} id="feil"></span>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}