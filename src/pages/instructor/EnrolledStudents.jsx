// [AI Generated Code - Prompt: "EnrolledStudents: Bảng hiển thị thông tin học viên đăng ký khóa học của giảng viên"]
import React, { useState, useEffect } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';

const EnrolledStudents = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    // Giả lập giảng viên ID 2
    const instructorCoursesIds = mockDb.courses.filter(c => c.instructorId === 2).map(c => c.id);
    const students = mockDb.enrollments.filter(e => instructorCoursesIds.includes(e.courseId));
    setEnrollments(students);
  }, []);

  return (
    <>
      <h2 className="fw-bold text-navy mb-4">Học viên Đăng ký</h2>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="table-premium mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Tên Học viên</th>
                <th className="px-4 py-3">Khóa học</th>
                <th className="px-4 py-3">Ngày đăng ký</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(en => (
                <tr key={en.id} className="align-middle">
                  <td className="px-4 py-3 fw-medium text-navy">{en.studentName}</td>
                  <td className="px-4 py-3 text-muted">{en.courseTitle}</td>
                  <td className="px-4 py-3 text-muted">{en.enrolledDate}</td>
                  <td className="px-4 py-3">
                    <Badge bg={en.status === 'Approved' ? 'success' : en.status === 'Pending' ? 'warning' : 'danger'}>
                      {en.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">Không có học viên nào.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default EnrolledStudents;
