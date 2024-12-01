// src/Login.js
import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Login.css'; // Optional: Import custom CSS for additional styling
import globalStore from "../globals"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        let data = {
            username:username,
            password:password
        }
      let endPoint:any = 'http://localhost:9876/bankservice/authenticate'
     
    try {
        const response = await fetch(endPoint ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if(response.status ==200){
            let {token} = await response.json();
            globalStore.set("token",token)
            console.log("ok",token)
            navigate("/home")
        }
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error; // Rethrow the error for further handling
    }
        
    };

    return (
        <Container className="login-container">
            <h2 className="text-center">Login</h2>
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

                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;