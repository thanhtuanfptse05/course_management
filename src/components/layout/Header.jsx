// [AI Generated Code - Prompt: "Thiết kế Header/Navbar màu Trắng - Xanh biển bằng Tiếng Việt, xử lý đăng nhập/đăng xuất động với AuthContext"]

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    return (
        <Navbar expand="lg" sticky="top" className="custom-navbar">
            <Container>
                {/* Logo màu Xanh Sapphire */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <i className="bi bi-book-half me-2 text-primary"></i>
                    <span>CourseMGT</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-nav" />

                <Navbar.Collapse id="main-nav">
                    {/* Các liên kết điều hướng chính */}
                    <Nav className="me-auto ms-lg-4">
                        <Nav.Link as={NavLink} to="/" end>
                            Trang Chủ
                        </Nav.Link>
                        {currentUser && (
                            <>
                                {currentUser.role === 'admin' && (
                                    <Nav.Link as={NavLink} to="/admin/dashboard">
                                        Trang Quản Trị
                                    </Nav.Link>
                                )}
                                {currentUser.role === 'instructor' && (
                                    <Nav.Link as={NavLink} to="/instructor/dashboard">
                                        Trang Giảng Viên
                                    </Nav.Link>
                                )}
                                {currentUser.role === 'student' && (
                                    <Nav.Link as={NavLink} to="/student/dashboard">
                                        Trang Học Viên
                                    </Nav.Link>
                                )}
                            </>
                        )}
                        <Nav.Link as={NavLink} to="/demo">
                            Component Demo
                        </Nav.Link>
                    </Nav>

                    {/* Trạng thái xác thực của người dùng */}
                    <Nav className="align-items-lg-center">
                        {currentUser ? (
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-person-circle fs-5 text-primary"></i>
                                <NavDropdown 
                                    title={currentUser.name} 
                                    id="user-dropdown" 
                                    align="end"
                                    className="fw-semibold text-navy"
                                >
                                    <NavDropdown.Header className="py-1">
                                        <div className="fw-normal text-muted" style={{ fontSize: '0.8rem' }}>Vai trò</div>
                                        <span className="badge bg-primary text-capitalize">
                                            {currentUser.role === 'admin' ? 'Quản trị viên' : 
                                             currentUser.role === 'instructor' ? 'Giảng viên' : 'Học viên'}
                                        </span>
                                        <div className="fw-normal text-muted mt-2" style={{ fontSize: '0.8rem' }}>Email</div>
                                        <div className="text-truncate fw-normal text-dark" style={{ maxWidth: '180px' }}>
                                            {currentUser.email}
                                        </div>
                                    </NavDropdown.Header>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to={`/${currentUser.role}/dashboard`}>
                                        <i className="bi bi-speedometer2 me-2"></i>Bảng Điều Khiển
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                        <i className="bi bi-box-arrow-right me-2"></i>Đăng Xuất
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button 
                                    as={Link} 
                                    to="/login" 
                                    variant="outline-primary" 
                                    className="px-4 py-2"
                                >
                                    Đăng Nhập
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/register" 
                                    variant="primary" 
                                    className="px-4 py-2"
                                >
                                    Đăng Ký
                                </Button>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;