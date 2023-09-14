import React, { useState } from 'react';
import { Card, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BACK_SERVER_URL } from '../../config/config';

const AddProblem = () => {

    const [title, setTitle] = useState('');
    const [statement, setStatement] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [sampleOutput, setSampleOutput] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        validateTitle(newTitle);
    }

    const validateTitle = (value) => {
        const errorsCopy = { ...errors };
        if (value.length > 120) {
            errorsCopy.title = "You have reached your maximum limit of characters allowed";
        } else {
            delete errorsCopy.title;
        }
        setErrors(errorsCopy);
    }

    const handleStatement = (e) => {
        const newStatement = e.target.value;
        setStatement(newStatement);
        validateStatement(newStatement);
    }

    const validateStatement = (value) => {
        const errorsCopy = { ...errors };
        if (value.length > 1000) {
            errorsCopy.statement = "You have reached your maximum limit of characters allowed";
        } else {
            delete errorsCopy.statement;
        }
        setErrors(errorsCopy);
    }

    const handleDifficulty = (e) => {
        const newDifficulty = e.target.value;
        setDifficulty(newDifficulty);
    }

    const handleSampleInput = (e) => {
        const newSampleInput = e.target.value;
        setSampleInput(newSampleInput);
        validateSampleInput(newSampleInput);
    }

    const validateSampleInput = (value) => {
        const errorsCopy = { ...errors };
        if (value.length > 1000) {
            errorsCopy.sampleInput = "You have reached your maximum limit of characters allowed";
        } else {
            delete errorsCopy.sampleInput;
        }
        setErrors(errorsCopy);
    }

    const handleSampleOutput = (e) => {
        const newSampleOutput = e.target.value;
        setSampleOutput(newSampleOutput);
        validateSampleOutput(newSampleOutput);
    }

    const validateSampleOutput = (value) => {
        const errorsCopy = { ...errors };
        if (value.length > 1000) {
            errorsCopy.sampleOutput = "You have reached your maximum limit of characters allowed";
        } else {
            delete errorsCopy.sampleOutput;
        }
        setErrors(errorsCopy);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);

        if (Object.keys(errors).length === 0) {
            try {
                const token = sessionStorage.getItem('jwtToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const result = await axios.post(`${BACK_SERVER_URL}/problems/add`, {
                    title, statement, difficulty, sampleInput, sampleOutput
                }, { headers });
                if (result.status === 201) {
                    setMessage("Problem exists already!!");
                    // console.log("Problem exists already!!");
                } else {
                    setMessage("Problem created successfully");
                    // console.log("Problem created successfully");
                }
                setShow(true);
                setTitle('');
                setStatement('');
                setDifficulty('');
                setSampleInput('');
                setSampleOutput('');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='mt-2 d-flex flex-wrap justify-content-center '>
            <Card className="p-3 w-100">
                <Form onSubmit={handleSubmit} >
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Problem Title</InputGroup.Text>
                        <Form.Control type="text" required value={title} isInvalid={!!errors.title}
                            onChange={handleTitle} />
                        {errors.title &&
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        }
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Problem Statement</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={5} required
                            value={statement} isInvalid={!!errors.statement}
                            onChange={handleStatement}
                        />
                        {errors.statement &&
                            <Form.Control.Feedback type='invalid'>
                                {errors.statement}
                            </Form.Control.Feedback>
                        }
                    </InputGroup >
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Problem Difficulty</InputGroup.Text>
                        <Form.Select required value={difficulty} onChange={handleDifficulty}>
                            <option> </option>
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample Input</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={4} required
                            value={sampleInput} isInvalid={!!errors.sampleInput}
                            onChange={handleSampleInput} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample output</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={3} required
                            value={sampleOutput} isInvalid={!!errors.sampleOutput}
                            onChange={handleSampleOutput} />
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
