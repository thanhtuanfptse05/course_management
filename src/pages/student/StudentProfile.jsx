// [AI Generated Code - Prompt: "StudentProfile: Form hiển thị thông tin học viên để xem và cập nhật"]
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';

const StudentProfile = () => {
  // Giả lập học viên đang đăng nhập (Alice Student)
  const student = mockDb.users.find(u => u.id === 3);
  
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    bio: 'Tôi là một học viên đam mê lập trình và thiết kế.'
  });
  const [success, setSuccess] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccess('Cập nhật hồ sơ thành công!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="fw-bold text-navy mb-4">Hồ sơ cá nhân</h2>
          <Card className="premium-card">
            <Card.Body className="p-4">
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium text-navy">Họ và tên</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium text-navy">Địa chỉ Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={formData.email}
                    disabled
                    className="bg-light"
                  />
                  <Form.Text className="text-muted">Email không thể thay đổi sau khi đăng ký.</Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium text-navy">Giới thiệu bản thân</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4}
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="px-4">
                  Lưu thay đổi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProfile;
