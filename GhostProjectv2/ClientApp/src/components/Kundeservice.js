import React, { Component } from 'react';
import { Button, Form, FormGroup, Container, Col, Row, Label, Input, } from 'reactstrap';
import $ from 'jquery';


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

export class Kundeservice extends Component {
    static displayName = Kundeservice.name;

    sendMelding() {
        const melding = {
            navn: $("#inpName").val(),
            epost: $("#inpEmail").val(),
            tekst: $("#message").val()
        }
        console.log(melding);
        if (validering(melding) == true) {
            $.post("../Kundeservice/Lagre", melding, function () {
                console.log("Melding lagret!");
            })
                .fail(function (feil) {
                     console.log("Feil på server!");
                    document.getElementById("feil").textContent = "Feil på server - prøv igjen senere: " + feil.responseText + " : " + feil.status + " : " + feil.statusText;
                    return false;
                });
        }

    }



    render() {
        return (
            <Container>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col sm="12" md="6" lg="6">
                        <h2 className="text-center"><strong>Kundeservice</strong></h2>
                        <Form>
                            <Label>Name</Label>
                            <Input type="text" id="inpName" />
                            <span style={{ color: "Red" }} id="feilNavn"></span>

                            <Label>Email</Label>
                            <Input type="email" id="inpEmail" />
                            <span style={{ color: "Red" }} id="feilMail"></span>

                            <Label>Message</Label>
                            <Input id="message" type="textarea" name="message" />
                            <span style={{ color: "Red" }} id="feilMelding"></span>

                            <Button className="btn btn-primary" id="btnSend" onClick={this.sendMelding}>Send</Button>
                            <span style={{ color: "Black" }} id="meldingSendt"></span>
                            <span style={{ color: "Red" }} id="feil"></span>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}