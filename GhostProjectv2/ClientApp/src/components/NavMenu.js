import React, { Component } from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import $ from 'jquery';

import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../img/textlogo.png'

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

    // Funksjonen under trenger bare å hente session for å fungere?

    /*

    showDropdown() {
        this.showDropdown = this.showDropdown.bind(this.showDropdown);
        const loggInn = document.getElementsByClassName("loggInn");
        const loggInn = document.getElementsByClassName("minSide");

        if () {
            loggInn.style.display = "none";
            minSide.style.display = "show";
        }
        else {
            minSide.style.display = "none";
            loggInn.style.display = "show";
        }
    }
    
    */

render () {
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

                            <UncontrolledDropdown nav>
                                 <DropdownToggle nav caret id="navText"> Aksjer </DropdownToggle>
                                        <DropdownMenu>
                                    <DropdownItem tag={Link} to="/handel">Handel</DropdownItem>
                                          <DropdownItem divider />
                                    <DropdownItem tag={Link} to="/">Askjetips</DropdownItem>
                                         </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                                <NavLink className="loggInn" tag={Link} id="navTextHighlight" to="/login">Log Inn</NavLink>
                            </NavItem>

                            <UncontrolledDropdown nav>
                                <DropdownToggle className="minSide" nav caret id="navTextHighlight">Min Side</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag={Link} to="/profil">Profil</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag={Link} to="/balanse">Balanse</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag={Link} to="/uttak">Innskudd & Uttak</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag={Link} to="/historikk">Historikk</DropdownItem>
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