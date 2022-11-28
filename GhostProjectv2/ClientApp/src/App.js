import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Registrer } from './components/Registrer';
import './custom.css'
import { TickerBuy } from './components/TickerBuy';
import { Home } from './components/Home';
import { Handel } from './components/Handel';
import { Historikk } from './components/Historikk';
import { Profil } from './components/Profil';
import { Om } from './components/Om';
import { Kundeservice } from './components/Kundeservice';
import { Images } from './components/Images';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/tickerBuy' component={TickerBuy} />
            <Route path='/registrer' component={Registrer} />
            <Route path='/historikk' component={Historikk} />
            <Route path='/profil' component={Profil} />
            <Route path='/om' component={Om} />
            <Route path='/kundeservice' component={Kundeservice} />
            <Route path='/handel' component={Handel} />
            <Route path='/images' component={Images} />
      </Layout>
    );
  }
}
