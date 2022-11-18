import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Container, Col, Row, Table } from 'reactstrap';


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
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ticker</th>
                                    <th>Aksje</th>
                                    <th>Pris</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>TST</td>
                                    <td>Test-aksje1</td>
                                    <td>69kr</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>TXT</td>
                                    <td>Test-aksje2</td>
                                    <td>12kr</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>AAA</td>
                                    <td>Aaaaaa</td>
                                    <td>100kr</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}