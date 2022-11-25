{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, Form, Container, Col, FormGroup, Label, Input, Row } from 'reactstrap';

{/* Importerer funksjoner fra react-router-dom, disse brukes til å bytte til en annen js komponent */}
import { Link, Redirect } from 'react-router-dom';

{/* Importerer jquery biblioteket */}
import $ from 'jquery';

{/* Henter funksjoner fra js komponenten Validering */}
import { validerBrukernavn, validerPassord } from './Validering';

//Funksjon som lagrer kunde id'en til kunden som logger på i localstorage
function lagreKundeId(bruker) {
    
    $.post("../Bruker/HentKundeId", bruker, function (bruker) {
        sessionStorage.setItem('kundeId', bruker.id);
        console.log(sessionStorage.getItem('kundeId'));
    })
        .fail(function (feil) {
            if (feil.status == 401) {
                //relocate bruker til logginn
                return false;
            }
            else {
                //Feil melding til siden, feil med server - prøv igjen senere
                return false;
            }
        });
    return true;
}

function login() {
    let formOK = false;
    const bruker = {
        brukernavn: $("#brukernavn").val(),
        passord: $("#passord").val()
    }
    const brukernavnOK = validerBrukernavn(bruker.brukernavn);
    const passordOK = validerPassord(bruker.passord);

    if (brukernavnOK && passordOK) { //Sjekker at regex er godkjent
        $.post("../Bruker/LoggInn", bruker, function (OK) { //POST kall med kunde object
            if (OK) {
                lagreKundeId(bruker);
                //Kaller på lagreKundeId funksjonen
                console.log(sessionStorage.getItem('kundeId'));
            }
            else {
                return false;
            }
        })
            .fail(function (feil) {
                document.getElementById("feil").textContent = "Feil på server - prøv igjen senere: " + feil.responseText + " : " + feil.status + " : " + feil.statusText;
                return false;
            });
        return true;
        
    }

}

{/* Js klassen Login arver fra superklassen Component */ }
export class Login extends Component {

    // Setter displayName til Login for eventuelle debugging meldinger
    static displayName = Login.name;

    state = {
        redirect: false
    }

    //login kall til serveren for å starte session
    onSubmit = () => {
        const loginOK = login();
        console.log(loginOK);
        if (loginOK) {
            console.log("11");
            this.setState({ redirect: true });
        }
    }

    // Funksjon som kontrollerer noden du står i
    render() {
        if (sessionStorage.getItem('kundeId') != null) {
            return <Redirect to="/profil"/>
        }
        if (this.state.redirect) {
            console.log("222");
            return <Redirect to="/profile"/>
        }

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container>

                {/* Bruker Form for å strukturere input-feltene */}
                <Form>

                    {/* Rad som skalerer på enhet */}
                    <Row fluid="true" className="justify-content-md-center">

                        {/* Kolonne for alle elementene */}
                        <Col sm="6">

                            {/* Undertittel */}
                            <h2>Logg inn</h2>

                            {/* Bruker FormGroup for å gruppere input-feltene som ønsket */}
                            <FormGroup>

                                {/* Label for å markere hva som skal stå i input-felt */}
                                <Label for="brukernavn">Brukernavn</Label>

                                {/* Input-felt for brukernavn */}
                                <Input
                                    ref="brukernavn"
                                    type="text"
                                    placeholder="Brukernavn"
                                    className="form-control"
                                    id="brukernavn"
                                    required="required"
                                />

                                {/* Span for å skrive ut eventuell feilmelding */}
                                <span style={{ color: "red" }} id="feilbrukernavn"></span>
                            </FormGroup>

                            {/* FormGroup for passord feltet */}
                            <FormGroup>

                                {/* Label for input-felt */}
                                <Label for="passord">Passord</Label>

                                {/* Input-felt for passord */}
                                <Input
                                    ref="passord"
                                    type="password"
                                    placeholder="Passord"
                                    className="form-control"
                                    id="passord"
                                    required="required"
                                />

                                {/* Span for eventuell feilmelding */}
                                <span style={{ color: "red" }} id="feilpassord"></span>
                            </FormGroup>

                            {/* FormGroup for logg inn knapp */}
                            <FormGroup>

                                {/* Knapp for å sende informasjonen i input-feltene */}
                                <Button className="btn btn-primary" onClick={this.onSubmit}>Logg Inn</Button>

                                {/* Span for eventuell feilmelding */}
                                <span style={{ color: "red" }} id="feil"></span>
                            </FormGroup>

                            {/* FormGroup for linken til registreringsside */}
                            <FormGroup>
                                {/* Bruker Link fra react-router-dom til å sende bruker til registrering */}
                                <Link className="link-primary" to="/registrer">Opprett Bruker</Link>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}
