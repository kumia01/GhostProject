import React, { Component } from 'react';
import { Button, Form, Container, Col, Row, Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';
import Axios from 'axios'


//Kode hentet fra https://rapidapi.com/deep.anuraj10/api/live-stock-market-news/

//Koden brukes til å vise Akjse nyheter

const axios = require("axios");

const options = {
	method: 'GET',
	url: 'https://live-stock-market-news.p.rapidapi.com/news/economic_times',
	headers: {
		'X-RapidAPI-Key': '2e0f850e20msh9b8ede82b348ad3p164211jsn9bc92debbda4',
		'X-RapidAPI-Host': 'live-stock-market-news.p.rapidapi.com'
	}
};



export class LiveNyheter extends Component {
	static displayName = LiveNyheter.name;
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
		this.liveAPI = this.liveAPI.bind(this)
		this.liveAPI();
	}

	liveAPI() {
		Axios.request(options)
			.then((response) => {
				console.log(response.data)
				this.setState({ list: response.data })
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	render() {

		let data = this.state.list.slice(0,3).map((i, key) => {
			return (
				<Col fluid="true">
                        <Card>
						<CardHeader>{i.source }</CardHeader>
                            <CardBody>
							<CardTitle>{i.title}</CardTitle>
                            </CardBody>
                            <CardFooter>link</CardFooter>
                        </Card>
				</Col>

			)
		}) 
		

		return (
			<div>
				{data}
			</div>
		)

    }
}