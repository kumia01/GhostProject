import React, { Component} from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
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


export class Login extends Component {
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


    render() {
        if (sessionStorage.getItem('kundeId') != null) {
            return <Redirect to="/profil"/>
        }
        if (this.state.redirect) {
            console.log("222");
            return <Redirect to="/profile"/>
        }


        return (
            <Container>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col sm="6">
                            <h2>Logg inn</h2>

                            <FormGroup>
                                <Label for="brukernavn">Brukernavn</Label>
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
                                <Label for="passord">Passord</Label>
                                <Input
                                    ref="passord"
                                    type="password"
                                    placeholder="Passord"
                                    className="form-control"
                                    id="passord"
                                    required="required"
                                />
                                <span style={{ color: "red" }} id="feilpassord"></span>
                            </FormGroup>

                            <FormGroup>
                                <Button className="btn btn-primary" onClick={this.onSubmit}>Logg Inn</Button>
                                <span style={{ color: "red" }} id="feil"></span>
                            </FormGroup>

                            <FormGroup>
                                <Link className="link-primary" to="/registrer">Opprett Bruker</Link>
                            </FormGroup>

                        </Col>
                    </Row>
                    
                </Form>
            </Container>
        );
    }
}
