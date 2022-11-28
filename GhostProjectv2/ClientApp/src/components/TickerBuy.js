import { uniqueSort } from 'jquery';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, InputGroup} from 'reactstrap';
import $ from 'jquery';






export class TickerBuy extends Component {
  static displayName = TickerBuy.name;
    constructor(props){
        super(props)
        this.state = {
            data: sessionStorage.getItem('ticker'),
            ticker: {},
            value: 0
        }
        this.hentEn = this.hentEn.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.kjøpAksje = this.kjøpAksje.bind(this)
        this.hentEn()
    }

    renderRedirect(){
        if(!sessionStorage.getItem('ticker')){
            return <Redirect to='/handel' />
        }
    }
    hentEn(){
        $.get('../Aksje/HentEn',{data: this.state.data}, (response) => {
            this.setState({ticker: {
                ticker: response.ticker,
                selskap: response.selskap,
                pris: response.pris,
                gammelPris: response.gammelPris

            }})

        })
    }

    kjøpAksje(){

    }

    handleChange(event){
        this.setState({ value: event.target.value })
    }


    render () {
    
        return (
            
            <Container>
                {this.renderRedirect}
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
                                    <Input htmlFor='Volum' value={this.state.value} onChange={this.handleChange} type="number" min="0" />
                                    <Button color="success">kjøp</Button>
                                </InputGroup>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}