import React, { useState } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const AddProblem = () => {

    const [problemTitle, setProblemTitle] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [sampleOutput, setSampleOutput] = useState('');
    const [errors, setErrors] = useState({});

    const handleProblemTitle = (e) => {
        const newProblemTitle = e.target.value;
        setProblemTitle(newProblemTitle);
        validateProblemTitle(newProblemTitle);
    }

    const validateProblemTitle = (value) => {
        const errorsCopy = { ...errors };
        if (value.length > 120) {
            errorsCopy.problemTitle = "You have reached your maximum limit of characters allowed";
        } else {
            delete errorsCopy.problemTitle;
        }
        setErrors(errorsCopy);
    }

    const handleProblemStatement = (e) => {
        const newProblemStatement = e.target.value;
        setProblemStatement(newProblemStatement);
        validateProblemStatement(newProblemStatement);
    }

    const validateProblemStatement = (value) => {
        const errorsCopy = { ...errors };
        if (value.length > 1000) {
            errorsCopy.problemStatement = "You have reached your maximum limit of characters allowed";
        } else {
            delete errorsCopy.problemStatement;
        }
        setErrors(errorsCopy);
    }

    const handleProblemDifficulty = (e) => {
        const newProblemDifficulty = e.target.value;
        setProblemDifficulty(newProblemDifficulty);
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
        console.log(e);

        if (Object.keys(errors).length === 0) {
            try {
                const result = await axios.post('/addProblem', {
                    problemTitle, problemStatement, problemDifficulty, sampleInput, sampleOutput
                })
                console.log(result.data);

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
                        <Form.Control type="text" required value={problemTitle} isInvalid={!!errors.problemTitle}
                            onChange={handleProblemTitle} />
                        {errors.problemTitle &&
                            <Form.Control.Feedback type="invalid">
                                {errors.problemTitle}
                            </Form.Control.Feedback>
                        }
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Problem Statement</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={4} required
                            value={problemStatement} isInvalid={!!errors.problemStatement}
                            onChange={handleProblemStatement}
                        />
                        {errors.problemStatement &&
                            <Form.Control.Feedback type='invalid'>
                                {errors.problemStatement}
                            </Form.Control.Feedback>
                        }
                    </InputGroup >
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Problem Difficulty</InputGroup.Text>
                        <Form.Select required value={problemDifficulty} onChange={handleProblemDifficulty}>
                            <option> </option>
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample Input</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={3} required
                            value={sampleInput} isInvalid={!!errors.sampleInput}
                            onChange={handleSampleInput} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample output</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={2} required
                            value={sampleOutput} isInvalid={!!errors.sampleOutput}
                            onChange={handleSampleOutput} />
                    </InputGroup>
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                </Form>
            </Card>
        </div >
    )
}

export default AddProblem
