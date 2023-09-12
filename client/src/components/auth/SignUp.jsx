import React, { useState } from 'react'
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import axios from 'axios';
import image from '../../images/signUp.svg';
import { BACK_SERVER_URL } from '../../config/config'

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState();

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        validateName(newName);
    };

    const validateName = (value) => {
        const errorsCopy = { ...errors };
        if (!value.trim()) {
            errorsCopy.name = 'User Name is required';
        } else {
            if (value.length < 3) {
                errorsCopy.name = 'Name must be at least 3 characters';
            } else if (value.length > 20) {
                errorsCopy.name = 'Name must be less than 20 characters';
            } else {
                delete errorsCopy.name;
            }
        }
        setErrors(errorsCopy);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const validateEmail = (value) => {
        const errorsCopy = { ...errors };
        if (!value.trim()) {
            errorsCopy.email = 'Email is required';
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                errorsCopy.email = 'Invalid email address';
            } else {
                delete errorsCopy.email;
            }
        }
        setErrors(errorsCopy);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (value) => {
        const errorsCopy = { ...errors };
        if (!value.trim()) {
            errorsCopy.password = 'Password is required';
        } else {
            if (value.trim().length !== value.length) {
                errorsCopy.password = 'Password should not contain whitespace';
            } else if (value.length < 8) {
                errorsCopy.password = 'Password is too short';
            } else {
                delete errorsCopy.password;
            }
        }
        setErrors(errorsCopy);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        validateConfirmPassword(newConfirmPassword);
    };

    const validateConfirmPassword = (value) => {
        const errorsCopy = { ...errors };
        if (!value.trim()) {
            errorsCopy.confirmPassword = 'Password is required';
        } else if (password !== value) {
            errorsCopy.confirmPassword = 'Password does not match';
        } else {
            delete errorsCopy.confirmPassword;
        }
        setErrors(errorsCopy);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);

        if (Object.keys(errors).length === 0) {
            axios
                .post(`${BACK_SERVER_URL}/user/signUp`, { name: name, email: email, password: password })
                .then((result) => {
                    if (result.status === 201) {
                        setMessage("Username or email already exists. Please use a different one.");
                        // console.log("Username or email already exists. Please use a different one.");
                    } else if (result.status === 200) {
                        setMessage("Account created successfully!!");
                        // console.log("Account created successfully!!");
                    }
                })
                .catch(err => { console.log(err); })
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className='mt-1 d-flex justify-content-center '>
            <Card className="p-3 w-25">
                <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 75, height: 75, borderRadius: '50%', padding: "10px" }} />
                {message && (
                    <Alert className='text-center p-1' variant="info">
                        {message}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formGroupName" placeholder="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Name"
                            value={name} onChange={handleNameChange} isInvalid={!!errors.name} />
                        {errors.name &&
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupEmail" placeholder="Email address">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email"
                            value={email} onChange={handleEmailChange} isInvalid={!!errors.email} />
                        {errors.email &&
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control required type="password" placeholder="New Password"
                            value={password} onChange={handlePasswordChange} isInvalid={!!errors.password} />
                        {errors.password &&
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm Password" value={confirmPassword}
                            onChange={handleConfirmPasswordChange} isInvalid={!!errors.confirmPassword} />
                        {errors.confirmPassword &&
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                    <Form.Text className="d-flex justify-content-center mt-2">
                        <span> Already have an account? </span> &nbsp;
                        <a className="fw-bold text-dark text-decoration-none" href="/user/signIn">Sign In</a>
                    </Form.Text>
                </Form>
            </Card>
        </div >
    )
}

export default SignUp;