import React, { useState } from 'react';
import { Card, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BACK_SERVER_URL } from '../../config/config';
import { useAuth } from "../../context/AuthContext";

const AddProblem = () => {

    const [problemState, setProblemState] = useState({
        title: '',
        statement: '',
        difficulty: '',
        testCases: [],
        errors: {},
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProblemState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "title" || name === "statement") {
            validateField(name, value);
        }
    };

    const validateField = (fieldName, value) => {
        const maxCharacters = fieldName === "title" ? 120 : 1000;
        const errorMessage = generateErrorMessage(fieldName, value, maxCharacters);
        setProblemState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [fieldName]: errorMessage,
            },
        }));
    };

    const generateErrorMessage = (fieldName, value, maxCharacters) => {
        if (value.length > maxCharacters) {
            return `You have reached your maximum limit of ${maxCharacters} characters allowed for ${fieldName}`;
        }
        return '';
    };

    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const { token } = useAuth();

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);

        if (Object.values(problemState.errors).every((error) => error === '')) {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const result = await axios.post(`${BACK_SERVER_URL}/problems/add`, {
                    title: problemState.title,
                    statement: problemState.statement,
                    difficulty: problemState.difficulty,
                    testCases: problemState.testCases
                }, { headers });
                if (result.status === 201) {
                    setMessage("Problem exists already!!");
                    // console.log("Problem exists already!!");
                } else {
                    setMessage("Problem created successfully");
                    // console.log("Problem created successfully");
                }
                setShow(true);
                setProblemState({
                    title: '',
                    statement: '',
                    difficulty: '',
                    testCases: [],
                    errors: {}
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='mt-2 d-flex flex-wrap justify-content-center '>
            <Card className="p-3 w-100">
                <Form onSubmit={handleSubmit} >
                    <InputGroup className='mb-3' >
                        <InputGroup.Text>Problem Title</InputGroup.Text>
                        <Form.Control type='text' required name='title' value={problemState.title}
                            isInvalid={!!problemState.errors && !!problemState.errors.title}
                            onChange={handleInputChange} />
                        {problemState.errors && problemState.errors.title &&
                            <Form.Control.Feedback type='invalid'>
                                {problemState.errors.title}
                            </Form.Control.Feedback>
                        }
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Problem Statement</InputGroup.Text>
                        <Form.Control as='textarea' name='statement' rows={8} required
                            onChange={handleInputChange} value={problemState.statement}
                            isInvalid={!!problemState.errors && !!problemState.errors.statement}
                        />
                        {problemState.errors && problemState.errors.statement &&
                            <Form.Control.Feedback type='invalid'>
                                {problemState.errors.statement}
                            </Form.Control.Feedback>
                        }
                    </InputGroup >
                    <InputGroup className='mb-3' >
                        <InputGroup.Text>Problem Difficulty</InputGroup.Text>
                        <Form.Select required name='difficulty' value={problemState.difficulty}
                            onChange={handleInputChange}>
                            <option> </option>
                            <option value='easy'>easy</option>
                            <option value='medium'>medium</option>
                            <option value='hard'>hard</option>
                        </Form.Select>
                    </InputGroup>
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                </Form>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton />
                    <Modal.Body className='d-flex '>
                        <p>{message}</p>
                    </Modal.Body>
                </Modal>
            </Card>
        </div >
    )
}

export default AddProblem;
