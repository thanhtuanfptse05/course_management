// [AI Generated Code - Prompt: "Thiết kế trang InstructorDashboard bằng Tiếng Việt với grid và Sidebar phân quyền cho Giảng viên, kèm danh sách khóa học mẫu"]

import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

function InstructorDashboard() {
    const { currentUser } = useAuth();

    const mockTeachingCourses = [
        { id: 1, title: 'Lập trình ReactJS cơ bản', students: 24, status: 'Hoạt động', category: 'Lập trình Web' },
        { id: 2, title: 'Lập trình Next.js nâng cao & TypeScript', students: 12, status: 'Hoạt động', category: 'Lập trình Web' },
        { id: 4, title: 'Lập trình iOS với Swift', students: 8, status: 'Bản nháp', category: 'Lập trình Di Động' }
    ];

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
                                <h1 className="h2 fw-bold text-navy mb-1">Chào mừng giảng viên, {currentUser?.name || 'Giảng viên'}</h1>
                                <p className="text-muted small mb-0">Quản lý khóa học, bài học và theo dõi học sinh của bạn</p>
                            </div>
                            <Button variant="primary">
                                <i className="bi bi-plus-lg me-2"></i>Tạo Khóa Học Mới
                            </Button>
                        </div>

                        {/* Thẻ thống kê nhanh */}
                        <Row className="g-4 mb-4">
                            <Col sm={6} lg={4}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-journal-bookmark text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">3</h2>
                                        <p className="text-muted small mb-0">Khóa Học Của Tôi</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6} lg={4}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-people text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">44</h2>
                                        <p className="text-muted small mb-0">Tổng Học Viên</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6} lg={4}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-star text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">4.8</h2>
                                        <p className="text-muted small mb-0">Đánh Giá Trung Bình</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* Bảng danh sách khóa học đang dạy */}
                        <Card className="premium-card shadow-sm border-0 mb-4">
                            <Card.Body className="p-0">
                                <div className="p-4 border-bottom">
                                    <h5 className="fw-bold text-navy mb-0">Danh Sách Lớp Học Đang Giảng Dạy</h5>
                                </div>
                                <div className="table-responsive">
                                    <Table hover className="premium-table mb-0" striped>
                                        <thead>
                                            <tr>
                                                <th>Tên Khóa Học</th>
                                                <th>Danh Mục</th>
                                                <th>Số Học Viên</th>
                                                <th>Trạng Thái</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockTeachingCourses.map(course => (
                                                <tr key={course.id}>
                                                    <td><strong className="text-dark">{course.title}</strong></td>
                                                    <td>{course.category}</td>
                                                    <td>{course.students} học viên đăng ký</td>
                                                    <td>
                                                        <span className={`badge ${course.status === 'Hoạt động' ? 'bg-success' : 'bg-secondary'}`}>
                                                            {course.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Button variant="outline-primary" size="sm" className="me-2">Sửa</Button>
                                                        <Button variant="outline-secondary" size="sm">Chi tiết</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
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

export default InstructorDashboard;
