import React from 'react'
import { Card, Form, Button, Image } from 'react-bootstrap';
import image from '../../images/signUp.svg';

const SignUp = () => {
    return (
        <div className='mt-1 d-flex flex-wrap justify-content-center '>
            <Card className="p-3 w-25">
                <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 75, height: 75, borderRadius: '50%', padding: "10px" }} />
                <Form >
                    <Form.Group className="mb-2" controlId="formGroupName" placeholder="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupEmail" placeholder="Email address">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control required type="password" placeholder="New Password" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                    <Form.Text className="d-flex justify-content-center mt-2">
                        <span> Already have an account? </span> &nbsp;
                        <a className="fw-bold text-dark text-decoration-none" href="/">Sign In</a>
                    </Form.Text>
                </Form>
            </Card>
        </div >
    )
}

export default SignUp
