// [AI Generated Code - Prompt: "CourseDetail: Layout chia 2 cột với box mua hàng cố định"]
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { mockDb } from '../../data/mockDb';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const found = mockDb.courses.find(c => c.id.toString() === id);
    setCourse(found);
  }, [id]);

  if (!course) return <Container className="py-5 text-center">Đang tải...</Container>;

  return (
    <Container className="py-4">
      <Row className="g-5">
        <Col lg={8}>
          <div className="mb-4">
            <Badge bg="info" className="mb-2">{course.categoryName}</Badge>
            <h1 className="fw-bold text-navy mb-3">{course.title}</h1>
            <p className="text-muted fs-5 mb-4">{course.description}</p>
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                {course.instructorName.charAt(0)}
              </div>
              <div>
                <small className="text-muted d-block lh-1">Giảng viên</small>
                <strong className="text-navy">{course.instructorName}</strong>
              </div>
            </div>
          </div>
          
          <img src={course.image} alt={course.title} className="img-fluid rounded shadow-sm w-100 mb-5" style={{maxHeight: 400, objectFit: 'cover'}} />
          
          <h3 className="fw-bold text-navy mb-3">Nội dung khóa học</h3>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                  <span className="bg-light-blue text-primary rounded-circle px-2 py-1 me-3 small">1</span>
                  Giới thiệu tổng quan
                </li>
                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                  <span className="bg-light-blue text-primary rounded-circle px-2 py-1 me-3 small">2</span>
                  Kiến thức nền tảng và cài đặt môi trường
                </li>
                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                  <span className="bg-light-blue text-primary rounded-circle px-2 py-1 me-3 small">3</span>
                  Thực hành xây dựng dự án thực tế
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <div className="position-sticky" style={{ top: '100px' }}>
            <Card className="premium-card p-2">
              <Card.Body>

                <ul className="list-unstyled mb-4 text-muted small">
                  <li className="mb-2">✓ Truy cập trọn đời</li>
                  <li className="mb-2">✓ Chứng chỉ hoàn thành</li>
                  <li className="mb-2">✓ Hỗ trợ từ giảng viên</li>
                </ul>
                <Button variant="primary" size="lg" className="w-100 mb-2" onClick={() => alert('Chức năng đăng ký đang được xây dựng!')}>
                  Đăng ký khóa học
                </Button>
                <p className="text-center text-muted mt-2 small">Đảm bảo hoàn tiền trong 30 ngày</p>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
