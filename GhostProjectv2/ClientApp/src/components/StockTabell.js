import React, { Component, useState, useEffect } from 'react';
import{ Redirect } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import axios from "axios";
import $ from  'jquery';
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
			list: [],
			redirect: false,
			Aksje: {
				Ticker: "",
				Selskap: "",
				Pris: "",
				gammelPris: "" 
			}
		}
		this.callAPI = this.callAPI.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this)
		this.callAPI();
	}

	callAPI(){
		axios.request(options)
		.then((response) => {
			console.log(response.data)
			response.data.map((i,key) =>{
				const Aksje ={
						ticker: i.symbol,
						selskap: i.identifier,
						pris: i.open,
						gammelpris: i.lastPrice
				}
				this.state.list[key] = Aksje;
			})
			const innAksjer = this.state.list
			console.log(innAksjer)
			$.post("../Aksje/Lagre", JSON.stringify(innAksjer), function (OK) {
				if (OK) {
					//Sender Aksjer til 
	
					console.log("FUCK YEAH!!");
				}
				else {
					//Fikse error melding
					document.getElementById("feil").textContent = "Feil i db - prøv igjen senere!";
					console.log("FEIL!!");
				}
			});
		})
		.catch(function (error) {
			console.error(error);
		});
		
		
		
	
	}
	
	buy(ticker){

		sessionStorage.setItem('ticker', ticker)

		this.setState({
			redirect: true
		})
	}

	renderRedirect(){
		if(this.state.redirect){
			return <Redirect to='/tickerBuy' />
			
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