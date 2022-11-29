{/* Imports */}
import React, { Component, Fragment } from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button } from 'reactstrap';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import './NavMenu.css';
import logo from '../img/textlogo.png'

{/* Klassen NavMenu arver fra Component */}
export class NavMenu extends Component {
    // Setter displayName til NavMenu for eventuelle feilmeldinger
    static displayName = NavMenu.name;

    // Konstruktør
    constructor (props) {
        super(props);

        // Binder til this
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.redirectBruker = this.redirectBruker.bind(this);
        this.loggUt = this.loggUt.bind(this);

        // Default state for navbar
        this.state = {
            collapsed: true,
            redirect: false 
        };
    }

    // Funksjonen som viser eller gjemmer navbar
    toggleNavbar () {
        this.setState({
        collapsed: !this.state.collapsed
        });
    }

    // Setter status til true og så tilbake til false for å kunne laste navbar på nytt
    redirectBruker() {
        this.props.data.userAuthenication();
        this.setState({ redirect: true });
        this.setState({ redirect: false });
    }

    // Funksjon som skal logge kunde ut
    loggUt() {
        if (sessionStorage.getItem('kundeId') != null) {
            $.get("../Bruker/LoggUt", function () {
                sessionStorage.removeItem('kundeId');
                console.log("Logget ut!");
            });
            setTimeout(this.redirectBruker, 1200);
        }
    }

    // Funksjon som kontrollerer noden du står i
    render() {

        // Sjekker om bruker er logget inn, hvis ikke skal den sendes til innlogging
        if (this.state.redirect) { 
            return <Redirect to="/login"/>
        }

        // Returnerer html elementene slik at de skrives ut
        return (

            // Alle elementene skal ligge øverst i siden, derfor brukes elementet header
            <header>

                { /* Navbar */ }
                <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-light bg-* border-bottom box-shadow mb-3" light>

                    { /* Container med HTML elementer */ }
                    <Container>

                        { /* Logo */ }
                        <NavbarBrand tag={Link} href="/" id="logo" to="/"><img src={logo} style={{ widht: "40px", height: "40px" }} /></NavbarBrand>

                        { /* Muligheten til å skru av navbar */ }
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

                        { /* Collapse */  }
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

                            { /* Uorganisert liste */ }
                            <ul className="navbar-nav flex-grow">

                                { /* Elementer i navbar vil enten være NavItem eller Dropdown */ }
                                <NavItem>
                                    <NavLink tag={Link} id="navText" to="/om">Om Oss</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} id="navText" to="/Handel">Handel</NavLink>
                                </NavItem>

                                { /* Sjekker om en bruker er logget inn, hvis den er skal logg inn i nav ikke vises */ }
                                {!this.props.data.user ?
                                    (
                                    // Case hvis bruker ikke er logget inn
                                    <Fragment>
                                        <NavItem>
                                            <NavLink className="loggInn" tag={Link} id="navTextHighlight" to="/login">Logg inn</NavLink>
                                        </NavItem>
                                    </Fragment>    
                                ) : 
                                    (
                                    // Case hvis bruker er logget inn
                                    <Fragment>
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
                                    </Fragment>
                                )}      
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}