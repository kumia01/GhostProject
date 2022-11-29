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
import { TickerSell } from './components/TickerSell';


export function check(){
  if(sessionStorage.getItem('kundeId') != null){
    return true
  }
  return false
}


export default class App extends Component {
  static displayName = App.name;
  constructor(props){
    super(props)
    this.state = {
      user: check()
    }
    this.userAuthenication = this.userAuthenication.bind(this)
  }

  userAuthenication(item){
    this.setState({user: check()})
  
  }

  render () {

    return (
        <Layout data={{ user: this.state.user, userAuthenication: this.userAuthenication.bind(this)}} >
            <Route exact path='/' component={Home} />
            <Route path='/login' component={() => <Login data={{userAuthenication: this.userAuthenication.bind(this)}} />}/>
            <Route path='/tickerBuy' component={TickerBuy} />
            <Route path='/registrer' component={Registrer} />
            <Route path='/historikk' component={Historikk} />
            <Route path='/profil' component={() => <Profil data={{userAuthenication: this.userAuthenication.bind(this)}} />} />
            <Route path='/om' component={Om} />
            <Route path='/kundeservice' component={Kundeservice} />
            <Route path='/handel' component={Handel} />
            <Route path='/images' component={Images} />
            <Route path='/tickerSell' component={TickerSell} />
      </Layout>
    );
  }
}
