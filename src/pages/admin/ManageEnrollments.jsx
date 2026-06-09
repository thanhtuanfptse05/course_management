// [AI Generated Code - Prompt: "ManageEnrollments: Thiết kế bảng hiển thị danh sách học viên đăng ký khóa học, cột thao tác duyệt (Approve/Reject)"]
import React, { useState } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';

const ManageEnrollments = () => {
  const [enrollments, setEnrollments] = useState(mockDb.enrollments);

  const handleUpdateStatus = (id, newStatus) => {
    setEnrollments(enrollments.map(en => {
      if (en.id === id) {
        return { ...en, status: newStatus };
      }
      return en;
    }));
  };

  return (
    <>
      <h2 className="fw-bold text-navy mb-4">Duyệt Đăng ký Khóa học</h2>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="table-premium mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Tên Học viên</th>
                <th className="px-4 py-3">Khóa học</th>
                <th className="px-4 py-3">Ngày đăng ký</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-end">Thao tác</th>
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
                  <td className="px-4 py-3 text-end">
                    {en.status === 'Pending' && (
                      <>
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleUpdateStatus(en.id, 'Approved')}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleUpdateStatus(en.id, 'Rejected')}
                        >
                          Reject
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

export default ManageEnrollments;
