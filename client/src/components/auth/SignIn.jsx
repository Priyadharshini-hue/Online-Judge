import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import image from '../../images/signIn.svg';
import { BACK_SERVER_URL } from '../../config/config'

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    // input validation
    const inputValidation = () => {
        const errors = {};

        // email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            errors.email = "Invalid email address";
        }

        // password validation
        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.trim().length !== password.length) {
            errors.password = "Password Should not contain whitespaces";
        }

        setErrors(errors);
        // console.log(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(event);

        if (inputValidation()) {
            axios.post(`${BACK_SERVER_URL}/`, { email: email, password: password })
                .then(result => { 
                    if (result.status === 201) {   // incorrect password
                        setMessage('Incorrect Password !!')
                        setPassword("");
                    } else if (result.status === 202) {  // user not found
                        setMessage("User not found !!")
                    } else if (result.status === 200) {  // user exsists  
                        setMessage('Signing in....');
                        setPassword("");
                        setEmail("");
                        try {
                            navigate("/getProblems");
                        } catch (err) {
                            console.log(err);
                        }
                    }
                })
                .catch(err => { console.log(err); })
        }
    }
    return (
        <div className='mt-3 d-flex justify-content-center '>
            <Card className="p-3 w-25">
                <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 80, height: 80, borderRadius: '50%', padding: "10px" }} />
                {message && (
                    <Alert className='text-center' variant="danger">
                        {message}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail" placeholder="Email address">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email"
                            value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email} />
                        {errors.email &&
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!errors.password} />
                        {errors.password &&
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        }
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

export default SignIn;