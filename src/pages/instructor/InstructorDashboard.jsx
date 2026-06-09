// [AI Generated Code - Prompt: "InstructorDashboard: Layout danh sách khóa học của giảng viên với các nút tương tác"]
import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';
import CustomModal from '../../components/CustomModal';
import CourseForm from './CourseForm';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Giả lập giảng viên đăng nhập là John Instructor (id = 2)
    const instructorCourses = mockDb.courses.filter(c => c.instructorId === 2);
    setCourses(instructorCourses);
  }, []);

  const handleShowModal = (course = null) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-navy mb-0">Khóa học của tôi</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          + Thêm khóa học mới
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="table-premium mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Tên khóa học</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="align-middle">
                  <td className="px-4 py-3 fw-medium text-navy">{course.title}</td>
                  <td className="px-4 py-3 text-muted">{course.categoryName}</td>
                  <td className="px-4 py-3">
                    <Badge bg={course.status === 'Approved' ? 'success' : 'warning'}>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowModal(course)}>
                      Sửa
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <CustomModal 
        show={showModal} 
        onHide={handleCloseModal} 
        title={selectedCourse ? "Sửa khóa học" : "Thêm khóa học mới"}
        onSave={handleCloseModal}
      >
        <CourseForm course={selectedCourse} />
      </CustomModal>
    </>
  );
};

export default InstructorDashboard;
