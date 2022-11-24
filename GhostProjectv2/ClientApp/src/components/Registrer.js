import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';


export class Registrer extends Component {
    static displayName = Registrer.name;

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {}
        };

        this.validering = this.validering.bind(this);
        this.registrer = this.registrer.bind(this);
    }

    validering() {
        let input = this.state.input;
        let errors = {};
        let formOK = true;

        //
        console.log(input["brukernavn"]);
        console.log(input["passord"]);
        console.log(input["fornavn"]);
        console.log(input["etternavn"]);
        console.log(input["adresse"]);
        console.log(input["postnr"]);
        console.log(input["poststed"]);
        //


        //Brukernavn
        if (!input["brukernavn"]) {
            formOK = false;
            errors["brukernavn"] = "Brukernavn kan ikke være tomt!";
        }
        if (typeof input["brukernavn"] != "undefined") {
            if (!input["brukernavn"].match(/^[0-9a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
                formOK = false;
                errors["brukernavn"] = "Bare bokstaver og tall, mellom 6-20 tegn!";
            }
        }


        //Passord
        if (!input["passord"]) {
            formOK = false;
            errors["passord"] = "Passord kan ikke være tomt!";
        }
        if (typeof input["passord"] != "undefined") {
            if (!input["passord"].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g)) {
                formOK = false;
                errors["passord"] = "Passord må inneholde tall og bokstaver. Det skal være 6 eller fler tegn!";
            }
        }


        //Fornavn
        if (!input["fornavn"]) {
            formOK = false;
            errors["fornavn"] = "Fornavn kan ikke være tomt!";
        }
        if (typeof input["fornavn"] != "undefined") {
            if (!input["fornavn"].match(/^[a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
                formOK = false;
                errors["fornavn"] = "Bare bokstaver, mellom 2-20 tegn!";
            }
        }


        //Etternavn
        if (!input["etternavn"]) {
            formOK = false;
            errors["etternavn"] = "Etternavn kan ikke være tomt!";
        }
        if (typeof input["etternavn"] != "undefined") {
            if (!input["etternavn"].match(/^[a-zA-ZæøåÆØÅ. \-]{1,35}$/g)) {
                formOK = false;
                errors["etternavn"] = "Bare bokstaver, mellom 1-35 tegn!";
            }
        }


        //Adresse
        if (!input["adresse"]) {
            formOK = false;
            errors["adresse"] = "Adresse kan ikke være tomt!";
        }
        if (typeof input["adresse"] != "undefined") {
            if (!input["adresse"].match(/^[0-9a-zA-ZæøåÆØÅ. \-]{2,50}$/g)) {
                formOK = false;
                errors["adresse"] = "Bare bokstaver og tall, mellom 2-50 tegn!";
            }
        }


        //Postnr
        if (!input["postnr"]) {
            formOK = false;
            errors["postnr"] = "Postnr kan ikke være tomt!";
        }
        if (typeof input["postnr"] != "undefined") {
            if (!input["postnr"].match(/^[0-9]{4}$/g)) {
                formOK = false;
                errors["postnr"] = "Bare tall, må være 4 tegn!";
            }
        }


        //Poststed
        if (!input["poststed"]) {
            formOK = false;
            errors["poststed"] = "Poststed kan ikke være tomt!";
        }
        if (typeof input["poststed"] != "undefined") {
            if (!input["poststed"].match(/^[a-zA-ZæøåÆØÅ. \-]{2,20}$/g)) {
                formOK = false;
                errors["poststed"] = "Bare bokstaver, må være mellom 2-20 tegn!";
            }
        }
        this.setState({ errors: errors });
        return formOK;

    }

    registrer() {
        if (this.validering() == true) {

            const bruker = {
                fornavn: this.state.input["fornavn"],
                etternavn: this.state.input["etternavn"],
                adresse: this.state.input["adresse"],
                postnr: this.state.input["postnr"],
                poststed: this.state.input["poststed"],
                brukernavn: this.state.input["brukernavn"],
                passord: this.state.input["passord"]
            }
            console.log(bruker)
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

    handleChange(input, e) {
        let inputs = this.state.input;
        inputs[input] = e.target.value;
        this.setState({ inputs });
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
                                    onChange={this.handleChange.bind(this, "brukernavn")}
                                    value={this.state.input["brukernavn"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["brukernavn"]}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="passord">Passord:</Label>
                                <Input
                                    ref="passord"
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    id="passord"
                                    onChange={this.handleChange.bind(this, "passord")}
                                    value={this.state.input["passord"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["passord"]}</span>
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
                                    onChange={this.handleChange.bind(this, "fornavn")}
                                    value={this.state.input["fornavn"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["fornavn"]}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="etternavn">Etternavn:</Label>
                                <Input
                                    ref="etternavn"
                                    type="text"
                                    placeholder="Etternavn"
                                    className="form-control"
                                    id="etternavn"
                                    onChange={this.handleChange.bind(this, "etternavn")}
                                    value={this.state.input["etternavn"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["etternavn"]}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="adresse">Adresse:</Label>
                                <Input
                                    ref="adresse"
                                    type="text"
                                    placeholder="Adresse"
                                    className="form-control"
                                    id="adresse"
                                    onChange={this.handleChange.bind(this, "adresse")}
                                    value={this.state.input["adresse"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["adresse"]}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="postnr">Postnr:</Label>
                                <Input
                                    ref="postnr"
                                    type="text"
                                    placeholder="Postnr"
                                    className="form-control"
                                    id="postnr"
                                    onChange={this.handleChange.bind(this, "postnr")}
                                    value={this.state.input["postnr"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["postnr"]}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label for="poststed">Poststed:</Label>
                                <Input
                                    ref="poststed"
                                    type="text"
                                    placeholder="Poststed"
                                    className="form-control"
                                    id="poststed"
                                    onChange={this.handleChange.bind(this, "poststed")}
                                    value={this.state.input["poststed"]}
                                    required="required"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["poststed"]}</span>
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