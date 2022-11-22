import React, { Component, useState, useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import axios from "axios";
import { data } from 'jquery';

const options = {
	method: 'GET',
	url: 'https://yh-finance.p.rapidapi.com/market/get-trending-tickers',
	params: {region: 'US'},
	headers: {
	  'X-RapidAPI-Key': 'fd945d0c24msh3ed33568bd9280fp10086djsn4f53ccc85b53',
	  'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
	}
  };



export class StockTabell extends Component {
    static displayName = StockTabell.name;
	constructor(props){
		super(props)
		this.state = {
			list: []
		}
		this.callAPI = this.callAPI.bind(this)
		this.callAPI();
	}

	callAPI(){
		axios.request(options)
		.then((response) => {
			console.log(response.data.finance.result[0].quotes)
			this.setState({list: response.data.finance.result[0].quotes})
		})
		.catch(function (error) {
			console.error(error);
		});
	}

    render() {
		let data = this.state.list.slice(0,10).map((i,key) =>{
			return(
				<tr key={key}>
					<th>{key+1}</th>
					<td>{i.shortName}</td>
					<td>{i.regularMarketPrice}</td>
					<td>{i.regularMarketChange}</td>
				</tr>
			)
		})
		return (
			<Table>
				<thead><tr><th>#</th><th>aksje</th><th>pris</th><th>endring</th></tr></thead>
				<tbody>
					{data}
				</tbody>
			</Table>
		);
	}

}