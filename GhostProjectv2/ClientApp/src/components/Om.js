import React, { Component } from 'react';
import oslomet from '../img/oslomet.jpg';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Container, Col, Row } from 'reactstrap';


export class Om extends Component {
    static displayName = Om.name;

    render() {
        return (
            <Container>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col sm="12" md="6" lg="6">
                        <h2 className="text-center"><strong>Om Oss</strong></h2>
                    </Col>
                </Row>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col md="6">
                        <h5 className="text-center"><strong>Ghost Finance</strong></h5>
                        <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.
                            Sapien pellentesque habitant morbi tristique senectus et netus.</p>
                        <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.
                            Sapien pellentesque habitant morbi tristique senectus et netus.</p>
                        <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.
                            Sapien pellentesque habitant morbi tristique senectus et netus.</p>
                    </Col>
                    <Col fluid="true" md="6">
                        <img src={oslomet} width="450" />
                    </Col>
                </Row>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col md="6">
                        <FormGroup>
                            <Link className="link-primary" to="/kundeservice">Til kundeservice</Link>
                        </FormGroup>
                    </Col>
                    <Col md="6"></Col>
                </Row>
            </Container>
        );
    }
}