import React, { useState } from 'react';
import { Card, Form, Button, InputGroup, Alert } from 'react-bootstrap'; 
import { useProblemState } from './ProblemState'; 
import { createProblem } from '../../services/api';
import { useAuth } from "../../context/AuthContext";

const AddProblem = () => {

    const { problemState, setProblemState, handleInputChange } = useProblemState();
    const [message, setMessage] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);

        if (Object.values(problemState.errors).every((error) => error === '')) {
            try {

                const result = await createProblem(
                    {
                        title: problemState.title,
                        statement: problemState.statement,
                        difficulty: problemState.difficulty,
                        testCases: problemState.testCases
                    }, token);

                setProblemState({
                    title: '',
                    statement: '',
                    difficulty: '',
                    testCases: [],
                    errors: {}
                })
                if (result.status === 201) {
                    setMessage("Problem exists already!!");
                    // console.log("Problem exists already!!");
                } else {
                    setMessage("Problem created successfully!!");
                    // console.log("Problem created successfully");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleInputFocus = () => {
        setMessage('');
    };

    return (
        <div className='mt-2 d-flex flex-wrap justify-content-center '>
            <Card className="p-3 w-100">
                {message && (
                    <Alert className='text-center' variant="info">
                        {message}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit} >
                    <InputGroup className='mb-3' >
                        <InputGroup.Text>Problem Title</InputGroup.Text>
                        <Form.Control type='text' required name='title' value={problemState.title}
                            isInvalid={!!problemState.errors && !!problemState.errors.title}
                            onChange={handleInputChange} onFocus={handleInputFocus} />
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
            </Card>
        </div >
    )
}

export default AddProblem;
