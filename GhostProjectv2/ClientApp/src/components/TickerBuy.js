import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup, Input, Label} from 'reactstrap';







export class TickerBuy extends Component {
  static displayName = TickerBuy.name;

  render () {
    if (!sessionStorage.getItem('ticket')) {
        return <Redirect to="/handel"/>
    }
    return (
        <Container>
            <p>hi</p>
                    <Form>
                        <FormGroup>
                            <Label for='ticker'>
                                Input without validation
                            </Label>
                            <Input for='ticker' />
                        </FormGroup>
                    </Form>
        
        </Container>
    );
  }
}