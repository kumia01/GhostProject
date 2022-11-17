import React, { Component} from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';


//Funksjon som lagrer kunde id'en til kunden som logger på i localstorage
function lagreKundeId(bruker) {
    $.post("../Bruker/HentKundeId", bruker, function (bruker) {
        localStorage.setItem('kundeId', bruker.id);
        console.log(localStorage.getItem('kundeId'));
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

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
        };
        this.validering = this.validering.bind(this);
        this.login = this.login.bind(this);
    }
    //validering
    validering() {
        let input = this.state.input;
        let errors = {};
        let formOK = true;
        //brukernavn validering
        console.log(input["brukernavn"]);
        console.log(input["passord"]);
        if (!input["brukernavn"]) {
            formOK = false;
            errors["brukernavn"] = "Denne kan ikke være tom!";
        }

        if (typeof input["brukernavn"] != "undefined") {
            if (!input["brukernavn"].match(/^[0-9a-zA-ZæøåÆØÅ. \-]{2,20}$/g)){
                formOK = false;
                errors["brukernavn"] = "Bare bokstaver og tall, mellom 6-20 tegn!";
            }
        }

        //passord
        if (!input["passord"]) {
            formOK = false;
            errors["passord"] = "Denne kan ikke være tom!";
        }

        if (typeof input["passord"] != "undefined") {
            if (!input["passord"].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g)){
                formOK = false;
                errors["passord"] = "Passord må inneholde tall og bokstaver. Det skal være 6 eller fler tegn!";
            }
        }
        this.setState({ errors: errors });
        return formOK;
    }

    //login kall til serveren for å starte session
    login() {
        if (this.validering() == true) { //Sjekker at regex er godkjent
            let errors = {};
            const bruker = {
                brukernavn: this.state.input["brukernavn"],
                passord: this.state.input["passord"]
            }
            $.post("../Bruker/LoggInn", bruker, function (OK) { //POST kall med kunde object
                if (OK) { 
                    lagreKundeId(bruker); //Kaller på lagreKundeId funksjonen

                    //SENDE BRUKER TIL HJEMSIDEN HER

                    console.log("SIUUUUU!");
                    
                    console.log(localStorage.getItem('kundeId'));
                }
                else {
                    //Fikse error melding
                    //errors["passord"] = "Feil brukernavn eller passord!";
                    //this.setState({ errors : errors });
                    console.log("FEIL BRUKERNAVN ELLER PASSORD!")
                }
            });
                //Fikse fail function
                /*.fail(function (feil) {
                    this.state.input["brukernavn"] = "Feil på server - prøv igjen senere: " + feil.responseText + " : " + feil.status + " : " + feil.statusText;
                });*/
        }
    }

    handleChange(input, e) {
        let inputs = this.state.input;
        inputs[input] = e.target.value;
        this.setState({ inputs });
    }


    render() {

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
                                    onChange={this.handleChange.bind(this, "brukernavn") }
                                    value={this.state.input["brukernavn"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["brukernavn"]}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="passord">Passord</Label>
                                <Input
                                    ref="passord"
                                    type="password"
                                    placeholder="Passord"
                                    className="form-control"
                                    onChange={this.handleChange.bind(this, "passord")}
                                    value={this.state.input["passord"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["passord"]}</span>
                            </FormGroup>

                            <FormGroup>
                                <Button className="btn btn-primary" onClick={this.login}>Logg Inn</Button>
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
