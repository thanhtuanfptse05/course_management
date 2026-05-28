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
                            placeholder="Search courses..."
                            className="me-2"
                        />
                        <Button variant="outline-light">Search</Button>
                    </Form>

                    {/* Nav links */}
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;