import React, { Component } from 'react';
import { Button, Form, Container, Col, FormGroup, Label, Input, Row, CardBody, CardTitle, CardSubtitle, CardText, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export class Profil extends Component {
    static displayName = Profil.name;


    //Kode for Cards og Kode for dropdown og Labels er hentet fra https://reactstrap.github.io/

    render() {
        return (
            <Card className="profilkort" style={{
                    width: '35rem',
                    height: '35rem'
                
                }}
            >
            <CardBody>
                <CardTitle tag="h5">Min Profil</CardTitle>
                <CardText> Din profil er ikke synlig for andre brukere </CardText>
                <CardText> Hvis du ønsker å oppdatere din profil, kan du kontakte kundeservice</CardText>
                    <FormGroup>
                        <Label for="Bruker">Bruker:</Label>
                    </FormGroup>


                    <CardText> Slett eller endre BrukerKonto </CardText>
                    <CardText> Du kan Slette din konto her, om du ikke lenger vil ha tilgang til tjenesten. Eller du kan endre din personlig informasj</CardText>
                    
                    <div>
                        <Button color="danger">Slett Meg</Button>
                    </div>
                </CardBody>
            </Card>
            
            )
      




    }




}