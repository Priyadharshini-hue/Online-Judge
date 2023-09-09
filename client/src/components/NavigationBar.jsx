import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import { useLocation } from 'react-router-dom';
const NavigationBar = () => {

    const location = useLocation();
    const routesWithButtons = ['/addProblem'];
    const shouldRenderButtons = routesWithButtons.includes(location.pathname);

    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand>Online Judge</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {shouldRenderButtons && (<Button variant="outline-dark" href="/getProblems">
                        Go Back to Problems Page
                    </Button>)}
                    <div className="mx-2"></div>
                    <Button variant="outline-dark" >Log out</Button>
                </Navbar.Collapse>   </Container>
        </Navbar>
    );
};

export default NavigationBar;