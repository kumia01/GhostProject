import React, { Component} from 'react';
import {  Redirect } from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, InputGroup} from 'reactstrap';
import $ from 'jquery';
{/* Henter funksjoner fra js komponenten Validering */ }
import { validerTickerbuy } from './Validering';





export class TickerBuy extends Component {
  static displayName = TickerBuy.name;
    constructor(props){
        super(props)
        this.state = {
            data: sessionStorage.getItem('ticker'),
            ticker: {},
            value: 0,
            transaksjon: {}
        }
        this.hentEn = this.hentEn.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.kjøpAksje = this.kjøpAksje.bind(this)
        this.hentEn()
        this.renderRedirect()
    }

    renderRedirect(){
        if(!sessionStorage.getItem('ticker')){
            return <Redirect to='/tickerBuy' />
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

    kjøpAksje() {

        const transaksjon = {
            ticker: this.state.ticker.ticker,
            volum: this.state.value,
            pris: this.state.ticker.pris,
            brukereId: sessionStorage.getItem('kundeId'),
            flereAksjerId: this.state.ticker.id
        }
        const valTicker = validerTickerbuy(this.state.value)

       if(valTicker){
            $.post('../Transaksjon/Lagre', transaksjon, function () {
                console.log("TransaksjonLagret");
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
                <Row fluid="true" className="justify-content-md-center">
                    <Col md='6'>
                        <Form>
                            <h1>Aksje kjøp av {this.state.ticker.ticker}</h1>
                            <p>Pris per Aksje: {this.state.ticker.pris + "$"}</p>
                            <p>Sum: {parseInt(this.state.ticker.pris * this.state.value) + "$"}</p>
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