import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, InputGroup} from 'reactstrap';
import $ from 'jquery';
import { validerTickerselg } from './Validering';





export class TickerSell extends Component {
  static displayName = TickerSell.name;
    constructor(props){
        super(props)
        this.state = {
            maxVolum: sessionStorage.getItem('maxVolum'),
            data: sessionStorage.getItem('tickerSell'),
            redirect: false,
            ticker: {},
            value: 0,
            transaksjon: {}
        }
        this.hentEn = this.hentEn.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.selgAksje = this.selgAksje.bind(this)
        this.hentEn()
        this.renderRedirect()
    }

    renderRedirect(){
        if(sessionStorage.getItem('tickerSell') == null){
            return <Redirect to='/Historikk' />
        }else if(this.state.redirect){
            sessionStorage.removeItem('kundeId')
            return <Redirect to='/Historikk' />
        }
    }
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

    selgAksje() {

        const transaksjon = {
            ticker: this.state.ticker.ticker,
            volum: -this.state.value,
            pris: parseInt(this.state.ticker.pris),
            brukereId: sessionStorage.getItem('kundeId'),
            flereAksjerId: this.state.ticker.id
        }
        const selgVal = validerTickerselg(this.state.value, this.state.maxVolum)

       if(selgVal){
        $.post('../Transaksjon/Lagre', transaksjon, () => {
            this.setState({redirect: true})
        })
            .fail(function (feil) {
                console.log(feil);
            });
       }
        
    }

    handleChange(event){
        this.setState({ value: event.target.value })
    }


    render () {
    
        return (
            
            <Container>
                {this.renderRedirect()}
                <Row fluid="true" className="justify-content-md-center">
                    <Col md='6'>
                        <Form>
                            <h1>Aksje Salg av {this.state.ticker.ticker}</h1>
                            <p>Pris per Aksje: {this.state.ticker.pris + "$"}</p>
                            <p>Sum: {parseInt(this.state.ticker.pris * this.state.value) + "$"}</p>
                            <FormGroup row>
                                <Label htmlFor='Volum'>
                                    Volum
                                </Label>
                                <Col>
                                <InputGroup>
                                    <Input htmlFor='Volum' type='number' value={this.state.value} onChange={this.handleChange} max={this.state.maxVolum} min="0"/>
                                        <Button color="danger" onClick={this.selgAksje}>Selg</Button>
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