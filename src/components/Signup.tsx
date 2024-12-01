// src/Signup.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Signup.css'; // Optional: Import custom CSS for additional styling

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Handle signup logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log('Username:', username);
        console.log('Password:', password);
        // Further signup logic can be added here
    };

    return (
        <Container className="signup-container">
            <h2 className="text-center">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
};

export default Signup;