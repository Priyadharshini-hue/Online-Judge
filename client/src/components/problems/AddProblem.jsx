import React from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

const AddProblem = () => {
    return (
        <div className='mt-2 d-flex flex-wrap justify-content-center '>
            <Card className="p-3 w-100">
                <Form >
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Problem Title</InputGroup.Text>
                        <Form.Control type="text" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Problem Statement</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={4} required />
                    </InputGroup >
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Problem Difficulty</InputGroup.Text>
                        <Form.Select required>
                            <option> </option>
                            <option value="1">easy</option>
                            <option value="2">medium</option>
                            <option value="3">hard</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample Input</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={3} required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sample output</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" rows={2} required />
                    </InputGroup>
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                </Form>
            </Card>
        </div >
    )
}

export default AddProblem
