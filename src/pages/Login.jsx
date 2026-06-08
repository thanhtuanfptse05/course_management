// [AI Generated Code - Prompt: "Thiết kế giao diện Đăng nhập màu Xanh biển - Trắng và xác thực real-time bằng tiếng Việt"]
import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function Login() {
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
        
        // Cập nhật lỗi trực quan thời gian thực nếu trường đã được chạm (touched)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError('');

        // Đánh dấu đã chạm tất cả các trường để hiển thị lỗi nếu có
        setTouched({ email: true, password: true });

        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setLoading(true);

        // Giả lập thời gian gọi API 1.5 giây đến JSON-Server
        setTimeout(() => {
            setLoading(false);

            // Mock login và phân quyền dựa trên email nhập vào
            const email = formData.email.toLowerCase();
            let role = 'student';
            let name = 'Học viên';

            if (email.includes('admin')) {
                role = 'admin';
                name = 'Quản trị viên';
            } else if (email.includes('instructor')) {
                role = 'instructor';
                name = 'Giảng viên';
            }

            // Lưu thông tin người dùng giả lập vào LocalStorage
            const mockUser = {
                id: Date.now(),
                name: name,
                email: formData.email,
                role: role
            };
            localStorage.setItem('user', JSON.stringify(mockUser));

            // Chuyển hướng theo role
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'instructor') {
                navigate('/instructor/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        }, 1500);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
                <Card className="premium-card p-4 shadow-sm" style={{ width: '100%', maxWidth: '440px' }}>
                    <Card.Body className="p-2">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-1" style={{ color: 'var(--primary-blue)' }}>ĐĂNG NHẬP</h2>
                            <p className="text-muted small">Chào mừng bạn quay lại hệ thống quản lý khóa học</p>
                        </div>

                        {submitError && <Alert variant="danger">{submitError}</Alert>}

                        <Form onSubmit={handleSubmit} noValidate>
                            {/* Email Input */}
                            <Form.Group className="mb-3" controlId="loginEmail">
                                <Form.Label className="fw-medium text-secondary small">Địa chỉ Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="nhanvien@fpt.edu.vn"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.email && !!errors.email}
                                    disabled={loading}
                                    className="py-2"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Password Input */}
                            <Form.Group className="mb-4" controlId="loginPassword">
                                <Form.Label className="fw-medium text-secondary small">Mật khẩu</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && !!errors.password}
                                        disabled={loading}
                                        className="py-2"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                        style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                                    >
                                        {showPassword ? 'Ẩn' : 'Hiện'}
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
                                className="w-100 py-2.5 fw-semibold mb-3 btn-primary text-white d-flex align-items-center justify-content-center"
                                disabled={loading}
                                style={{ height: '45px' }}
                            >
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    'Đăng nhập'
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