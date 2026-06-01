import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as RBNavbar, Nav, Container } from 'react-bootstrap';

const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'Categories', path: '/categories' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
];

function AppNavbar() {
    return (
        <RBNavbar bg="light" expand="lg" className="border-bottom">
            <Container>
                <RBNavbar.Brand as={NavLink} to="/">
                    CourseManagement
                </RBNavbar.Brand>

                <RBNavbar.Toggle aria-controls="app-navbar-nav" />
                <RBNavbar.Collapse id="app-navbar-nav">
                    <Nav className="ms-auto">
                        {navItems.map((item) => (
                            <Nav.Link
                                key={item.path}
                                as={NavLink}
                                to={item.path}
                                end={item.path === '/'}
                            >
                                {item.title}
                            </Nav.Link>
                        ))}
                    </Nav>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
}

export default AppNavbar;
