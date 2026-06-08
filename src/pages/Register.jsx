// [AI Generated Code - Prompt: "Thiết kế trang Register dùng Card, InputGroup bằng Tiếng Việt, đo độ mạnh mật khẩu, xử lý đăng ký qua AuthContext và tự động chuyển hướng"]
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

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Đánh giá độ mạnh của mật khẩu
    const getPasswordStrength = (password) => {
        if (!password) return { strength: '', label: '', color: '' };
        
        let score = 0;
        
        // Kiểm tra chiều dài
        if (password.length >= 6) score += 1;
        if (password.length >= 8) score += 1;
        
        // Kiểm tra chữ số
        if (/\d/.test(password)) score += 1;
        
        // Kiểm tra chữ thường & chữ hoa
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
        
        // Kiểm tra ký tự đặc biệt
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

        if (password.length < 6) {
            return { strength: 'weak', label: 'Rất yếu (Mật khẩu phải từ 6 ký tự)', color: '#ef4444' };
        }

        if (score <= 2) {
            return { strength: 'weak', label: 'Yếu', color: '#ef4444' };
        } else if (score <= 4) {
            return { strength: 'medium', label: 'Trung bình', color: '#f59e0b' };
        } else {
            return { strength: 'strong', label: 'Mạnh', color: '#10b981' };
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Họ và tên không được để trống.';
                if (value.trim().length < 3) return 'Họ và tên phải có ít nhất 3 ký tự.';
                return '';
            case 'email':
                if (!value.trim()) return 'Email không được để trống.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Định dạng email không hợp lệ (ví dụ: student@fpt.edu.vn).';
                return '';
            case 'password':
                if (!value) return 'Mật khẩu không được để trống.';
                if (value.length < 6) return 'Mật khẩu phải chứa ít nhất 6 ký tự.';
                return '';
            case 'confirmPassword':
                if (!value) return 'Vui lòng xác nhận lại mật khẩu.';
                if (value !== formData.password) return 'Mật khẩu xác nhận không khớp.';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }

        if (name === 'password' && touched.confirmPassword) {
            const confirmVal = formData.confirmPassword;
            setErrors(prev => ({ 
                ...prev, 
                confirmPassword: confirmVal !== value ? 'Mật khẩu xác nhận không khớp.' : '' 
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setSuccess(false);

        setTouched({
            fullName: true,
            email: true,
            password: true,
            confirmPassword: true,
        });

        const newErrors = {
            fullName: validateField('fullName', formData.fullName),
            email: validateField('email', formData.email),
            password: validateField('password', formData.password),
            confirmPassword: validateField('confirmPassword', formData.confirmPassword),
        };

        const hasErrors = Object.values(newErrors).some(err => err !== '');

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            await register(
                formData.fullName,
                formData.email,
                formData.password,
                formData.role
            );
            setSuccess(true);
            
            // Tự động chuyển hướng về trang Đăng nhập sau 2 giây
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setSubmitError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const strength = getPasswordStrength(formData.password);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="d-flex align-items-center justify-content-center flex-grow-1 py-5">
                <Card className="premium-card p-4 shadow-sm" style={{ width: '100%', maxWidth: '480px' }}>
                    <Card.Body className="p-2">
                        <div className="text-center mb-4">
                            <i className="bi bi-person-plus text-primary display-4 mb-2"></i>
                            <h2 className="fw-bold text-navy mb-1" style={{ color: 'var(--text-navy)' }}>ĐĂNG KÝ</h2>
                            <p className="text-muted small">Tạo tài khoản mới để bắt đầu học tập và quản lý</p>
                        </div>

                        {success && (
                            <Alert variant="success" className="py-2.5 small">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                Đăng ký thành công! Đang tự động chuyển hướng sang trang đăng nhập...
                            </Alert>
                        )}

                        {submitError && (
                            <Alert variant="danger" className="py-2.5 small">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {submitError}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit} noValidate>
                            {/* Họ và tên */}
                            <Form.Group className="mb-3" controlId="registerName">
                                <Form.Label className="small fw-semibold text-navy">Họ và tên</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-person"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.fullName && !!errors.fullName}
                                        disabled={loading || success}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Email */}
                            <Form.Group className="mb-3" controlId="registerEmail">
                                <Form.Label className="small fw-semibold text-navy">Địa chỉ Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-envelope"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="sinhvien@fpt.edu.vn"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && !!errors.email}
                                        disabled={loading || success}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Vai trò */}
                            <Form.Group className="mb-3" controlId="registerRole">
                                <Form.Label className="small fw-semibold text-navy">Vai trò đăng ký</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-person-workspace"></i>
                                    </InputGroup.Text>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        disabled={loading || success}
                                    >
                                        <option value="student">Học viên (Student)</option>
                                        <option value="instructor">Giảng viên (Instructor)</option>
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>

                            {/* Mật khẩu */}
                            <Form.Group className="mb-3" controlId="registerPassword">
                                <Form.Label className="small fw-semibold text-navy">Mật khẩu</Form.Label>
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
                                        disabled={loading || success}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading || success}
                                        style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                                    >
                                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </InputGroup>

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="strength-meter">
                                            <div 
                                                className={`strength-bar ${
                                                    strength.strength === 'weak' ? 'strength-weak' :
                                                    strength.strength === 'medium' ? 'strength-medium' :
                                                    strength.strength === 'strong' ? 'strength-strong' : ''
                                                }`}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-1">
                                            <span className="small text-muted">Độ mạnh mật khẩu:</span>
                                            <span className="small fw-semibold" style={{ color: strength.color }}>
                                                {strength.label}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </Form.Group>

                            {/* Xác nhận mật khẩu */}
                            <Form.Group className="mb-4" controlId="registerConfirmPassword">
                                <Form.Label className="small fw-semibold text-navy">Xác nhận mật khẩu</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className="bi bi-shield-lock"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                        disabled={loading || success}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading || success}
                                        style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                                    >
                                        {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100 py-2.5 fw-semibold mb-3 btn-primary text-white d-flex align-items-center justify-content-center gap-2"
                                disabled={loading || success}
                                style={{ height: '45px' }}
                            >
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

                        {/* Navigation Links */}
                        <div className="text-center mt-3">
                            <span className="small text-muted">Đã có tài khoản? </span>
                            <Link to="/login" className="small text-decoration-none fw-semibold text-primary">
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
