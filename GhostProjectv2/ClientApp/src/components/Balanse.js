{/* Imports */}
import React, { Component } from 'react';

{/* Henter nødvendig funksjonalitet fra reactstrap */}
import { Button, Container, Col, Row } from 'reactstrap';

{/* Henter nødvending funksjonalitet for å kunne graflegge bevegelser på konto*/ }
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
import { Line } from "react-chartjs-2";

{/* Registrerer de importerte funksjonene */ }
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

{/* Oppretter verdiene som skal lagres utover x-akse */ }
const labels = ["January", "February", "March", "April", "May", "June", "July"];

{/*  */ }
export const option = {
    maintainAspectRation: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "rgba(2, 62, 115, 1)"
        },
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        max: 3500,
        ticks: {
          color: "rgba(2, 62, 115, 1)"
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
};

export const data = {
  labels: labels,
  datasets: [
    {
      backgroundColor: "rgba(2, 62, 115, 1)",
      borderColor: "rgba(2, 62, 115, 1)",

      data: [3000, 3000, 3300, 2000, 1550, 2000, 2600, 3000]
    }
  ]
};


// Js klassen Balanse arver fra superklassen Component
export class Balanse extends Component {

    // Setter displayName til Balanse for eventuelle debugging meldinger
    static displayName = Balanse.name;

    // Funksjon som kontrollerer container noden du står i
    render() {

        // Returnerer html elementene slik at de skrives ut
        return (

            // Container som inneholder html elementene til siden
            <Container fluid="true">

                {/* Oppretter et grid system som bruker rader og kolonner for å plassere html objektene */}
                <Row fluid="true" className=" d-flex justify-content-between">

                    {/* Kolonner har en gitt størrelse for skalering henholdsvis til skjermoppløsning */}
                    <Col md="8">

                        {/* Info-tekst for saldo */}
                        <p>Din bokførte saldo er: <br /><b>3, 000 NOK</b></p>

                    </Col>

                    {/* Kolonne for knapper */}
                    <Col md="3">

                        {/* Knapper */}
                        <Button className="btn btn-outline" id="innskudd">+ Inskudd</Button>{" "}
                        <Button className="btn btn-primary" id="overføring">Overføring</Button>
                    </Col>
                </Row>

                {/* Rad for graf */}
                <Row fluid="true">

                    {/* Kolonne for grafen */}
                    <Col fluid="true">

                        {/* Graf */}
                        <Line options={option} data={data} height={"100"}/>
                    </Col>
                </Row>

                {/* Rad for info under graf */}
                <Row fluid="true" className="justify-content-between">

                    {/* Kolonne for dato og logg info */}
                    <Col fluid="true" md='6'>

                        {/* Tekst elementer */}
                        <p className="bi bi-clock-history"> Nylig aktvitet</p>
                        <p>Logget inn 27.10.2022 23.30</p>
                    </Col>

                    {/* Kolonne for innskudd info */}
                    <Col fluid="true" md='6'>

                        {/* Tekst elementer */}
                        <p className="bi bi-arrow-repeat"> Cash Flow</p>
                        <p>Innskudd: Overføring NOK 3, 000.00 via Vipps</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}