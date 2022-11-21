import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Container, Col, Row, Table } from 'reactstrap';
import { StockTabell } from "./StockTabell";

export class Handel extends Component {
    static displayName = Handel.name;

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" md="12" lg="12">
                        <h2 className="text-center"><strong>Handelsfremsiden</strong></h2>
                    </Col>
                </Row>

                <Row>
                    <Col md="12" className="justify-content-center align-items-center text-center">
                        <ButtonGroup id="btnCol">
                            <Button className="btn btn-md mb-2" color="primary">Vanlig</Button>{' '}
                            <Button className="btn btn-md mb-2" color="primary">Top10</Button>{' '}
                            <Button className="btn btn-md mb-2" color="primary">Trending</Button>{' '}
                            <Button className="btn btn-md mb-2" color="primary">Plis</Button>{' '}
                        </ButtonGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md="12">
                        <h5 className="text-center">Værsåsnill kjøp</h5>
                        <StockTabell />
                    </Col>
                </Row>
            </Container>
        );
    }
}