{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, Form, FormGroup, Container, Col, Row, Label, Input, } from 'reactstrap';

{/* Importerer jquery biblioteket for inputvalidering */}
import $ from 'jquery';

import artboard from '../img/Artboard.png';


// Funksjon som skal brukes til validering
function validering(melding) {
    let formOK = true;
    console.log(melding);

    //Navn
    if (!melding.navn.match(/^[a-zA-ZæøåÆØÅ. \-]{1,35}$/g)) {
        document.getElementById("feilNavn").textContent = "Bare bokstaver, mellom 1-35 tegn!";
        formOK = false;
    }
    if (!melding.navn) {
        document.getElementById("feilNavn").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }


    //Epost
    if (!melding.epost.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/g)) {
        document.getElementById("feilMail").textContent = "Invalid epost-adresse!";
        formOK = false;
    }
    if (!melding.epost) {
        document.getElementById("feilMail").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }


    //Melding
    if (!melding.tekst.match(/^.{5,4700}$/g)) {
        document.getElementById("feilMelding").textContent = "Må inneholde mellom 5-4700 tegn!";
        formOK = false;
    }
    if (!melding.tekst) {
        document.getElementById("feilMelding").textContent = "Denne kan ikke være tom!";
        formOK = false;
    }
    return formOK;
}

{/* Js klassen Kundeservice arver fra superklassen Component */ }
export class Kundeservice extends Component {

    // Setter displayName til Kundeservice for eventuelle debugging meldinger
    static displayName = Kundeservice.name;
    constructor(props){
        super(props)

        this.this={
            render: true
        }
    }

    // Funksjonen sendMelding() skal sende innholdet etter inputvalidering er godkjent
    sendMelding() {
        const melding = {
            navn: $("#inpName").val(),
            epost: $("#inpEmail").val(),
            tekst: $("#message").val()
        }

        // Sjekker validering og sender kunde melding til server
        console.log(melding);
        if (validering(melding) == true) {
            $.post("../Kundeservice/LagreMelding", melding,() => {
                document.getElementById("meldingSendt").textContent = "Melding sendt";
            })
                .fail(function (feil) {
                     console.log("Feil på server!");
                    document.getElementById("feil").textContent = "Feil på server - prøv igjen senere: " + feil.responseText + " : " + feil.status + " : " + feil.statusText;
                    return false;
                });
        }

    }


    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container id="kundeservice">

                { /* Rad som skalerer på enhet */ }
                <Row fluid="true" className="align-items-center justify-content-center">

                    { /* En av to kolonner i raden, for mobil vil den andre bli til en ny rad */ }
                    <Col sm="12" md="6" lg="6" xl="6">

                        { /* Undertittel som markerer hvilken side bruker er på */ }
                        <h2 className="pt-3 pb-3"><strong>Kundeservice</strong></h2>

                        { /* Bruker Form fra reactstrap for å strukturere input-feltene */ }
                        <Form>
                            <FormGroup>
                                { /* Label fungerer som en indikasjon på hva som skal stå i input-felt */}
                                <Label>Fullt navn</Label>

                                { /* Input-felt for å ta inn en verdi som inputvalideres */}
                                <Input type="text" id="inpName" />

                                { /* Span brukes for å sende ut en eventuell feilmelding hvis inputvalidering feiler */}
                                <span style={{ color: "Red" }} id="feilNavn"></span>
                            </FormGroup>
                            <FormGroup>
                                { /* Input-felt for email */ }
                                <Label>E-post</Label>
                                <Input type="email" id="inpEmail" />
                                <span style={{ color: "Red" }} id="feilMail"></span>
                            </FormGroup>
                            <FormGroup>
                                { /* Input-felt for melding */ }
                                <Label>Hva kan vi hjelpe deg med?</Label>
                                <Input id="message" type="textarea" name="message" />
                                <span style={{ color: "Red" }} id="feilMelding"></span>
                            </FormGroup>
                            <FormGroup>
                                { /* Knapp for å sende informasjon fra Form, kaller på funksjonen sendMelding */}
                                <Button className="btn btn-primary" id="btnSend" onClick={this.sendMelding}>Send</Button>
                            </FormGroup>

                            { /* Span for eventuelle feilmeldinger */}
                            <span style={{ color: "Black" }} id="meldingSendt"></span>
                            <span style={{ color: "Red" }} id="feil"></span>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}