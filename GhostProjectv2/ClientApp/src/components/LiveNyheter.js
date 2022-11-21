import React, { Component } from 'react';
import { } from 'reactstrap';
import $ from 'jquery';

//Kode hentet fra https://rapidapi.com/deep.anuraj10/api/live-stock-market-news/

//Koden brukes til å vise Akjse nyheter

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://live-stock-market-news.p.rapidapi.com/news/economic_times",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "2e0f850e20msh9b8ede82b348ad3p164211jsn9bc92debbda4",
		"X-RapidAPI-Host": "live-stock-market-news.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

export class LiveNyheter extends Component {
    static displayName = LiveNyheter.name;

	render() {
		<div></div>


    }
}