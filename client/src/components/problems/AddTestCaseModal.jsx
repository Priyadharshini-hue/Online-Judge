import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const AddTestCaseModal = ({ show, handleClose, handleSubmit, testCaseData, handleInputChange, testCaseError }) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add test case</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="input">
                            <Form.Label>Input</Form.Label>
                            <Form.Control as="textarea" name="input" value={testCaseData.input} rows={5}
                                onChange={handleInputChange} isInvalid={!!testCaseError.input} />
                            <Form.Control.Feedback type="invalid">
                                {testCaseError.input}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="output" className='mt-2'>
                            <Form.Label>Output</Form.Label>
                            <Form.Control as="textarea" name="output" value={testCaseData.output} rows={5}
                                onChange={handleInputChange} isInvalid={!!testCaseError.output} />
                            <Form.Control.Feedback type="invalid">
                                {testCaseError.output}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-center w-100">
                            <Button type="submit" className="mt-2">Submit</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddTestCaseModal
