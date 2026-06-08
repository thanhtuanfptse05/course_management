// [AI Generated Code - Prompt: "Khôi phục App.jsx về giao diện cơ bản tích hợp Header, Footer, Sidebar cho admin và định tuyến AppRoutes"]
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes/AppRoutes';

function App() {
    const location = useLocation();
    
    // Kiểm tra xem trang hiện tại có thuộc về Admin không
    const isAdminPage = location.pathname.startsWith('/admin');

    const adminMenuItems = [
        { title: 'Bảng điều khiển', path: '/admin/dashboard', icon: '📊' },
        { title: 'Quản lý Danh mục', path: '/admin/categories', icon: '📂' },
        { title: 'Quản lý Tài khoản', path: '/admin/users', icon: '👥' },
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Header />

            {/* Main Content Layout */}
            <main className="flex-grow-1">
                {isAdminPage ? (
                    <Container className="py-4">
                        <Row className="gx-4">
                            <Col lg={3} md={4} className="mb-4">
                                <Sidebar menuItems={adminMenuItems} />
                            </Col>
                            <Col lg={9} md={8}>
                                <AppRoutes />
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <AppRoutes />
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;