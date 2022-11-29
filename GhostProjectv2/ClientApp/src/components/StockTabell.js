import React, { Component, useState, useEffect } from 'react';
import{ Redirect } from 'react-router-dom';
import { Table, Button, Input } from 'reactstrap';
import axios from "axios";
import $ from 'jquery';
const options = {
	method: 'GET',
	url: 'https://latest-stock-price.p.rapidapi.com/any',
	headers: {
	  'X-RapidAPI-Key': 'fd945d0c24msh3ed33568bd9280fp10086djsn4f53ccc85b53',
	  'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
	}
  };


/*axios.request(options)
	.then((response) => {
		console.log(response.data)
	})
	.catch(function (error) {
		console.error(error);
	});
*/


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
		//this.callAPI = this.callAPI.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this)
		this.callAskjeListe = this.callAskjeListe.bind(this)
		this.callAskjeListe();
		//this.callAPI();
	}

	callAskjeListe(){
		axios.get('../Aksje/HentAlle')
		.then((response) => {
			this.setState({
				list: response.data
			})
		})
		.catch(function (error) {
			console.error(error);
		});
	}

	/*callAPI(){
		axios.request(options)
		.then((response) => {
			console.log(response.data)
			//this.setState({list: response.data.finance.result[0].quotes})
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
			$.ajax({
				url: "../Aksje/Lagre",
				type: "POST",
				data: JSON.stringify(innAksjer),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (OK) {
					if (OK) {
						//Sender Aksjer til 

						console.log("FUCK YEAH!!");
					}
					else {
						//Fikse error melding
						document.getElementById("feil").textContent = "Feil i db - prøv igjen senere!";
						console.log("FEIL!!");
					}
				}
			})
		})
		.catch(function (error) {
			console.error(error);
		});

	}*/

	
	
	
	buy(ticker){
		sessionStorage.setItem('ticker', ticker)
		this.setState({redirect: true})
	}

	renderRedirect(){
		if(this.state.redirect){
			return <Redirect to='/tickerBuy' />
			
		}
	}

    render() {
		let data = this.state.list.slice(this.props.data.random, this.props.data.random + 10).map((i,key) =>{
			return(
				<tr key={key}>
					<th>{key+1}</th>
					<td>{i.ticker}</td>
					<td>{i.selskap}</td>
					<td>{i.pris + " NOK"}</td>
					<td>{i.gammelPris + " NOK"}</td>
					<td><Button color="success" onClick={this.buy.bind(this, i.ticker)} >Kjøp</Button></td>
				</tr>
			);
		});
	
		return (
			<div>
				{this.renderRedirect()}
				<Table className="table-responsive table table-hover">
					<thead><tr><th>#</th><th>Ticker</th><th>Aksje</th><th>Pris</th><th>Gammel pris</th></tr></thead>
					<tbody>
						{data}
					</tbody>
				</Table>
			</div>
			
		);
	}

}