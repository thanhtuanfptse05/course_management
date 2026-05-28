import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation đơn giản
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        // TODO tuần sau: gọi API JSON-Server thật
        // Tạm thời mock login theo role
        if (formData.email.includes('admin')) {
            navigate('/admin/dashboard');
        } else if (formData.email.includes('instructor')) {
            navigate('/instructor/dashboard');
        } else {
            navigate('/student/dashboard');
        }
    };

    return (
        <>
            <Header />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Card style={{ width: '420px' }} className="p-4 shadow">
                    <h4 className="text-center mb-4">Login</h4>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="w-100 mb-3">
                            Login
                        </Button>
                    </Form>

                    <div className="d-flex justify-content-between">
                        <Link to="/register">Register new account</Link>
                        <Link to="#">Forgot password</Link>
                    </div>
                </Card>
            </Container>
        </>
    );
}

export default Login;