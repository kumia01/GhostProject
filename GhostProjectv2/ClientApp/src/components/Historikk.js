{/* Imports */ }
import React, { Component } from 'react';
import axios from "axios";

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Container, Button, ButtonGroup, ButtonToolbar, Row, Col, Table} from 'reactstrap';

{/* Js klassen Handel arver fra superklassen Component */ }
export class Historikk extends Component {

    // Setter displayName til Historikk for eventuelle debugging meldinger
    static displayName = Historikk.name;

    constructor(props) {
        super(props)

        this.state = {
            visAksjer: false,
            visInnskudd: false,
            aksjeList: [],
            innskuddUttakList: [],
            aksjeKjøpt: {
               }
        }
        this.velgVisningAksjer = this.velgVisningAksjer.bind(this);
        this.velgVisningOverføring = this.velgVisningOverføring.bind(this);
        this.callAksjeKjøpListe = this.callAksjeKjøpListe.bind(this);
        this.callAksjeKjøpListe();
        this.callUttakInntakListe();

    }

    callAksjeKjøpListe() {
        const id = "brukerId=" + sessionStorage.getItem('kundeId');
        axios.get('../Transaksjon/HentBrukerTransaksjoner?' + id)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    aksjeList: response.data
                })
            })
            .catch(function (feil) {
                console.log(feil + " oioioi");
            })
    }

    callUttakInntakListe() {
        const id = "brukerId=" + sessionStorage.getItem('kundeId');
        axios.get('../Transaksjon/HentInnskuddUttak?' + id)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    innskuddUttakList: response.data
                })
            })
            .catch(function (feil) {
                console.log("gikk ikke" + feil);
            });
    }

    velgVisningAksjer() {
        this.setState({
            visAksjer: true,
            visInnskudd: false
        });
    }

    velgVisningOverføring() {
        this.setState({
            visAksjer: false,
            visInnskudd: true
        });
    }







    // Funksjon som kontrollerer container noden du står i
    render() {
        let data;
        if (this.state.visAksjer) {
            data = this.state.aksjeList.map((i, key) => {
                return (
                    <Table responsive borderless>
                      <thead><tr><th>#</th><th>Ticker</th><th>Pris</th><th>Volum</th><th>TotalPris</th></tr></thead>
                         <tbody>
                           <tr key={key}>
                           <th>{key + 1}</th>
                           <td>{i.ticker}</td>
                           <td>{i.pris}</td>
                           <td>{i.volum}</td>
                           <td>{i.volum * i.pris}</td>
                         </tr>
                         </tbody>
                    </Table>
                    
                );
            });
        }
        if (this.state.visInnskudd) {
            data = this.state.innskuddUttakList.map((i, key) => {
                return (
                    <Table responsive borderless>
                        <thead><tr><th>#</th><th>Ticker</th><th>Antall NOK</th></tr></thead>
                        <tbody>
                            <tr key={key}>
                                <th>{key + 1}</th>
                                <td>{i.ticker}</td>
                                <td>{i.volum}</td>
                            </tr>
                        </tbody>
                    </Table>

                );
            });
        }
        
        


        // Returnerer html elementene slik at de skrives ut
        return (

            // Div som inneholder html elementene til siden
            <div>

                {/* Tekst element */}
                <p>Overføringer</p>

                {/* Container som inneholder html elementer */}
                <Container fluid="true">

                    {/* Rad som skalerer på enhet */}
                    <Row fluid="true">

                        {/* Bruker ButtonToolbar for å holde knappe på rekke */}
                        <ButtonToolbar>

                            {/* ButtonGroup sørger for at knappene er samme størrelse */}
                            <ButtonGroup className="mr-2">

                                {/* Knapper, en av de bruker outline og den andre tar primary som farge */}
                                <Button color="primary" sm="1" onClick={this.velgVisningOverføring}>Innskudd/Uttak</Button>
                                <Button color="primary" sm="1" onClick={this.velgVisningAksjer}>Transaksjoner</Button>
                            </ButtonGroup>
                        </ButtonToolbar>  
                    </Row>

                    {/* Rad som skalerer på enhet */}
                    <Row fluid="true">

                        {/* Kolonne som skal ta halve raden */}
                        <Col md="6" pt="3">

                            <h5>Velg Innskudd/Uttak for å se dine innskudd og uttak!</h5>
                            <h5>Velg Transaksjoner for å se dine aksjekjøp og salg!</h5>
                            {data}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
      }
    }