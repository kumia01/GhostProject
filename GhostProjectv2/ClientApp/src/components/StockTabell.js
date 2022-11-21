import React, { Component, useState, useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import axios from "axios";
import { data } from 'jquery';

const options = {
	method: 'GET',
	url: 'https://latest-stock-price.p.rapidapi.com/any',
	headers: {
		'X-RapidAPI-Key': 'fd945d0c24msh3ed33568bd9280fp10086djsn4f53ccc85b53',
		'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
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
			console.log(response.data)
			this.setState({list: response.data})
		})
		.catch(function (error) {
			console.error(error);
		});
	}

    render() {
		let data = this.state.list.slice(0,10).map((i,key) =>{
			return(
				<tr key="key">
					<td>{i.symbol}</td>
					<td>{i.open}</td>
					<td>{i.change}</td>
				</tr>
			)
		})
		return (
			<Table>
				<thead><tr><th>aksje</th><th>pris</th><th>endring</th></tr></thead>
				<tbody>
					{data}
				</tbody>
			</Table>
		);
	}

}