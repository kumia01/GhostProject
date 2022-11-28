import React, { Component } from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button } from 'reactstrap';
import $ from 'jquery';

import { Link, Redirect } from 'react-router-dom';
import './NavMenu.css';
import logo from '../img/textlogo.png'

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.redirectBruker = this.redirectBruker.bind(this);
        this.loggUt = this.loggUt.bind(this);

        this.state = {
            collapsed: true,
            redirect: false 
        };
    }

    toggleNavbar () {
        this.setState({
        collapsed: !this.state.collapsed
        });
    }

    redirectBruker() {
        this.setState({ redirect: true });
        this.setState({ redirect: false });
    }

    loggUt() {
        if (sessionStorage.getItem('kundeId') != null) {
            $.get("../Bruker/LoggUt", function () {
                sessionStorage.removeItem('kundeId');
                console.log("Logget ut!");
            });
            setTimeout(this.redirectBruker, 1200);
        }
    }

    render() {
        if (this.state.redirect) { 
            return <Redirect to="/login"/>
        }
        
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-light bg-* border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} href="/" id="logo" to="/"><img src={logo} style={{ widht: "40px", height: "40px" }} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav flex-grow">

                        <NavItem>
                            <NavLink tag={Link} id="navText" to="/om">Om Oss</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} id="navText" to="/Handel">Handel</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="loggInn" tag={Link} id="navTextHighlight" to="/login">Logg inn</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav>
                            <DropdownToggle className="minSide" nav caret id="navTextHighlight">Min Side</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag={Link} to="/profil">Profil</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag={Link} to="/historikk">Historikk</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                            
                        <NavItem>
                        <Button color="primary" onClick={this.loggUt}>Logg ut</Button>
                        </NavItem>
                               
                    </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
        );
    }
}