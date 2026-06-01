import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

function Sidebar({ menuItems = [] }) {
    return (
        <aside className="sidebar-menu p-3 bg-white rounded shadow-sm">
            <h5 className="mb-3">Navigation</h5>
            <ListGroup variant="flush">
                {menuItems.map((item) => (
                    <ListGroup.Item key={item.path} className="border-0 px-0 py-1">
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `d-flex align-items-center gap-2 text-decoration-none rounded px-3 py-2 ${
                                    isActive ? 'bg-primary text-white' : 'text-dark'
                                }`
                            }
                        >
                            {item.icon && <span>{item.icon}</span>}
                            <span>{item.title}</span>
                        </NavLink>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </aside>
    );
}

export default Sidebar;
