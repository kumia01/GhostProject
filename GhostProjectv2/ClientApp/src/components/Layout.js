import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div>
            <div className="page-container">
            <div className="content-wrap">
        <NavMenu />        
        <Container>
          {this.props.children}
        </Container>
            </div>
        <Footer />
            </div>
         
      </div>
    );
  }
}
