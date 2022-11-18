import React, { Component } from 'react';
import { Button, Form, FormGroup, Container, Col, Row, Label, Input,  } from 'reactstrap';


export class Kundeservice extends Component {
    static displayName = Kundeservice.name;

    render() {
        return (
            <Container>
                <Row fluid="true" className="align-items-center justify-content-center">
                    <Col sm="12" md="6" lg="6">
                        <h2 className="text-center"><strong>Kundeservice</strong></h2>
                        <Form>
                            <Label>Name</Label>
                            <Input type="text" id="inpName" />
                            <Label>Email</Label>
                            <Input type="email" id="inpEmail" />
                            <Label>Message</Label>
                            <Input type="textarea" name="message" />
                            <Button className="btn btn-primary" id="btnSend">Send</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}