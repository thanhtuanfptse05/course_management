// [AI Generated Code - Prompt: "Tạo Grid Component CourseList để hiển thị mảng CourseCard"]
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseCard from './CourseCard';

const CourseList = ({ courses = [] }) => {
  if (courses.length === 0) {
    return <div className="text-center text-muted py-5">Không tìm thấy khóa học nào.</div>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {courses.map((course) => (
        <Col key={course.id}>
          <CourseCard course={course} />
        </Col>
      ))}
    </Row>
  );
};

export default CourseList;
