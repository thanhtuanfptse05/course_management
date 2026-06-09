// [AI Generated Code - Prompt: "StudentDashboard: Giao diện hiển thị danh sách các khóa học học viên đã tham gia với Badges trạng thái"]
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [myEnrollments, setMyEnrollments] = useState([]);

  useEffect(() => {
    // Giả lập học viên ID 3 (Alice Student)
    const studentId = 3;
    const enrollments = mockDb.enrollments.filter(e => e.studentId === studentId);
    
    const enrichedEnrollments = enrollments.map(en => {
      const course = mockDb.courses.find(c => c.id === en.courseId);
      return { ...en, course };
    });
    
    setMyEnrollments(enrichedEnrollments);
  }, []);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-navy mb-0">Khóa học của tôi</h2>
        <Button as={Link} to="/" variant="outline-primary">
          Tìm thêm khóa học
        </Button>
      </div>

      {myEnrollments.length === 0 ? (
        <Card className="text-center py-5 border-0 shadow-sm">
          <Card.Body>
            <h5 className="text-muted">Bạn chưa đăng ký khóa học nào.</h5>
            <Button as={Link} to="/" variant="primary" className="mt-3">Khám phá ngay</Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {myEnrollments.map((en) => (
            <Col key={en.id}>
              <Card className="premium-card h-100 overflow-hidden border-0">
                <Card.Img variant="top" src={en.course?.image} style={{ height: '160px', objectFit: 'cover' }} />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg={en.status === 'Approved' ? 'success' : en.status === 'Pending' ? 'warning' : 'danger'}>
                      {en.status === 'Approved' ? 'Đang học' : en.status === 'Pending' ? 'Chờ duyệt' : 'Bị từ chối'}
                    </Badge>
                  </div>
                  <Card.Title className="fw-bold fs-5 mb-3">{en.courseTitle}</Card.Title>
                  
                  {en.status === 'Approved' ? (
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Tiến độ</span>
                        <span>0%</span>
                      </div>
                      <ProgressBar variant="primary" now={0} style={{ height: '8px' }} className="mb-3" />
                      <Button variant="primary" size="sm" className="w-100">Tiếp tục học</Button>
                    </div>
                  ) : (
                    <div className="mt-auto pt-3 border-top text-center text-muted small">
                      {en.status === 'Pending' ? 'Vui lòng chờ Admin phê duyệt.' : 'Đăng ký đã bị từ chối.'}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentDashboard;
