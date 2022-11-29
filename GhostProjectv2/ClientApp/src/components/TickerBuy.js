import React, { Component} from 'react';
import {  Redirect } from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, InputGroup} from 'reactstrap';
import $ from 'jquery';
{/* Henter funksjoner fra js komponenten Validering */ }
import { validerTickerbuy } from './Validering';
import { isThisTypeNode } from 'typescript';





export class TickerBuy extends Component {
  static displayName = TickerBuy.name;
    constructor(props){
        super(props)
        this.state = {
            data: sessionStorage.getItem('ticker'),
            render: false,
            ticker: {},
            bruker: {},
            value: 0,
            transaksjon: {}
        }
        this.hentEn = this.hentEn.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.kjøpAksje = this.kjøpAksje.bind(this)
        this.hentBruker = this.hentBruker.bind(this)
        this.checklogin = this.checklogin.bind(this)
        this.hentBruker()
        this.hentEn()
        this.renderRedirect()
    }

    //sender siden til handel av if tester
    renderRedirect(){
        if(sessionStorage.getItem('ticker') == null){
            return <Redirect to='/Handel' />
        }else if(this.state.render){
            return <Redirect to='/Handel' />
        }
    }

    //sjekker om lokalt om du er logget inn
    checklogin(){
        if(sessionStorage.getItem('kundeId') == null ){
            return <Redirect to='/Login' />
        }
    }

    //henter en ticker ut i fra lagrede tickern fra lokal
    hentEn(){
        $.get('../Aksje/HentEn',{data: this.state.data}, (response) => {
            this.setState({ticker: {
                ticker: response.ticker,
                selskap: response.selskap,
                pris: response.pris,
                gammelPris: response.gammelPris,
                id: response.id

            }})

        })
    }
    
    //henter bruker og lagrer saldo
    hentBruker(){
        const kundeid = "id=" + sessionStorage.getItem('kundeId');
        $.get("../Bruker/HentEn?" + kundeid, bruker => {
            this.setState({bruker: {
                saldo: Math.round(bruker.saldo * 100) / 100,
            }})
        })
    }

    //kjøper aksje
    kjøpAksje() {

        //instansierer transaksjon
        const transaksjon = {
            ticker: this.state.ticker.ticker,
            volum: this.state.value,
            pris: parseInt(this.state.ticker.pris),
            brukereId: sessionStorage.getItem('kundeId'),
            flereAksjerId: this.state.ticker.id
        }
        //validerer input av tickerbuy
        const valTicker = validerTickerbuy(this.state.value)

       if(valTicker){
            //sender transaksjon
            $.post('../Transaksjon/Lagre', transaksjon,() => {
                this.setState({render: true})
            })
            .fail(function (feil) {
                console.log("feil i db - " + feil);
            });
       }
        
    }
    //endrer på verdien hver gang input blir endret
    handleChange(event){
        this.setState({ value: event.target.value })
    }


    render () {
    
        return (
            
            <Container>
                {/*kjører funksjonene */}
                {this.renderRedirect()}
                {this.checklogin()}
                <Row fluid="true" className="justify-content-md-center">
                    <Col md='6'>
                        <Form>
                            <h1>Aksje kjøp av {this.state.ticker.ticker}</h1>
                            <p>Pris per Aksje: {this.state.ticker.pris + " NOK"}</p>
                            <p>Total Aksje: {parseInt(this.state.ticker.pris * this.state.value) + " NOK"} </p>
                            <p>hvor mye du har i balansen: {this.state.bruker.saldo}</p>
                            <p>saldo igjen: {parseInt(this.state.bruker.saldo - this.state.ticker.pris * this.state.value) + " NOK"}</p>
                            <FormGroup row>
                                <Label htmlFor='Volum'>
                                    Volum
                                </Label>
                                <Col>
                                <InputGroup>
                                    <Input htmlFor='Volum' type='number' value={this.state.value} onChange={this.handleChange} min='0'/>
                                    <Button color="success" onClick={this.kjøpAksje}>kjøp</Button>
                                </InputGroup>
                                </Col>
                            </FormGroup>
                            <span id="feilTicker" style={{ color: "red" }}></span>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}