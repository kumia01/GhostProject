import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Balanse } from './components/Balanse';
import { Login } from './components/Login';
import { Registrer } from './components/Registrer';
import { Uttak } from './components/Uttak';
import './custom.css'
import { Home } from './components/Home';
import { Handel } from './components/Handel';
import { Historikk } from './components/Historikk';
import { Profil } from './components/Profil';
import { Om } from './components/Om';
import { Kundeservice } from './components/Kundeservice';
import { LiveNyheter } from './components/LiveNyheter';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/balanse' component={Balanse} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/login' component={Login} />
            <Route path='/registrer' component={Registrer} />
            <Route path='/uttak' component={Uttak} />
            <Route path='/historikk' component={Historikk} />
            <Route path='/profil' component={Profil} />
            <Route path='/om' component={Om} />
            <Route path='/kundeservice' component={Kundeservice} />
            <Route path='/handel' component={Handel} />
            <Route path='/liveNyheter' component={LiveNyheter} />

      </Layout>
    );
  }
}
