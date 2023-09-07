import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'; 

const NavigationBar = () => { 
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Online Judge</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;