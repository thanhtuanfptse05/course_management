// [AI Generated Code - Prompt: "Tạo MainLayout cho ứng dụng chứa Navbar, Outlet và Footer"]
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
