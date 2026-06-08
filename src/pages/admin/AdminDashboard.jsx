// [AI Generated Code - Prompt: "Thiết kế trang AdminDashboard bằng Tiếng Việt dùng Header, Footer, Sidebar phân quyền và hiển thị các thẻ thống kê tổng quan với grid của React-Bootstrap"]

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

function AdminDashboard() {
    const { currentUser } = useAuth();

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            
            <Container className="py-4 flex-grow-1">
                <Row className="gx-4">
                    {/* Thanh điều hướng bên trái (Sidebar) */}
                    <Col lg={3} md={4} className="mb-4">
                        <Sidebar />
                    </Col>

                    {/* Vùng nội dung chính */}
                    <Col lg={9} md={8}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h1 className="h2 fw-bold text-navy mb-1">Trang Quản Trị Hệ Thống</h1>
                                <p className="text-muted small mb-0">Quản lý tổng quan hệ thống và các lớp học</p>
                            </div>
                            <span className="badge bg-danger px-3 py-2 text-uppercase">Quản Trị Viên</span>
                        </div>

                        {/* Thẻ thống kê tổng quan */}
                        <Row className="g-4 mb-4">
                            <Col sm={6} lg={3}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-people text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">45</h2>
                                        <p className="text-muted small mb-0">Tổng Học Viên</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6} lg={3}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-person-workspace text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">12</h2>
                                        <p className="text-muted small mb-0">Giảng Viên</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6} lg={3}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-journal-text text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">28</h2>
                                        <p className="text-muted small mb-0">Khóa Học Hoạt Động</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6} lg={3}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-card-checklist text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">8</h2>
                                        <p className="text-muted small mb-0">Yêu Cầu Chờ Duyệt</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* Thẻ chào mừng quản trị viên */}
                        <Card className="premium-card shadow-sm border-0 p-4 mb-4">
                            <Card.Body>
                                <h4 className="fw-semibold text-navy mb-3">Chào mừng trở lại, {currentUser?.name}!</h4>
                                <p className="text-muted mb-4">
                                    Sử dụng menu bên trái để truy cập các tính năng quản lý khóa học, phê duyệt danh mục, phân quyền tài khoản người dùng và xét duyệt đăng ký lớp học cho học viên.
                                </p>
                                <div className="p-3 bg-light rounded text-dark small border-start border-primary border-4">
                                    <strong>Lưu ý:</strong> Dữ liệu trên hệ thống hiện tại là dữ liệu giả lập (mock). Kết nối API thật với JSON-Server sẽ được triển khai trong tuần học kế tiếp.
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default AdminDashboard;
