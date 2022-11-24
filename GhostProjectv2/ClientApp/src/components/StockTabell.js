import React, { Component, useState, useEffect } from 'react';
import{ Redirect } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import axios from "axios";

const options = {
	method: 'GET',
	url: 'https://query1.finance.yahoo.com/v10/finance/quoteSummary/{symbol}?modules=recommendationTrend',
	
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
			console.log(response.data)
			//this.setState({list: response.data.finance.result[0].quotes})
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