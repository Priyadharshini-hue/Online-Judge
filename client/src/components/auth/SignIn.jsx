import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import image from '../../images/signIn.svg';

const SignIn = () => {
    return (
        <div className='mt-3 d-flex justify-content-center'>
           <Card className="p-3 w-25">
            <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 80, height: 80, borderRadius: '50%', padding: "10px" }} />
            <Form >
                <Form.Group className="mb-3" controlId="formGroupEmail" placeholder="Email address">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" />
                </Form.Group>
                <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                <Form.Text className=" d-flex justify-content-center mt-2">
                    <span className=""> Don't have an account?</span> &nbsp;
                    <a className="fw-bold text-dark text-decoration-none" href="/signUp">Sign up</a>
                </Form.Text>
                <Form.Text className=" d-flex justify-content-center mt-2">
                    <span className="">Forgot Password? </span> &nbsp;
                    <a className="fw-bold text-dark text-decoration-none" href="/resetPassword">Reset</a>
                </Form.Text>
            </Form>
        </Card>
        </div >
    )
}

export default SignIn
