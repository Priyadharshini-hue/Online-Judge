import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand>Online Judge</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-dark" href="/problems/list">
                        Go Back to Problems Page
                    </Button>
                    <div className="mx-2"></div>
                    <Button variant="outline-dark" >Log out</Button>
                </Navbar.Collapse>   </Container>
        </Navbar>
    );
};

export default NavigationBar;