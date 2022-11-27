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





{/* Js klassen Login arver fra superklassen Component */ }
export class Login extends Component {

    // Setter displayName til Login for eventuelle debugging meldinger
    static displayName = Login.name;

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.login = this.login.bind(this);
    }
    

    //login kall til serveren for å starte session
    onSubmit = () => {
        if (sessionStorage.getItem('kundeId') != null) {
            this.setState({ redirect: true });
        }
    }


    login = () => {

        const bruker = {
            brukernavn: $("#brukernavn").val(),
            passord: $("#passord").val()
        }
        const brukernavnOK = validerBrukernavn(bruker.brukernavn);
        const passordOK = validerPassord(bruker.passord);
        

        if (brukernavnOK && passordOK) { //Sjekker at regex er godkjent
            $.post("../Bruker/LoggInn", bruker , function (bruker) { //POST kall med kunde object
                console.log(bruker);
                sessionStorage.setItem('kundeId', bruker.id);
               
            }).fail(function (feil) {
                if (feil.status == 404) {
                    document.getElementById("feil").textContent = "Sjekk at du har skrevet riktig brukernavn og passord!";
                }
                else {
                    document.getElementById("feil").textContent = "Feil på server - prøv igjen senere! : " + feil.responseText + " : " + feil.status + " : " + feil.statusText;
                }
      
            });
            
        }
        setTimeout(this.onSubmit, 1800);
    }
    

    // Funksjon som kontrollerer noden du står i
    render() {
        if (sessionStorage.getItem('kundeId') != null) {
            return <Redirect to="/profil"/>
        }
        if (this.state.redirect) {
            console.log("222");
            return <Redirect to="/profil"/>
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
                                <Button className="btn btn-primary" onClick={this.login}>Logg Inn</Button>

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
