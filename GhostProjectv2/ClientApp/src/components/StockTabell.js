import React, { Component, useState, useEffect } from 'react';
import{ Redirect } from 'react-router-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

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
			list: [],
			redirect: false
		}
		this.callAPI = this.callAPI.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this)
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
	
	buy(ticket){
		sessionStorage.setItem('ticket', ticket)
		this.setState({
			redirect: true
		})
	}

	renderRedirect(){
		if(this.state.redirect){
			return <Redirect to='/tickerbuy' />
		}
	}

    render() {
		let data = this.state.list.slice(0,10).map((i,key) =>{
			return(
				<tr key={key}>
					<th>{key+1}</th>
					<td>{i.shortName}</td>
					<td>{i.symbol}</td>
					<td>{i.regularMarketPrice}</td>
					<td>{i.regularMarketChange}</td>
					<td><Button color="success" onClick={this.buy.bind(this, i.symbol)} >kjøp</Button></td>
					<td><Button color="danger">selg</Button></td>
				</tr>
			);
		});
	
		return (
			<div>
				{this.renderRedirect()}
				<Table responsive>
					<thead><tr><th>#</th><th>aksje</th><th>ticker</th><th>pris</th><th>endring</th></tr></thead>
					<tbody>
						{data}
					</tbody>
				</Table>
			</div>
			
		);
	}

}