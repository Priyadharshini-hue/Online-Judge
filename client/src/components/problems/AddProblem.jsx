import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import ProblemForm from './ProblemForm';
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
                    console.log(result.data);
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
                    <ProblemForm problemState={problemState} handleInputChange={handleInputChange}
                        handleInputFocus={handleInputFocus} />
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                </Form>
            </Card>
        </div >
    )
}

export default AddProblem;
