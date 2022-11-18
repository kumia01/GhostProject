import React, { Component } from 'react';
import { Container } from 'reactstrap';
import $ from 'jquery';


const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "fd945d0c24msh3ed33568bd9280fp10086djsn4f53ccc85b53",
		"X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

export class StockTabell extends Component {
    static displayName = StockTabell.name;



    render() {
        return (
            <div>
                
            </div>
        );
    }
}