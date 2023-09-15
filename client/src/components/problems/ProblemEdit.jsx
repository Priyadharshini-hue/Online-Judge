import React, { useState, useEffect } from 'react';
import { Card, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BACK_SERVER_URL } from '../../config/config';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProblemEdit = () => {
    const { problemId } = useParams(); 
    const [editedTitle, setEditedTitle] = useState("");
    const [editedStatement, setEditedStatement] = useState("");
    const [editedDifficulty, setEditedDifficulty] = useState("");
    const [editedSampleInput, setEditedSampleInput] = useState("");
    const [editedSampleOutput, setEditedSampleOutput] = useState("");
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblemDetails = async () => {
            try {
                const token = sessionStorage.getItem('jwtToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                console.log(problemId);
                const response = await axios.get(`${BACK_SERVER_URL}/problems/edit/${problemId}`,
                    { headers });
 
                setEditedTitle(response.data.title);
                setEditedStatement(response.data.statement);
                setEditedDifficulty(response.data.difficulty);
                setEditedSampleInput(response.data.sampleInput);
                setEditedSampleOutput(response.data.sampleOutput);

                console.log(response.data);
            } catch (error) {
                console.error("Error fetching problem details: ", error);
            }
        };

        fetchProblemDetails();
    }, [problemId]);

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
        validateTitle(e.target.value);
    };

    const validateTitle = (value) => {
        const errorsCopy = { ...errors };
        if (value.length > 120) {
            errorsCopy.title = "You have reached your maximum limit of characters allowed";
        } else {
            delete errorsCopy.title;
        }
        setErrors(errorsCopy);
    }

    const handleStatementChange = (e) => {
        setEditedStatement(e.target.value);
        validateStatement(e.target.value);
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

    const handleDifficultyChange = (e) => {
        setEditedDifficulty(e.target.value);
    }

    const handleSampleInputChange = (e) => {
        setEditedSampleInput(e.target.value);
        validateSampleInput(e.target.value);
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

    const handleSampleOutputChange = (e) => {
        setEditedSampleOutput(e.target.value);
        validateSampleOutput(e.target.value);
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
        console.log(e);

        if (Object.keys(errors).length === 0) {
            try {
                const token = sessionStorage.getItem('jwtToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const result = await axios.put(`${BACK_SERVER_URL}/problems/edit/${problemId}`, {
                    title: editedTitle,
                    statement: editedStatement,
                    difficulty: editedDifficulty,
                    sampleInput: editedSampleInput,
                    sampleOutput: editedSampleOutput
                }, { headers });
                if (result.status === 200) {
                    console.log("Problem edited!!");
                    setMessage("Problem edited successfully")
                    setShow(true); 

                    setTimeout(() => {
                        navigate("/problems/list");
                    }, 3000);
                }
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
                        <Form.Control type="text" required name="title" value={editedTitle}
                            onChange={handleTitleChange} isInvalid={!!errors.title} />
                        {errors.title &&
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        }
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Problem Statement</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={5} required
                            value={editedStatement} isInvalid={!!errors.statement}
                            onChange={handleStatementChange}
                        />
                        {errors.statement &&
                            <Form.Control.Feedback type='invalid'>
                                {errors.statement}
                            </Form.Control.Feedback>
                        }
                    </InputGroup >
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Problem Difficulty</InputGroup.Text>
                        <Form.Select required value={editedDifficulty} onChange={handleDifficultyChange}>
                            <option> </option>
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample Input</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={4} required
                            value={editedSampleInput} onChange={handleSampleInputChange} isInvalid={!!errors.sampleInput} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample output</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={3} required
                            value={editedSampleOutput} onChange={handleSampleOutputChange} isInvalid={!!errors.sampleOutput} />
                    </InputGroup>
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                </Form>
                <Modal backdrop="static"
                    keyboard={false} show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton />
                    <Modal.Body className='d-flex '>
                        <p>{message}</p>
                    </Modal.Body>
                </Modal>
            </Card>
        </div >
    )
}

export default ProblemEdit;
