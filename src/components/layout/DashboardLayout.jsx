// [AI Generated Code - Prompt: "Tạo DashboardLayout 2 cột cho Admin/Instructor với Sidebar và Outlet"]
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const DashboardLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Container fluid className="py-4 px-4">
          <Row className="gx-4">
            <Col lg={2} md={3} className="mb-4">
              <Sidebar />
            </Col>
            <Col lg={10} md={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
