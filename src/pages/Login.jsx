// [AI Generated Code - Prompt: "Thiết kế trang Login dùng Card, InputGroup bằng Tiếng Việt, xử lý đăng nhập qua AuthContext và hiển thị loading spinner khi submit"]

import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email.trim() || !formData.password) {
            setError('Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }

        setLoading(true);
        try {
            const user = await login(formData.email, formData.password);
            
            // Điều hướng dựa trên vai trò
            switch (user.role) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'instructor':
                    navigate('/instructor/dashboard');
                    break;
                case 'student':
                default:
                    navigate('/student/dashboard');
                    break;
            }
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            
            <Container className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
                <Card style={{ width: '420px' }} className="p-4 premium-card shadow-sm">
                    <Card.Body>
                        <div className="text-center mb-4">
                            <i className="bi bi-book-half text-primary display-4 mb-2"></i>
                            <h3 className="fw-bold text-navy">Đăng Nhập</h3>
                            <p className="text-muted small">Đăng nhập để quản lý học tập và khóa học của bạn</p>
                        </div>

                        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            {/* Trường nhập Email */}
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-semibold text-navy">Địa chỉ Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <i className="bi bi-envelope"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* Trường nhập Mật khẩu */}
                            <Form.Group className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Form.Label className="small fw-semibold text-navy mb-1">Mật khẩu</Form.Label>
                                    <Link to="#" className="small text-decoration-none" style={{ color: 'var(--secondary-blue)' }}>
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <i className="bi bi-lock"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Button type="submit" variant="primary" className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2 py-2" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                        <span>Đang đăng nhập...</span>
                                    </>
                                ) : (
                                    <span>Đăng nhập</span>
                                )}
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <span className="small text-muted">Chưa có tài khoản? </span>
                            <Link to="/register" className="small text-decoration-none fw-semibold" style={{ color: 'var(--primary-blue)' }}>
                                Đăng ký ngay
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            <Footer />
        </div>
    );
}

export default Login;