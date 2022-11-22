import React, { Component } from 'react';
import { } from 'reactstrap';
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

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});



export class LiveNyheter extends Component {
    static displayName = LiveNyheter.name;

	render() {
		<div></div>


    }
}