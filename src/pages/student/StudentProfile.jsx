// [AI Generated Code - Prompt: "Tạo trang StudentProfile.jsx layout 2 cột: cột trái thẻ thông tin tóm tắt (avatar tròn, tên, email, badge vai trò, số khóa học đã đăng ký), cột phải form chỉnh sửa thông tin cá nhân (Họ tên, Email readonly, Mật khẩu mới, Xác nhận mật khẩu). Áp dụng focus state CSS xanh theo ui-rule.md"]

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './StudentProfile.css';

// ─── Mock data học viên đang đăng nhập ──────────────────────────────────────
const mockUser = {
    id: 1,
    name: 'Nguyễn Văn An',
    email: 'an.student@gmail.com',
    role: 'student',
    enrolledCount: 3,
    joinDate: '01/09/2024',
};
// ────────────────────────────────────────────────────────────────────────────

function StudentProfile() {
    const [formData, setFormData] = useState({
        name: mockUser.name,
        newPassword: '',
        confirmPassword: '',
    });

    const [validated, setValidated] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSaveSuccess(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) return;
        // (Chưa gọi API — chỉ hiển thị thông báo thành công trên UI)
        setSaveSuccess(true);
        setFormData((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
        setValidated(false);
    };

    return (
        <>
            <Header />

            <Container className="py-4 py-lg-5">

                {/* Breadcrumb điều hướng */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb sp-breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/" className="sp-breadcrumb-link">Trang chủ</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Hồ sơ cá nhân
                        </li>
                    </ol>
                </nav>

                <Row className="gx-4 gx-lg-5">

                    {/* ── Cột Trái: Thẻ tóm tắt thông tin ── */}
                    <Col md={4} className="mb-4">
                        <Card className="border-0 shadow-sm sp-profile-card text-center p-4">
                            {/* Avatar tròn */}
                            <div className="sp-avatar-wrapper mx-auto mb-3">
                                <img
                                    src={`https://placehold.co/120x120/e0f2fe/0f52ba?text=${mockUser.name.charAt(0)}`}
                                    alt={`Avatar ${mockUser.name}`}
                                    className="sp-avatar"
                                />
                            </div>

                            {/* Tên học viên */}
                            <h2 className="sp-user-name">{mockUser.name}</h2>

                            {/* Email */}
                            <p className="sp-user-email mb-3">{mockUser.email}</p>

                            {/* Badge vai trò */}
                            <div className="mb-4">
                                <Badge className="sp-role-badge">🎓 Học viên</Badge>
                            </div>

                            {/* Divider */}
                            <hr className="sp-divider" />

                            {/* Số liệu nhanh */}
                            <div className="sp-stats">
                                <div className="sp-stat-item">
                                    <div className="sp-stat-value">{mockUser.enrolledCount}</div>
                                    <div className="sp-stat-label">Khóa học đã đăng ký</div>
                                </div>
                                <div className="sp-stat-item">
                                    <div className="sp-stat-value">{mockUser.joinDate}</div>
                                    <div className="sp-stat-label">Ngày tham gia</div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* ── Cột Phải: Form chỉnh sửa thông tin ── */}
                    <Col md={8}>
                        <Card className="border-0 shadow-sm sp-form-card">
                            <Card.Header className="sp-form-header">
                                <h3 className="sp-form-title mb-0">✏️ Thông tin cá nhân</h3>
                            </Card.Header>
                            <Card.Body className="p-4">

                                {/* Thông báo lưu thành công */}
                                {saveSuccess && (
                                    <div className="sp-success-alert mb-4" role="alert">
                                        ✅ Thông tin đã được lưu thành công!
                                    </div>
                                )}

                                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                    {/* Họ và tên */}
                                    <Form.Group className="mb-4" controlId="profileName">
                                        <Form.Label className="sp-form-label">Họ và tên</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Nhập họ và tên của bạn"
                                            required
                                            className="sp-form-control"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập họ và tên.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Email (chỉ đọc) */}
                                    <Form.Group className="mb-4" controlId="profileEmail">
                                        <Form.Label className="sp-form-label">
                                            Email
                                            <span className="sp-readonly-badge ms-2">Không thể thay đổi</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={mockUser.email}
                                            readOnly
                                            className="sp-form-control sp-readonly"
                                        />
                                    </Form.Group>

                                    {/* Divider phân vùng đổi mật khẩu */}
                                    <div className="sp-section-divider mb-4">
                                        <span className="sp-section-divider-text">Đổi mật khẩu (tuỳ chọn)</span>
                                    </div>

                                    {/* Mật khẩu mới */}
                                    <Form.Group className="mb-4" controlId="profileNewPassword">
                                        <Form.Label className="sp-form-label">Mật khẩu mới</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            placeholder="Để trống nếu không muốn đổi"
                                            minLength={formData.newPassword ? 6 : undefined}
                                            className="sp-form-control"
                                        />
                                        {formData.newPassword && formData.newPassword.length < 6 && (
                                            <Form.Text className="text-danger">
                                                Mật khẩu phải có ít nhất 6 ký tự.
                                            </Form.Text>
                                        )}
                                    </Form.Group>

                                    {/* Xác nhận mật khẩu */}
                                    <Form.Group className="mb-4" controlId="profileConfirmPassword">
                                        <Form.Label className="sp-form-label">Xác nhận mật khẩu mới</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Nhập lại mật khẩu mới"
                                            className="sp-form-control"
                                        />
                                        {formData.newPassword && formData.confirmPassword &&
                                            formData.newPassword !== formData.confirmPassword && (
                                                <Form.Text className="text-danger">
                                                    Mật khẩu xác nhận không khớp.
                                                </Form.Text>
                                            )}
                                    </Form.Group>

                                    {/* Nút Lưu */}
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="sp-save-btn"
                                            id="save-profile-btn"
                                        >
                                            💾 Lưu thay đổi
                                        </Button>
                                    </div>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>

            <Footer />
        </>
    );
}

export default StudentProfile;
