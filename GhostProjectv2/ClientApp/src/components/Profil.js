import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row, CardBody, CardTitle, CardSubtitle, CardText, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export class Profil extends Component {
    static displayName = Profil.name;

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            brukernavn: {},
            fornavn: {},
            etternavn: {},
            adresse: {},
            postnr: {},
            poststed: {}
            }
        
    

        this.hentBruker = this.hentBruker.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    hentBruker = () => {
        const kundeid = "id=" + localStorage.getItem('kundeId');
        let input = this.state.input;
        let brukernavn, fornavn, etternavn, adresse, postnr, poststed;
        console.log(kundeid);
        $.get("../Bruker/HentEn?" + kundeid, function (bruker) {
            brukernavn = bruker.Brukernavn;
            fornavn = bruker.Fornavn;
            etternavn = bruker.Etternavn;
            adresse = bruker.Adresse;
            postnr = bruker.Postnr;
            poststed = bruker.Poststed;

            console.log(bruker);
            
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
        this.setState({
            brukernavn: brukernavn
        })
    }

    handleChange(input, e) {
        let inputs = this.state.input;
        inputs[input] = e.target.value;
        this.setState({ inputs });
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
                                onChange={this.handleChange.bind(this, "brukernavn")}
                                value={this.state.input["brukernavn"]}
                                readOnly
                            />
                            </Row>

                            <Row>
                                <Label for="fornavn">Fornavn: </Label>
                                <input
                                    ref="fornavn"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange.bind(this, "fornavn")}
                                    value={this.state.input["fornavn"]}
                                    readOnly
                                />
                            </Row>

                            <Row>
                                <Label for="etternavn">Etternavn: </Label>
                                <input
                                    ref="etternavn"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange.bind(this, "etternavn")}
                                    value={this.state.input["etternavn"]}
                                    readOnly
                                />
                            </Row>

                            <Row>
                                <Label for="adresse">Adresse: </Label>
                                <input
                                    ref="adresse"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange.bind(this, "adresse")}
                                    value={this.state.input["adresse"]}
                                    readOnly
                                />
                            </Row>

                            <Row>
                                <Label for="postnr">Postnr: </Label>
                                <input
                                    ref="postnr"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange.bind(this, "postnr")}
                                    value={this.state.input["postnr"]}
                                    readOnly
                                />
                            </Row>

                            <Row>
                                <Label for="poststed">Poststed: </Label>
                                <input
                                    ref="poststed"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange.bind(this, "poststed")}
                                    value={this.state.input["poststed"]}
                                    readOnly
                                />
                            </Row>

                            <Row>
                                <Button className="btn btn-md mb-2" color="danger" onClick={this.slett}>Slett Bruker</Button>{' '}
                        </Row>
                        </Col>
                    </Row>
            </Container>
           
        )
        
    }
}