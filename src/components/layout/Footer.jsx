import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Container className="text-center">
                <p className="mb-1"> CourseManagement — FPT University</p>
                <p className="mb-0 text-secondary" style={{ fontSize: '0.85rem' }}>
                    Group SE2014JS-G03 © 2025
                </p>
            </Container>
        </footer>
    );
}

export default Footer;