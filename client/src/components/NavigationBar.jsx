import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
    const token = sessionStorage.getItem("jwtToken");
    const {logout} = useAuth();

    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand>Online Judge</Navbar.Brand>
                {token ?
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-dark" href="/problems/list">
                            View Problems
                        </Button>
                        <div className="mx-2"></div>
                        <Button variant="outline-dark" onClick={logout} >Log out</Button>
                    </Navbar.Collapse>
                    : null}
            </Container>
        </Navbar>
    );
};

export default NavigationBar;