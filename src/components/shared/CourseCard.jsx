// [AI Generated Code - Prompt: "Thiết kế component thẻ khóa học tái sử dụng CourseCard có hiệu ứng hover"]
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card className="premium-card h-100 overflow-hidden border-0">
      <Card.Img variant="top" src={course.image} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg="light" text="primary" className="mb-2">
            {course.categoryName}
          </Badge>
        </div>
        <Card.Title className="fw-bold fs-5 text-truncate" title={course.title}>
          {course.title}
        </Card.Title>
        <Card.Text className="text-muted small mb-3">
          Giảng viên: <span className="text-dark fw-medium">{course.instructorName}</span>
        </Card.Text>
        <div className="mt-auto d-flex justify-content-end align-items-center">
          <Button as={Link} to={`/course/${course.id}`} variant="outline-primary" size="sm">
            Xem chi tiết
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
