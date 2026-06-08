// [AI Generated Code - Prompt: "Cập nhật Sidebar component áp dụng các class custom-sidebar active để đổi màu nền xanh nhạt, chữ xanh chủ đạo"]
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

function Sidebar({ menuItems = [] }) {
    return (
        <aside className="sidebar-menu p-3 bg-white rounded-3 shadow-sm custom-sidebar">
            <h6 className="text-uppercase text-muted fw-bold mb-3 px-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                Quản lý hệ thống
            </h6>
            <ListGroup variant="flush">
                {menuItems.map((item) => (
                    <ListGroup.Item key={item.path} className="border-0 px-0 py-1 bg-transparent">
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `d-flex align-items-center gap-2 text-decoration-none rounded px-3 py-2 transition-all ${
                                    isActive 
                                        ? 'active' 
                                        : 'text-secondary hover-bg-light'
                                }`
                            }
                            style={{ fontSize: '0.9rem', fontWeight: 550 }}
                        >
                            {item.icon && <span className="d-flex align-items-center">{item.icon}</span>}
                            <span>{item.title}</span>
                        </NavLink>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </aside>
    );
}

export default Sidebar;
