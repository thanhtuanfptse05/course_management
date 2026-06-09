// [AI Generated Code - Prompt: "ManageCourses: Bảng quản lý toàn bộ khóa học của hệ thống dành cho Admin"]
import React, { useState } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';

const ManageCourses = () => {
  const [courses, setCourses] = useState(mockDb.courses);

  const handleUpdateStatus = (id, newStatus) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  return (
    <>
      <h2 className="fw-bold text-navy mb-4">Quản lý Khóa học Hệ thống</h2>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="table-premium mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Tên khóa học</th>
                <th className="px-4 py-3">Giảng viên</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-end">Thao tác duyệt</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="align-middle">
                  <td className="px-4 py-3 fw-medium text-navy">{course.title}</td>
                  <td className="px-4 py-3 text-muted">{course.instructorName}</td>
                  <td className="px-4 py-3 text-muted">{course.categoryName}</td>
                  <td className="px-4 py-3">
                    <Badge bg={course.status === 'Approved' ? 'success' : course.status === 'Pending' ? 'warning' : 'danger'}>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-end">
                    {course.status === 'Pending' && (
                      <>
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleUpdateStatus(course.id, 'Approved')}
                        >
                          Duyệt
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleUpdateStatus(course.id, 'Rejected')}
                        >
                          Từ chối
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default ManageCourses;
