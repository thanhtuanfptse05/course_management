// [AI Generated Code - Prompt: "Xây dựng Header/Navbar với Logo Ocean Blue và nút Đăng nhập/Đăng ký"]
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar as RBNavbar, Nav, Container, Button } from 'react-bootstrap';

function AppNavbar() {
  return (
    <RBNavbar bg="white" expand="lg" style={{ borderBottom: '2px solid var(--light-blue)' }} sticky="top">
      <Container>
        <RBNavbar.Brand as={Link} to="/" style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>
          CourseManagement
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="app-navbar-nav" />
        <RBNavbar.Collapse id="app-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" style={{ color: 'var(--text-navy)' }}>Khám phá</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center gap-3">
            <Button as={Link} to="/login" variant="outline-primary" size="sm" className="px-4">
              Đăng nhập
            </Button>
            <Button as={Link} to="/register" variant="primary" size="sm" className="px-4">
              Đăng ký
            </Button>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default AppNavbar;
