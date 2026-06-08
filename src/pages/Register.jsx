// [AI Generated Code - Prompt: "Thiết kế trang Register dùng Card, InputGroup bằng Tiếng Việt, xử lý đăng ký qua AuthContext và tự động chuyển hướng"]

import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student', // Vai trò mặc định
    });
    
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const validate = () => {
        const validationErrors = {};

        if (!formData.fullName.trim()) {
            validationErrors.fullName = 'Họ và tên không được để trống.';
        }

        if (!formData.email.trim()) {
            validationErrors.email = 'Email không được để trống.';
        } else if (!validateEmail(formData.email)) {
            validationErrors.email = 'Vui lòng nhập địa chỉ email hợp lệ.';
        }

        if (!formData.password) {
            validationErrors.password = 'Mật khẩu không được để trống.';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Mật khẩu phải dài ít nhất 6 ký tự.';
        }

        if (!formData.confirmPassword) {
            validationErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
        } else if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = 'Mật khẩu nhập lại không khớp.';
        }

        if (!formData.role) {
            validationErrors.role = 'Vui lòng chọn vai trò.';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Xóa lỗi xác thực khi người dùng thay đổi dữ liệu
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError('');
        setSuccess(false);

        if (validate()) {
            setLoading(true);
            try {
                await register(
                    formData.fullName, 
                    formData.email, 
                    formData.password, 
                    formData.role
                );
                setSuccess(true);
                // Chuyển hướng sang trang đăng nhập sau 2 giây
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (err) {
                setSubmitError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            
            <Container className="d-flex align-items-center justify-content-center flex-grow-1 py-5">
                <Card style={{ width: '460px' }} className="p-4 premium-card shadow-sm">
                    <Card.Body>
                        <div className="text-center mb-4">
                            <i className="bi bi-person-plus text-primary display-4 mb-2"></i>
                            <h3 className="fw-bold text-navy">Đăng Ký Tài Khoản</h3>
                            <p className="text-muted small">Đăng ký thành viên để khám phá các khóa học chất lượng cao</p>
                        </div>

                        {success && (
                            <Alert variant="success" className="py-2 small">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                Đăng ký thành công! Đang tự động chuyển hướng sang trang đăng nhập...
                            </Alert>
                        )}

                        {submitError && (
                            <Alert variant="danger" className="py-2 small">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {submitError}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit} noValidate>
                            {/* Trường nhập Họ và tên */}
                            <Form.Group className="mb-3" controlId="fullName">
                                <Form.Label className="small fw-semibold text-navy">Họ và Tên</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-person"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Nguyễn Văn A"
                                        isInvalid={!!errors.fullName}
                                        disabled={loading || success}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Trường nhập Email */}
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="small fw-semibold text-navy">Địa chỉ Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-envelope"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="email@example.com"
                                        isInvalid={!!errors.email}
                                        disabled={loading || success}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Vai trò */}
                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label className="small fw-semibold text-navy">Vai trò đăng ký</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-person-workspace"></i>
                                    </InputGroup.Text>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        isInvalid={!!errors.role}
                                        disabled={loading || success}
                                    >
                                        <option value="student">Học viên (Student)</option>
                                        <option value="instructor">Giảng viên (Instructor)</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.role}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Trường nhập Mật khẩu */}
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="small fw-semibold text-navy">Mật khẩu</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-lock"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Tối thiểu 6 ký tự"
                                        isInvalid={!!errors.password}
                                        disabled={loading || success}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Trường nhập lại Mật khẩu */}
                            <Form.Group className="mb-4" controlId="confirmPassword">
                                <Form.Label className="small fw-semibold text-navy">Xác nhận mật khẩu</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-shield-lock"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Nhập lại mật khẩu"
                                        isInvalid={!!errors.confirmPassword}
                                        disabled={loading || success}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Button type="submit" variant="primary" className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2 py-2" disabled={loading || success}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                        <span>Đang đăng ký...</span>
                                    </>
                                ) : (
                                    <span>Đăng ký</span>
                                )}
                            </Button>
                        </Form>

                        <div className="text-center">
                            <span className="small text-muted">Đã có tài khoản? </span>
                            <Link to="/login" className="small text-decoration-none fw-semibold" style={{ color: 'var(--primary-blue)' }}>
                                Đăng nhập
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            <Footer />
        </div>
    );
}

export default Register;
