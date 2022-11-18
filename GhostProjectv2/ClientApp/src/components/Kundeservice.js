import React, { Component } from 'react';
import { Button, Form, FormGroup, Container, Col, Row, } from 'reactstrap';


export class Kundeservice extends Component {
    static displayName = Kundeservice.name;

    render() {
        return (
            <Container>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col sm="12" md="6" lg="6">
                        <h2 className="text-center"><strong>Kundeservice</strong></h2>
                    </Col>
                </Row>
            </Container>
        );
    }
}