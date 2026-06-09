// [AI Generated Code - Prompt: "AdminDashboard: Các thẻ thống kê (Dashboard Cards) nổi bật và layout bảng thống kê"]
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';

const AdminDashboard = () => {
  return (
    <>
      <h2 className="fw-bold text-navy mb-4">Bảng Thống kê Tổng quan</h2>
      
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="premium-card bg-primary text-white border-0">
            <Card.Body className="p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-1 text-white-50 fw-medium text-uppercase small">Tổng số học viên</p>
                <h3 className="fw-bold mb-0">{mockDb.stats.totalStudents}</h3>
              </div>
              <div className="fs-1 opacity-50">👤</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="premium-card bg-success text-white border-0">
            <Card.Body className="p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-1 text-white-50 fw-medium text-uppercase small">Tổng số khóa học</p>
                <h3 className="fw-bold mb-0">{mockDb.stats.totalCourses}</h3>
              </div>
              <div className="fs-1 opacity-50">📚</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="premium-card bg-warning text-white border-0">
            <Card.Body className="p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-1 text-white-50 fw-medium text-uppercase small">Doanh thu dự kiến</p>
                <h3 className="fw-bold mb-0">${mockDb.stats.totalRevenue}</h3>
              </div>
              <div className="fs-1 opacity-50">💰</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold text-navy mb-4">Hoạt động gần đây</h5>
              <p className="text-muted">Chưa có dữ liệu hoạt động mới trong tuần này.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
