// [AI Generated Code - Prompt: "Giao diện form đăng ký chọn role Học viên/Giảng viên dạng Radio"]
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    
    setSuccess(true);
    setError('');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center my-5">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="premium-card p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Đăng ký Tài khoản</h3>
                <p className="text-muted small">Tạo tài khoản mới để bắt đầu hành trình của bạn.</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Đăng ký thành công! Đang chuyển hướng...</Alert>}

              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="registerName">
                  <Form.Label className="fw-medium text-navy">Họ và tên</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Nhập họ tên đầy đủ" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label className="fw-medium text-navy">Địa chỉ Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Nhập email hợp lệ" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label className="fw-medium text-navy">Mật khẩu</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Tạo mật khẩu" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium text-navy d-block">Bạn là:</Form.Label>
                  <div className="d-flex gap-4">
                    <Form.Check 
                      type="radio"
                      id="role-student"
                      label="Học viên"
                      name="roleGroup"
                      checked={formData.role === 'Student'}
                      onChange={() => setFormData({...formData, role: 'Student'})}
                    />
                    <Form.Check 
                      type="radio"
                      id="role-instructor"
                      label="Giảng viên"
                      name="roleGroup"
                      checked={formData.role === 'Instructor'}
                      onChange={() => setFormData({...formData, role: 'Instructor'})}
                    />
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3 py-2">
                  Đăng ký
                </Button>

                <div className="text-center">
                  <span className="text-muted">Đã có tài khoản? </span>
                  <Link to="/login" className="text-primary text-decoration-none fw-medium">
                    Đăng nhập ngay
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
