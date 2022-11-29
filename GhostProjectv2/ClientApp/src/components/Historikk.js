{/* Imports */ }
import React, { Component } from 'react';

{/* Henter Redirect fra react-router-dom */}
import { Redirect } from 'react-router-dom';

{/* Importerer axios biblioteket */}
import axios from "axios";

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Container, Button, ButtonGroup, Row, Col, Table} from 'reactstrap';

{/* Js klassen Handel arver fra superklassen Component */ }
export class Historikk extends Component {

    // Setter displayName til Historikk for eventuelle debugging meldinger
    static displayName = Historikk.name;

    // Konstruktør
    constructor(props) {
        super(props)

        // Setter default status for innhold til usynlig
        this.state = {
            visAksjer: false,
            visInnskudd: false,
            visHistorikk: false,
            redirect: false,
            redirect2: false,
            aksjeList: [],
            innskuddUttakList: [],
            aksjeKjøpt: {
               }
        }

        // Binder alle funksjoner til this
        this.velgVisningAksjer = this.velgVisningAksjer.bind(this);
        this.velgVisningOverføring = this.velgVisningOverføring.bind(this);
        this.velgHistorikk = this.velgHistorikk.bind(this);
        this.callAksjeKjøpListe = this.callAksjeKjøpListe.bind(this);
        this.callAksjeHistorikk = this.callAksjeHistorikk.bind(this);
        this.renderRedirect2 =this.renderRedirect2.bind(this)
        this.buy = this.buy.bind(this);
        this.callAksjeHistorikk();
        this.callAksjeKjøpListe();
        this.callUttakInntakListe();

    }

    // Funksjon som skal hente aksje historikk
    callAksjeHistorikk() {

        // Variabel som henter kundeId fra session
        const id = "brukerId=" + sessionStorage.getItem('kundeId');

        // Bruker axios til å hente bruker sin historikk og legger til id
        axios.get('../Transaksjon/HentBrukerTransaksjonHistorikk?' + id)
            .then((response) => {
                this.setState({
                    AksjeHistorikk: response.data
                })
            })

            // Logger i console hvis noe er feil
            .catch(function (feil) {
                console.log(feil);
            })

    }

    buy(ticker){
		sessionStorage.setItem('ticker', ticker)
		this.setState({redirect2: true})
	}
    // Funksjon som skal hente volum og salg fra session
    sell(ticker, volum){
        sessionStorage.setItem('maxVolum', volum)
		sessionStorage.setItem('tickerSell', ticker)
		this.setState({redirect: true})
	}

    // Funksjon som finner kjøpte aksjer fra database
    callAksjeKjøpListe() {
        const id = "brukerId=" + sessionStorage.getItem('kundeId');
        axios.get('../Transaksjon/HentBrukerTransaksjoner?' + id)
            .then((response) => {
                this.setState({
                    aksjeList: response.data
                })
            })
            .catch(function (feil) {
                console.log(feil);
            })
    }

    // Funksjon som henter informasjon om bruker sine inntak eller uttak
    callUttakInntakListe() {
        const id = "brukerId=" + sessionStorage.getItem('kundeId');
        axios.get('../Transaksjon/HentInnskuddUttak?' + id)
            .then((response) => {
                this.setState({
                    innskuddUttakList: response.data
                })
            })
            .catch(function (feil) {
                console.log(feil);
            });
    }

    // Funksjon som skriver aksjehistorikk ut på siden
    velgVisningAksjer() {
        this.setState({
            visAksjer: true,
            visInnskudd: false,
            visHistorikk: false
        });
    }

    // Funksjon som skriver overføringer ut på siden
    velgVisningOverføring() {
        this.setState({
            visAksjer: false,
            visInnskudd: true,
            visHistorikk: false
        });
    }

    // Funksjon som skriver historikk ut på siden
    velgHistorikk(){
        this.setState({
            visAksjer: false,
            visInnskudd: false,
            visHistorikk: true
        });
    }

    renderRedirect(){
		if(this.state.redirect){
			return <Redirect to='/tickerSell' />
			
		}
	}
    renderRedirect2(){
		if(this.state.redirect2){
			return <Redirect to='/tickerBuy' />
			
		}
	}


    // Funksjon som kontrollerer container noden du står i
    render() {

        // Tom variabel med navn data
        let data;

        // If-test på hvilken informasjon som er hentet, genererer riktig tabell henholdsvis
        if (this.state.visAksjer) {
            data = this.state.aksjeList.map((i, key) => {
                return ( 
                    <tr key={key}>
                       <th>{key + 1}</th>
                       <td>{i.ticker}</td>
                       <td>{i.pris}</td>
                       <td>{i.volum}</td>
                       <td>{i.volum + i.pris}</td>
                       <td><Button color='danger' onClick={this.sell.bind(this, i.ticker, i.volum)}>Selg</Button></td>
                       <td><Button color='success' onClick={this.buy.bind(this, i.ticker)}>Kjøp</Button></td>
                     </tr>
                );
            });
        }

        // If-test på hvilken informasjon som er hentet, genererer riktig tabell henholdsvis
        if (this.state.visInnskudd) {
            data = this.state.innskuddUttakList.map((i, key) => {
                return (
                
                    <tr key={key}>
                        <th>{key + 1}</th>
                        <td>{i.ticker}</td>
                        <td>{i.volum}</td>
                    </tr>
                    );
            });
        }

        // If-test på hvilken informasjon som er hentet, genererer riktig tabell henholdsvis
        //formateringen blir lagt i variabel data og senere hentet i return
        if (this.state.visHistorikk) {
            data = this.state.AksjeHistorikk.map((i, key) => {
                return (
                
                    <tr key={key}>
                        <th>{key + 1}</th>
                        <td>{i.ticker}</td>
                        <td>{i.volum}</td>
                        <td>{i.volum * i.pris}</td>
                    </tr>
                    );
            });
        }

        // Returnerer html elementene slik at de skrives ut
        return (

            /* Container som inneholder html elementer */
            <Container>
                {/*evig starter redirect funksjonene */}
                {this.renderRedirect()}
                {this.renderRedirect2()}

                { /* Rad som skalerer på enhet */ }
                <Row fluid="true">

                    { /* Tom kolonne for å plasse innhold i midten */ }
                    <Col></Col>

                    { /* Kolonne som skal ta 100% av container */ }
                    <Col sm="12" md="12" lg="12" xl="12" className="text-center">

                        { /* Overskrift */ }
                        <h2><strong>Overføringer</strong></h2>

                        { /* Undertittel brukt for å framheve tekst */ }
                        <h5>
                            Velg hvilken historikk du vil se fra knappene under
                        </h5>

                        { /* Bruker ButtonToolbar for å holde knappe på rekke */ }
                        <ButtonGroup id="btnCol">
                            { /* Knapper */ }
                            <Button color="primary" className="btn btn-md mb-2" onClick={this.velgVisningOverføring}>Innskudd/Uttak</Button>
                            <Button color="primary" className="btn btn-md mb-2" onClick={this.velgVisningAksjer}>Portfolio</Button>
                            <Button color="primary" className="btn btn-md mb-2" onClick={this.velgHistorikk}>Historikk</Button>
                        </ButtonGroup>
                    </Col>

                    { /* Tom kolonne for å plasse innhold i midten */}
                    <Col></Col>
                </Row>

               { /* Rad som skalerer på enhet */ }
                <Row fluid="true">

                    { /* Tom kolonne */ }
                    <Col></Col>
                    { /* Kolonne som skal ta hele raden */ }
                    <Col sm="12" md="12" lg="12" xl="12" className="text-center">

                        { /* Tabell */ }
                        <Table responsive borderless>

                            { /* Henter ønsket tabell */ }
                            {this.state.visInnskudd && <thead><tr><th>#</th><th>Valuta</th><th>Sum</th></tr></thead>}
                            {this.state.visAksjer && <thead><tr><th>#</th><th>Ticker</th><th>Pris</th><th>Volum</th><th>TotalPris</th></tr></thead>}
                            {this.state.visHistorikk && <thead><tr><th>#</th><th>Ticker</th><th>Volum</th><th>Pris</th></tr></thead>}
                            <tbody>
                                {data}
                            </tbody>
                        </Table>
                    </Col>

                    { /* Tom kolonne */ }
                    <Col></Col>
                </Row>
            </Container>
        );
      }
    }