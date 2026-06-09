// [AI Generated Code - Prompt: "Giao diện form đăng nhập sử dụng Card và Input nhóm của React-Bootstrap"]
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { mockDb } from '../data/mockDb';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    const user = mockDb.users.find(u => u.email === email && u.password === password);
    if (user) {
      if (user.status === 'Locked') {
        setError('Tài khoản của bạn đã bị khóa.');
        return;
      }
      // Giả lập lưu session và chuyển hướng dựa theo role
      if (user.role === 'admin' || user.role === 'Admin') navigate('/admin/dashboard');
      else if (user.role === 'instructor' || user.role === 'Instructor') navigate('/instructor/dashboard');
      else navigate('/student/dashboard');
    } else {
      setError('Email hoặc mật khẩu không chính xác (Thử: admin@fpt.edu.vn / 123456)');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5}>
          <Card className="premium-card p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Đăng nhập</h3>
                <p className="text-muted small">Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-medium text-navy">Địa chỉ Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Nhập email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label className="fw-medium text-navy">Mật khẩu</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Mật khẩu" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3 py-2">
                  Đăng nhập
                </Button>

                <div className="text-center">
                  <span className="text-muted">Chưa có tài khoản? </span>
                  <Link to="/register" className="text-primary text-decoration-none fw-medium">
                    Đăng ký ngay
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

export default Login;