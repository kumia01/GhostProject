{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Button, Form, Container, Col, FormGroup, Label, Input, Row, Table} from 'reactstrap';

{/* Importerer funksjoner fra react-router-dom, disse brukes til å bytte til en annen js komponent */ }
import { Link, Route, Redirect } from 'react-router-dom';

{/* Importerer jquery biblioteket */ }
import $ from 'jquery';

{/* Henter funksjoner fra js komponenten Validering */ }
import { validerFornavn, validerAdresse, validerEtternavn, validerPostnr, validerPoststed } from './Validering';

{/* Js klassen Profil arver fra superklassen Component */ }
export class Profil extends Component {

    // Setter displayName til Profil for eventuelle debugging meldinger
    static displayName = Profil.name;
    constructor(props){
        super(props)

        this.state = {
            bruker: {},
            render: false
        }

        this.renderRedirect = this.renderRedirect.bind(this)
        this.hentBruker = this.hentBruker.bind(this)
        this.slettBruker = this.slettBruker.bind(this)
        this.endreBruker = this.endreBruker.bind(this)
        this.settInnPenger = this.settInnPenger.bind(this)
        this.taUtPenger = this.taUtPenger.bind(this)
        this.hentBruker()
    }

    renderRedirect(){
        if(sessionStorage.getItem('kundeId') == null){
            return <Redirect to='/Login' />
        }
        else if(this.state.render){
            return <Redirect to='/Login' />
        }
    }


    settInnPenger() {
        const transaksjon = {
            brukereId: sessionStorage.getItem('kundeId'),
            volum: $("#sum").val(),
            flereAksjerId: 811
        }
        $.post('../Transaksjon/EndreSaldo', transaksjon, function () {
            console.log("Penger satt inn!!");
        })
            .fail(function (feil) {
                console.log("kunne ikke sette inn penger!  " + feil);
            });
        setTimeout(this.hentBruker, 1000);
    }


    taUtPenger() {
        const transaksjon = {
            brukereId: sessionStorage.getItem('kundeId'),
            volum: $("#sum").val() * (-1),
            flereAksjerId: 811
        }
        $.post('../Transaksjon/EndreSaldo', transaksjon, function () {
            console.log("Penger tatt ut!");
        })
            .fail(function (feil) {
                console.log("kunne ikke ta ut penger!  " + feil);
            });
        setTimeout(this.hentBruker, 1000);
    }

    hentBruker(){
        const kundeid = "id=" + sessionStorage.getItem('kundeId');
        $.get("../Bruker/HentEn?" + kundeid, bruker => {
            this.setState({bruker: {
                id: sessionStorage.getItem('kundeId'),
                brukernavn: bruker.brukernavn,
                fornavn: bruker.fornavn,
                etternavn: bruker.etternavn,
                adresse: bruker.adresse,
                saldo: Math.round(bruker.saldo * 100) / 100,
                postnr: bruker.postnr,
                poststed: bruker.poststed 
            }})
            console.log(this.state.bruker)
        })
            .fail(feil =>{
                if (feil.status == 401) {
                    console.log("Ikke logget inn!");
                    sessionStorage.removeItem('kundeId')
                    this.setState({render: true})
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
        const bruker = {
            id: sessionStorage.getItem('kundeId'),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            adresse: $("#adresse").val(),
            postnr: $("#postnr").val(),
            poststed: $("#poststed").val()
        }

        const fornavnOK = validerFornavn(bruker.fornavn);
        const etternavnOK = validerEtternavn(bruker.etternavn);
        const adresseOK = validerAdresse(bruker.adresse);
        const postnrOK = validerPostnr(bruker.postnr);
        const poststedOK = validerPoststed(bruker.poststed);

        if (fornavnOK && etternavnOK && adresseOK && postnrOK && poststedOK) {

            $.post("../Bruker/Endre", this.state.bruker, function () {
                console.log("Bruker endret!");
                document.getElementById("brukerendret").textContent = "Brukeren ble endret!";
            })
                .fail(function (feil) {
                    if (feil.status == 401) {
                        //relocate bruker til logginn
                        console.log("Ikke logget inn!");
                        sessionStorage.removeItem('kundeId')
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

    // Funksjon som kontrollerer noden du står i
    render() {
        //let data;
        /*if (this.state.innskudd) {
            //data = () => {
                return 
                    <Row>
                        <Input
                            id="innskudd"
                            name="innskudd"
                            type="text"
                        />
                        <Button onClick={this.bankInnskudd}></Button>
                    </Row >
                
            
        }
        if (this.state.uttak) {
            //data = () => {
                return 
                    <Row>
                        <Input
                            id="innskudd"
                            name="innskudd"
                            type="text"
                        />
                        <Button onClick={this.bankUttak}></Button>
                    </Row >   
        }*/
       
        // Returnerer html elementene slik at de skrives ut
        return (
            // Container som inneholder html elementene til siden
            <Container>
                {this.renderRedirect()}

                {/* Rad som skalerer på enhet */}
                <Row fluid="true">
                    <Col sm="12" md="6" lg="6" xl="6">
                        {/* Undertittel */}
                        <h4 className="text-center text-md-center"><strong>Hei, {this.state.bruker.fornavn}</strong></h4>

                        {/* Tekst elementer */}
                        <p>
                            Din profil er ikke synlig for andre brukere.
                            Hvis du ønsker å oppdatere din profil kan du gjøre det ved skrive inn ny informasjon i feltene under.
                            Etter du har gjort endringene så trykker du på "Endre Bruker".
                            Hvis du ønsker å slette din profil kan du gjøre det ved å trykke på knappen "Slett Bruker" under.
                        </p>
                    </Col>

                    <Col sm="12" md="6" lg="6" xl="6">
                        <h4 className="text-center text-md-center"><strong>Saldo</strong></h4>
                        <p className="text-center text-md-center">Din bokførte saldo er: {this.state.bruker.saldo} NOK</p>  
                    </Col>
                </Row>
                { /*className="pt-noe definerer padding-top"*/}
                <Row fluid="true" className="pt-3">
                    <Col sm="12" md="6" lg="6" xl="6">
                        <h4 className="text-center text-md-left">Kontoinformasjon</h4>
                        <hr/>
                        <Form>
                        <FormGroup row>
                            <Label for="brukernavn" sm="2">Brukernavn </Label>
                            <Col sm="10">
                                <Input
                                    id="brukernavn"
                                    name="brukernavn"
                                    placeholder={this.state.bruker.brukernavn}
                                    type="text"
                                    disabled
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="fornavn" sm="2">Fornavn </Label>
                            <Col sm="10">
                                <Input
                                    id="fornavn"
                                    name="fornavn"
                                    placeholder={this.state.bruker.fornavn}
                                    type="text"
                                />
                                <span id="feilfornavn" style={{ color: "red" }}></span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="etternavn" sm="2">Etternavn </Label>
                            <Col sm="10">
                                <Input
                                    id="etternavn"
                                    name="etternavn"
                                    placeholder={this.state.bruker.etternavn}
                                    type="text"
                                />
                                <span id="feiletternavn" style={{ color: "red" }}></span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="adresse" sm="2">Adresse </Label>
                            <Col sm="10">
                                <Input
                                    id="adresse"
                                    name="adresse"
                                    placeholder={this.state.bruker.adresse}
                                    type="text"
                                />
                                <span id="feiladresse" style={{ color: "red" }}></span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="postnr" sm="2">Postnr </Label>
                            <Col sm="10">
                                <Input
                                    id="postnr"
                                    name="postnr"
                                    placeholder={this.state.bruker.postnr}
                                    type="text"
                                />
                                <span id="feilpostnr" style={{ color: "red" }}></span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="feilpoststed" sm="2">Poststed </Label>
                            <Col sm="10">
                                <Input
                                    id="poststed"
                                    name="poststed"
                                    placeholder={this.state.bruker.poststed}
                                    type="text"
                                />
                                <span id="feilpoststed" style={{ color: "red" }}></span>
                            </Col>
                        </FormGroup>
                            <FormGroup row>
                                <Col fluid="true" className="btn-group-vertical pt-3">

                                    <Button color="success" className="btn btn-md mb-2" onClick={this.endreBruker}>Endre bruker</Button>
                                    <Button color="danger" className="btn btn-md mt-2" onClick={this.slettBruker}>Slett Bruker</Button>
                                </Col>
                        </FormGroup>
                        </Form>

                        {/* Span for eventuelle tilbakemeldinger */}
                        <span id="brukerendret" style={{ color: "green" }}></span>
                        <span id="feil" style={{ color: "red" }}></span>
                    </Col>

                    <Col sm="12" md="6" lg="6" xl="6">
                        <h4 className="text-center text-md-center">Innskudd og uttak</h4>

                        <Row>

                            { /*Tomme kolonner hjelper sentrere elementer i reactstrap*/}
                            <Col></Col>
                            <Col fluid="true" className="btn-group-vertical mt-3" sm="6" md="6" lg="6" xl="6">
                                <Button className="btn btn-md mb-2" color="primary" onClick={this.settInnPenger}>Utfør Innskudd</Button>{' '}
                                <Button className="btn btn-md mb-2" color="primary" onClick={this.taUtPenger}>Utfør Uttak</Button>{' '}
                                <Input
                                    placeholder="Skriv inn ønsket sum her!"
                                    type="number"
                                    min="0"
                                    id="sum"
                                />
                            </Col>
                            <Col></Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}