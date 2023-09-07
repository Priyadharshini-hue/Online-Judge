import React from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import image from '../../images/reset.svg';


const ResetPassword = () => {
    return (
        <div className='mt-4 d-flex flex-wrap justify-content-center '>
            <Card className="p-3 w-25">
                <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 75, height: 75, borderRadius: '50%', padding: "10px" }} />
                <Form >
                    <Form.Group className="mb-2" controlId="formGroupEmail" placeholder="Email address">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button className="w-100" variant="outline-dark" type='submit'>Submit</Button>
                    <Form.Text className="d-flex justify-content-center mt-2">
                        Please check your email, for password reset link to reset password.
                    </Form.Text>
                </Form>
            </Card>
        </div >
    )
}

export default ResetPassword
