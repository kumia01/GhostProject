import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row, CardBody, CardTitle, CardSubtitle, CardText, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';


function formaterBruker(bruker) {
    document.getElementById("brukernavn").value = bruker.brukernavn;
    document.getElementById("fornavn").value = bruker.fornavn;
    document.getElementById("etternavn").value = bruker.etternavn;
    document.getElementById("adresse").value = bruker.adresse;
    document.getElementById("postnr").value = bruker.postnr;
    document.getElementById("poststed").value = bruker.poststed;

}

export class Profil extends Component {
    static displayName = Profil.name;


    hentBruker() {
        const kundeid = "id=" + localStorage.getItem('kundeId');
        $.get("../Bruker/HentEn?" + kundeid, function (bruker) {
            formaterBruker(bruker);

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
    }

    slettBruker() {
        const kundeid = "id=" + localStorage.getItem('kundeId');
        $.get("../Bruker/Slett?" + kundeid, function () {
            
            console.log("Bruker slettet!")
            localStorage.removeItem('kundeId');
            //Sende bruker til loginn
           
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
    }

    endreBruker() {
        const bruker = {
            id: localStorage.getItem('kundeId'),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            adresse: $("#adresse").val(),
            postnr: $("#postnr").val(),
            poststed: $("#poststed").val()
        }

        $.post("../Bruker/Endre", bruker, function () {
            console.log("Bruker endret!");
            document.getElementById("brukerendret").textContent = "Brukeren ble endret!";
            //Last inn siden på nytt med ny informasjon
        })
            .fail(function (feil) {
                if (feil.status == 401) {
                    //relocate bruker til logginn
                    console.log("Ikke logget inn!");
                    return false;
                }
                else {
                    console.log("Feil på server!");
                    //Feil melding til siden, feil med server - prøv igjen senere
                    return false;
                }
            });
    }

    //Kode for Cards og Kode for dropdown og Labels er hentet fra https://reactstrap.github.io/

    render() {
        
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
                            </Row>

                            <Row>
                                <Label for="etternavn">Etternavn: </Label>
                                <input
                                    ref="etternavn"
                                    type="text"
                                    className="form-control"
                                    id="etternavn"
                                />
                            </Row>

                            <Row>
                                <Label for="adresse">Adresse: </Label>
                                <input
                                    ref="adresse"
                                    type="text"
                                    className="form-control"
                                    id="adresse"
                                />
                            </Row>

                            <Row>
                                <Label for="postnr">Postnr: </Label>
                                <input
                                    ref="postnr"
                                    type="text"
                                    className="form-control"
                                    id="postnr"
                                />
                            </Row>

                            <Row>
                                <Label for="poststed">Poststed: </Label>
                                <input
                                    ref="poststed"
                                    type="text"
                                    className="form-control"
                                    id="poststed"
                                />
                        </Row>
                        {this.hentBruker()}

                            <Row>
                            <Button className="btn btn-md mb-2" color="danger" onClick={this.slettBruker}>Slett Bruker</Button>{' '}
                            <Button className="btn btn-md mb-2" color="success" onClick={this.endreBruker}>Bekreft endinger</Button>{' '}
                            <span id="brukerendret" style={{ color: "black" }}></span>
                        </Row>
                        </Col>
                    </Row>
            </Container>
           
        )
        
    }
}