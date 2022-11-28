{/* Imports */ }
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Card, CardBody, Container, CardTitle, CardText, CardImg } from 'reactstrap';

import ghost_graph from '../img/ghost_graph.png';
import blåstolper from '../img/blåstolper.png';
import oslomet from '../img/oslomet.jpg';


export class Images extends Component {

    static displayName = Images.name;

    render() {

        return (

            <Container>

                { /* Logo */}
                <Card className="my-2">
                    <CardImg
                        alt="Ghost Finance Logo"
                        src={ghost_graph}
                        style={{width: 300}}
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                        <strong>Logo</strong>
                        </CardTitle>
                        <CardText>
                            Logoen ble laget av Storm Villenfeldt i forbindelse med prosjektoppgaven.
                        </CardText>
                        <CardText>
                            <small className="text-muted">
                                Dato opprettet: 27. september 2022
                            </small>
                        </CardText>
                    </CardBody>
                </Card>

                { /* Blåstolper */}
                <Card className="my-2">
                    <CardImg className="pl-2 pt-2"
                        alt="Blått stolpediagram"
                        src={blåstolper}
                        style={{ width: 300 }}

                    />
                    <CardBody>
                        <CardTitle tag="h5">
                        <strong>Blåstolper</strong>
                        </CardTitle>
                        <CardText>
                            Bildet av stolpene er hentet fra AdobeStock. Grafen er separert fra filen og fargene på den er endret i Illustrator. Linsensen har ressurs-id #480896560. <br/> <a href="https://stock.adobe.com/no/images/economic-growth-revenue-and-investment-improving-results-boosting-business-financial-results-and-profit/480896560"> Original vektorfil kan ses her.</a> 
                        </CardText>
                        <CardText>
                            <small className="text-muted">
                                Dato hentet: 30. september 2022 
                            </small>
                        </CardText>
                    </CardBody>
                </Card>

                { /* OsloMet */}
                <Card className="my-2">
                    <CardImg className="pl-2 pt-2"
                        alt="Pilestredet p35 ved OsloMet"
                        src={oslomet}
                        style={{ width: 300 }}

                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            <strong>OsloMet</strong>
                        </CardTitle>
                        <CardText>
                            Et enkelt googlesøk etter "oslomet p35" ga følgende resultat. Bildet er hentet fra følgende <a href="https://journalen.oslomet.no/2020/10/digital-karriereuke-pa-oslomet">artikkel.</a>
                        </CardText>
                        <CardText>
                            <small className="text-muted">
                                Dato hentet: 18. november 2022
                            </small>
                        </CardText>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}