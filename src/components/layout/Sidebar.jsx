// [AI Generated Code - Prompt: "Xây dựng Sidebar mẫu cho Admin/Instructor"]
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

function Sidebar({ customMenuItems, menuItems }) {
    const { currentUser } = useAuth();
    
    // Menu mặc định cho từng vai trò bằng Tiếng Việt
    const getRoleMenuItems = () => {
        if (!currentUser) return [];

        switch (currentUser.role) {
            case 'admin':
                return [
                    { title: 'Tổng Quan Hệ Thống', path: '/admin/dashboard', icon: 'bi bi-speedometer2' },
                    { title: 'Quản Lý Khóa Học', path: '/admin/courses', icon: 'bi bi-journal-text' },
                    { title: 'Quản Lý Danh Mục', path: '/admin/categories', icon: 'bi bi-tags' },
                    { title: 'Quản Lý Người Dùng', path: '/admin/users', icon: 'bi bi-people' },
                    { title: 'Quản Lý Đăng Ký', path: '/admin/enrollments', icon: 'bi bi-card-checklist' }
                ];
            case 'instructor':
                return [
                    { title: 'Bảng Điều Khiển', path: '/instructor/dashboard', icon: 'bi bi-speedometer2' },
                    { title: 'Khóa Học Của Tôi', path: '/instructor/courses', icon: 'bi bi-journal-bookmark' },
                    { title: 'Danh Sách Học Viên', path: '/instructor/students', icon: 'bi bi-person-lines-fill' }
                ];
            case 'student':
                return [
                    { title: 'Khóa Học Của Tôi', path: '/student/dashboard', icon: 'bi bi-play-circle' },
                    { title: 'Tìm Kiếm Khóa Học', path: '/', icon: 'bi bi-search' },
                    { title: 'Hồ Sơ Cá Nhân', path: '/student/profile', icon: 'bi bi-person-badge' }
                ];
            default:
                return [];
        }
    };

    const items = customMenuItems || menuItems || getRoleMenuItems();
    
    // Lấy tiêu đề vai trò bằng Tiếng Việt
    const getRoleHeading = () => {
        if (!currentUser) return 'Danh mục';
        switch (currentUser.role) {
            case 'admin':
                return 'Quản Trị Viên';
            case 'instructor':
                return 'Giảng Viên';
            case 'student':
                return 'Học Viên';
            default:
                return 'Menu Điều Hướng';
        }
    };

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
