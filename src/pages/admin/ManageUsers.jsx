// [AI Generated Code - Prompt: "ManageUsers: Bảng quản lý danh sách người dùng và trạng thái khóa/mở khóa"]
import React, { useState } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';

const ManageUsers = () => {
  const [users, setUsers] = useState(mockDb.users);

  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Locked' : 'Active' };
      }
      return u;
    }));
  };

  return (
    <>
      <h2 className="fw-bold text-navy mb-4">Quản lý Người dùng</h2>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="table-premium mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Tên người dùng</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="align-middle">
                  <td className="px-4 py-3 fw-medium text-navy">{user.name}</td>
                  <td className="px-4 py-3 text-muted">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge bg={user.role === 'Admin' ? 'danger' : user.role === 'Instructor' ? 'info' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge bg={user.status === 'Active' ? 'success' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-end">
                    {user.role !== 'Admin' && (
                      <Button 
                        variant={user.status === 'Active' ? 'outline-danger' : 'outline-success'} 
                        size="sm"
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === 'Active' ? 'Khóa' : 'Mở khóa'}
                      </Button>
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

export default ManageUsers;
