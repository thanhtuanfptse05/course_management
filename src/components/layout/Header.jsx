// [AI Generated Code - Prompt: "Khôi phục Header.jsx về giao diện cơ bản ban đầu với Navbar bg dark và các liên kết Login, Register"]
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

function Header() {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    CourseManagement
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-nav" />

                <Navbar.Collapse id="main-nav">
                    {/* Search bar */}
                    <Form className="d-flex mx-auto" style={{ width: '40%' }}>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm khóa học..."
                            className="me-2"
                        />
                        <Button variant="outline-light">Tìm</Button>
                    </Form>

                    {/* Nav links */}
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                        <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;