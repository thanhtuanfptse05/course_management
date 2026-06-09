// [AI Generated Code - Prompt: "Xây dựng Sidebar mẫu cho Admin/Instructor"]
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

function Sidebar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const adminMenu = [
    { title: 'Bảng thống kê', path: '/admin/dashboard' },
    { title: 'Quản lý Danh mục', path: '/admin/categories' },
    { title: 'Quản lý Khóa học', path: '/admin/courses' },
    { title: 'Duyệt Đăng ký', path: '/admin/enrollments' },
    { title: 'Quản lý Người dùng', path: '/admin/users' },
  ];

  const instructorMenu = [
    { title: 'Khóa học của tôi', path: '/instructor/dashboard' },
    { title: 'Học viên Đăng ký', path: '/instructor/students' },
  ];

  const menuItems = isAdmin ? adminMenu : instructorMenu;

  return (
    <aside className="custom-sidebar p-3 bg-white rounded shadow-sm" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <h6 className="mb-3 text-muted fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
        {isAdmin ? 'Admin Menu' : 'Instructor Menu'}
      </h6>
      <ListGroup variant="flush">
        {menuItems.map((item) => (
          <ListGroup.Item 
            key={item.path} 
            as={NavLink} 
            to={item.path}
            className="d-flex align-items-center text-decoration-none"
          >
            {item.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </aside>
  );
}

export default Sidebar;
