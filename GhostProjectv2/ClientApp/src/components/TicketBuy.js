import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
export class TicketBuy extends Component {
  static displayName = TicketBuy.name;

  render () {
    if (!sessionStorage.getItem('ticket')) {
        return <Redirect to="/handel"/>
    }
    return (
        <div>

        </div>
    );
  }
}