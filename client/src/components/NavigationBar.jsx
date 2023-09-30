import React from 'react';
import { Container, Button, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    const token = sessionStorage.getItem("jwtToken");
    const { logout } = useAuth();

    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand>Online Judge</Navbar.Brand>
                {token ? (
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title="Explore" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/problems/add">
                                Add Problem
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/problems/list">
                                View Problems
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/submissions/history">
                                Submission History
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/submissions/leaderBoard">
                                Leader board
                            </NavDropdown.Item>
                        </NavDropdown>
                        <div className="mx-2"></div>
                        <Button variant="outline-dark" onClick={logout}>
                            Log out
                        </Button>
                    </Navbar.Collapse>
                ) : null}
            </Container>
        </Navbar>
    );
};

export default NavigationBar;