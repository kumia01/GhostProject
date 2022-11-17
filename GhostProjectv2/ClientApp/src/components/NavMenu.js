import React, { Component } from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
    }

    toggleNavbar () {
        this.setState({
        collapsed: !this.state.collapsed
        });
    }

render () {
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>
                <NavbarBrand tag={Link} id="" to="/">WebEx2</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink tag={Link} id="navText" to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} id="navText" to="/login">Log inn</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} id="navText" to="/registrer">Registrer</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} id="navText" to="/balanse">Balanse</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} id="navText" to="/uttak">Inntak/Uttak</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} id="navText" to="/historikk">historikk</NavLink>
                    </NavItem>


                           
                            <UncontrolledDropdown nav>
                                 <DropdownToggle nav caret> Aksjer </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem>Handel</DropdownItem>
                                          <DropdownItem divider />
                                          <DropdownItem>Askje Tips</DropdownItem>
                                         </DropdownMenu>
                             </UncontrolledDropdown>
                </ul>
                </Collapse>
            </Container>
            </Navbar>
        </header>
        );
    }
}