import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import {useAuth} from "../context/authContext"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [regNo,setRegNo] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState(null);
    const {login} = useAuth();
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        const response = await axios.post("http://localhost:5000/api/auth/login",{regNo,password});
        if(response.data.success){
          login(response.data.user)
          localStorage.setItem("token",response.data.token)
          if(response.data.user.role === "admin"){
            navigate("/admin-dashboard")
          }
          else if(response.data.user.role === "HOD"){
            navigate("/hod-dashboard")
          }
          else{
            navigate("/student-dashboard")
          }
        };
    }catch(error){
       if(error.response && !error.response.data.success){
        setError(error.response.data.error)
       }else{
        setError("Server Error")
       }
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              
              {/* Error Alert */}
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
                {/* Email/Username Input */}
                <Form.Group controlId="regNo" className="mb-3">
                  <Form.Label>RegNo</Form.Label>
                  <Form.Control
                    onChange={(e) => setRegNo(e.target.value)}
                    type="text"
                    placeholder="Enter your RegNo"
                    required
                  />
                </Form.Group>

                {/* Password Input */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                   onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter Password"
                    required
                  />
                </Form.Group>

                {/* Remember Me Checkbox */}
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Remember Me"
                  />
                </Form.Group>

                {/* Submit Button */}
                <div className="d-grid">
                  <Button type="submit" variant="primary" className="btn-block">
                    Login
                  </Button>
                </div>
              </Form>

              {/* Forget Password Link */}
              <div className="text-center mt-3">
                <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
