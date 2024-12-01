// src/HeaderNav.js

import { Navbar, Nav } from 'react-bootstrap';
import globalStore from '../globals';
import { useEffect } from 'react';


const HeaderNav = () => {
    let validUser:any = globalStore.get("token")
    
    
    return (
        <Navbar bg="light" expand="lg" style={{ height: '80px' }}>
            <Navbar.Brand href="/">MyLogo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                   <><Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/services">Services</Nav.Link></>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderNav;