import { uniqueSort } from 'jquery';
import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap';
import $ from 'jquery';






export class TickerBuy extends Component {
  static displayName = TickerBuy.name;
    constructor(props){
        super(props)
        this.state = {
            data: sessionStorage.getItem('ticker'),
            ticker: {}
        }
        this.hentEn = this.hentEn.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
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
                gammelPris: response.gammelPris

            }})
            console.log(this.state.ticker)
        })
    }


  render () {
    
    return (
        
        <Container>
            <Row fluid="true" className="justify-content-md-center">
                <Col md='6'>
                    <Form>
                        <h1>Aksje kjøp av {this.state.ticker.ticker}</h1>
                        <FormGroup>
                            <Label htmlFor='Volum'>
                                Volum 
                            </Label>
                            <Input htmlFor='Volum' />
                        </FormGroup>
                        <FormGroup>
                            <Button color="success" >kjøp</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
  }
}