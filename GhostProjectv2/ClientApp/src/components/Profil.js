import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row, CardBody, CardTitle, CardSubtitle, CardText, Card } from 'reactstrap';
import { Link, Route, Redirect } from 'react-router-dom';
import $ from 'jquery';



function formaterBruker(bruker) {
    document.getElementById("brukernavn").value = bruker.brukernavn;
    document.getElementById("fornavn").value = bruker.fornavn;
    document.getElementById("etternavn").value = bruker.etternavn;
    document.getElementById("adresse").value = bruker.adresse;
    document.getElementById("postnr").value = bruker.postnr;
    document.getElementById("poststed").value = bruker.poststed;

}

function validering() {
    let formOK = true;
    const bruker = {
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        adresse: $("#adresse").val(),
        postnr: $("#postnr").val(),
        poststed: $("#poststed").val()
    }

    //Validerer fornavn
    if (!bruker.fornavn.match(/^[a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
        document.getElementById("feilfornavn").textContent = "Bare bokstaver, mellom 2-20 tegn!";
        formOK = false;
    }
    if (!bruker.fornavn) {
        document.getElementById("feilfornavn").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }


    //Validerer etternavn
    if (!bruker.etternavn.match(/^[a-zA-ZæøåÆØÅ. \-]{1,35}$/g)) {
        document.getElementById("feiletternavn").textContent = "Bare bokstaver, mellom 1-35 tegn!";
        formOK = false;
    }
    if (!bruker.etternavn) {
        document.getElementById("feiletternavn").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }


    //Validerer adresse
    if (!bruker.adresse.match(/^[0-9a-zA-ZæøåÆØÅ. \-]{2,50}$/g)) {
        document.getElementById("feiladresse").textContent = "Bare bokstaver og tall, mellom 2-50 tegn!";
        formOK = false;
    }
    if (!bruker.adresse) {
        document.getElementById("feiladresse").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }


    //Validerer postnr
    if (!bruker.postnr.match(/^[0-9]{4}$/g)) {
        document.getElementById("feilpostnr").textContent = "Bare tall, må være 4 tegn!";
        formOK = false;
    }
    if (!bruker.postnr) {
        document.getElementById("feilpostnr").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }


    //Validerer poststed
    if (!bruker.poststed.match(/^[a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
        document.getElementById("feilpoststed").textContent = "Bare bokstaver, må være mellom 2-20 tegn!";
        formOK = false;
    }
    if (!bruker.poststed) {
        document.getElementById("feilpoststed").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }

    return formOK;
}

export class Profil extends Component {
    static displayName = Profil.name;

    hentBruker() {
        const kundeid = "id=" + sessionStorage.getItem('kundeId');
        $.get("../Bruker/HentEn?" + kundeid, function (bruker) {
            formaterBruker(bruker);

        })
            .fail(function (feil) {
                if (feil.status == 401) {
                    console.log("Ikke logget inn!");
                    return false;
                }
                else {
                    document.getElementById("feil").textContent = "Feil med server - prøv igjen senere!";
                    console.log("Feil med DB!");
                    return false;
                }
            });
    }

    slettBruker() {
        const kundeid = "id=" + sessionStorage.getItem('kundeId');
        $.get("../Bruker/Slett?" + kundeid, function () {
            
            console.log("Bruker slettet!")
            sessionStorage.removeItem('kundeId');
           
        })
            .fail(function (feil) {
                if (feil.status == 401) {
                    console.log("Ikke logget inn!");
                    return false;
                }
                else {
                    document.getElementById("feil").textContent = "Feil med server - prøv igjen senere!";
                    console.log("Feil med DB!");
                    return false;
                }
            });
    }

    endreBruker() {
        if (validering() == true) {
            const bruker = {
                id: sessionStorage.getItem('kundeId'),
                fornavn: $("#fornavn").val(),
                etternavn: $("#etternavn").val(),
                adresse: $("#adresse").val(),
                postnr: $("#postnr").val(),
                poststed: $("#poststed").val()
            }

            $.post("../Bruker/Endre", bruker, function () {
                console.log("Bruker endret!");
                document.getElementById("brukerendret").textContent = "Brukeren ble endret!";
            })
                .fail(function (feil) {
                    if (feil.status == 401) {
                        //relocate bruker til logginn
                        console.log("Ikke logget inn!");
                        return false;
                    }
                    else {
                        console.log("Feil på server!");
                        document.getElementById("feil").textContent = "Feil med server - prøv igjen senere!";
                        return false;
                    }
                });
        }
        
    }

    //Kode for Cards og Kode for dropdown og Labels er hentet fra https://reactstrap.github.io/

    render() {
        if (!sessionStorage.getItem('kundeId')) {
            return <Redirect to="/login"/>
        }

        return (
            <Container>
                    <Row className="justify-content-md-center">
                        <Col md="6" sm="12" lg="6">
                            <h2 className="text-center text-md-center"><strong>Hei, Bruker</strong></h2>

                            <p>Din profil er ikke synlig for andre brukere. Hvis du ønsker å oppdatere din profil kan du kontakte kundeservice.</p>
                            <p>Slett eller endre brukerkonto</p>
                            <p>Du kan slette din konto her, om du ikke lenger vil ha tilgang til tjenesten. Du kan også endre informasjon her.</p>

                            <Row>
                            <Label for="brukernavn">Innlogget bruker: </Label>
                            <input
                                ref="brukernavn"
                                type="text"
                                className="form-control"
                                id="brukernavn"
                                readOnly
                            />
                            </Row>

                            <Row>
                                <Label for="fornavn">Fornavn: </Label>
                                <input
                                    ref="fornavn"
                                    type="text"
                                    className="form-control"
                                    id="fornavn"
                            />
                            <span id="feilfornavn" style={{ color: "red" }}></span>
                            </Row>

                            <Row>
                                <Label for="etternavn">Etternavn: </Label>
                                <input
                                    ref="etternavn"
                                    type="text"
                                    className="form-control"
                                    id="etternavn"
                            />
                            <span id="feiletternavn" style={{ color: "red" }}></span>
                            </Row>

                            <Row>
                                <Label for="adresse">Adresse: </Label>
                                <input
                                    ref="adresse"
                                    type="text"
                                    className="form-control"
                                    id="adresse"
                            />
                            <span id="feiladresse" style={{ color: "red" }}></span>
                            </Row>

                            <Row>
                                <Label for="postnr">Postnr: </Label>
                                <input
                                    ref="postnr"
                                    type="text"
                                    className="form-control"
                                    id="postnr"
                            />
                            <span id="feilpostnr" style={{ color: "red" }}></span>
                            </Row>

                            <Row>
                                <Label for="poststed">Poststed: </Label>
                                <input
                                    ref="poststed"
                                    type="text"
                                    className="form-control"
                                    id="poststed"
                            />
                            <span id="feilpoststed" style={{ color: "red" }}></span>
                        </Row>
                        {this.hentBruker()}

                            <Row>
                            <Button className="btn btn-md mb-2" color="danger" onClick={this.slettBruker}>Slett Bruker</Button>{' '}
                            <Button className="btn btn-md mb-2" color="success" onClick={this.endreBruker}>Bekreft endinger</Button>{' '}
                            <span id="brukerendret" style={{ color: "black" }}></span>
                            <span id="feil" style={{ color: "red" }}></span>
                        </Row>
                        </Col>
                    </Row>
            </Container>
           
        )
        
    }
}