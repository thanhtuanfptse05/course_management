// [AI Generated Code - Prompt: "Xây dựng Sidebar động tự động phát hiện role (admin/instructor/student) từ AuthContext để hiển thị menu liên kết tương ứng bằng Tiếng Việt"]

import React from 'react';
import { NavLink } from 'react-router-dom';
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

    return (
        <aside className="custom-sidebar">
            <h5 className="sidebar-heading text-capitalize">{getRoleHeading()}</h5>
            <ListGroup variant="flush">
                {items.map((item) => (
                    <ListGroup.Item key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {item.icon && <i className={`${item.icon} fs-5`}></i>}
                            <span>{item.title}</span>
                        </NavLink>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </aside>
    );
}

export default Sidebar;
