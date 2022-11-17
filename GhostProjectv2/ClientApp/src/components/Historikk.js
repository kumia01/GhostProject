import React, { Component } from 'react';
import { Container, Button, ButtonGroup, ButtonToolbar, Row, Col, Table} from 'reactstrap';

export class Historikk extends Component {
  static displayName = Historikk.name;

  render () {
    return (
      <div>
        <p>Overføringer</p>
        <Container fluid="true">
            <Row fluid="true">
              <ButtonToolbar>
                <ButtonGroup className="mr-2">
                    <Button outline>Overfør</Button>
                    <Button color="primary" sm="1">Transaksjoner</Button>
                </ButtonGroup>
            </ButtonToolbar>  
            </Row>
            <Row fluid="true">
                <Col md="6" pt="3">
                    <Table borderless>
                        <thead>
                            <tr>
                            <th>Dato</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>11.02.2021</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-arrow-left"> Overføring til konto: NOK 2, 0000</i></td>
                            </tr>
                            <tr>
                                <td>03.01.2021</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-arrow-right"> Innskudd: NOK 1, 000</i></td>
                            </tr>
                            <tr>
                                <td>05.01.2021</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-arrow-left"> Overføring av aksjer til bruker @ </i></td>
                            </tr>
                            <tr>
                                <td>15.12.2020</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-arrow-right"> Mottok aksjer fra bruker @</i></td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

      </div>
    );
  }
}