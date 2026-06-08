// [AI Generated Code - Prompt: "Thiết kế trang Login dùng Card, InputGroup bằng Tiếng Việt, xử lý đăng nhập qua AuthContext, hiển thị loading spinner khi submit, kết hợp validation thời gian thực"]
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
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validateEmail = (email) => {
        if (!email.trim()) {
            return 'Email không được để trống.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Định dạng email không hợp lệ (ví dụ: example@domain.com).';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (!password) {
            return 'Mật khẩu không được để trống.';
        }
        if (password.length < 6) {
            return 'Mật khẩu phải chứa ít nhất 6 ký tự.';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (touched[name]) {
            let errorMsg = '';
            if (name === 'email') errorMsg = validateEmail(value);
            if (name === 'password') errorMsg = validatePassword(value);
            setErrors(prev => ({ ...prev, [name]: errorMsg }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        
        let errorMsg = '';
        if (name === 'email') errorMsg = validateEmail(value);
        if (name === 'password') errorMsg = validatePassword(value);
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        setTouched({ email: true, password: true });

        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
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
            setSubmitError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
                <Card className="premium-card p-4 shadow-sm" style={{ width: '100%', maxWidth: '440px' }}>
                    <Card.Body className="p-2">
                        <div className="text-center mb-4">
                            <i className="bi bi-book-half text-primary display-4 mb-2"></i>
                            <h2 className="fw-bold text-navy mb-1" style={{ color: 'var(--text-navy)' }}>ĐĂNG NHẬP</h2>
                            <p className="text-muted small">Chào mừng bạn quay lại hệ thống quản lý khóa học</p>
                        </div>

                        {submitError && <Alert variant="danger" className="py-2 small">{submitError}</Alert>}

                        <Form onSubmit={handleSubmit} noValidate>
                            {/* Email Input */}
                            <Form.Group className="mb-3" controlId="loginEmail">
                                <Form.Label className="small fw-semibold text-navy">Địa chỉ Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-envelope"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && !!errors.email}
                                        disabled={loading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Password Input */}
                            <Form.Group className="mb-4" controlId="loginPassword">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Form.Label className="small fw-semibold text-navy mb-1">Mật khẩu</Form.Label>
                                </div>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-lock"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && !!errors.password}
                                        disabled={loading}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                        style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                                    >
                                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100 py-2 fw-semibold mb-3 btn-primary text-white d-flex align-items-center justify-content-center gap-2"
                                disabled={loading}
                                style={{ height: '45px' }}
                            >
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

                        {/* Navigation Links */}
                        <div className="d-flex justify-content-between mt-3 small">
                            <span className="text-muted">Chưa có tài khoản? <Link to="/register" className="text-decoration-none fw-medium text-primary">Đăng ký</Link></span>
                            <Link to="#" className="text-decoration-none fw-medium text-secondary">Quên mật khẩu?</Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    );
}

export default Login;