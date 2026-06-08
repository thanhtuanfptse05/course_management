// [AI Generated Code - Prompt: "Thiết kế trang StudentDashboard bằng Tiếng Việt với grid và Sidebar phân quyền cho Học viên, danh sách lớp đăng ký học"]

import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Table, Button } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

function StudentDashboard() {
    const { currentUser } = useAuth();

    const mockEnrolls = [
        { id: 1, title: 'Lập trình ReactJS cơ bản', instructor: 'Giảng viên John', progress: 75, status: 'approved' },
        { id: 2, title: 'Lập trình Next.js nâng cao & TypeScript', instructor: 'Giảng viên John', progress: 0, status: 'pending' },
        { id: 3, title: 'Lập trình Node.js & Express cơ bản', instructor: 'Giảng viên Emily', progress: 100, status: 'approved' }
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return <span className="badge bg-success">Đã duyệt</span>;
            case 'pending':
                return <span className="badge bg-warning">Chờ duyệt</span>;
            case 'rejected':
                return <span className="badge bg-danger">Từ chối</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

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
                                <h1 className="h2 fw-bold text-navy mb-1">Góc Học Tập</h1>
                                <p className="text-muted small mb-0">Theo dõi tiến trình các lớp học của bạn</p>
                            </div>
                            <Button variant="primary" onClick={() => window.location.href = '/'}>
                                <i className="bi bi-search me-2"></i>Tìm Khóa Học
                            </Button>
                        </div>

                        {/* Thẻ chào mừng học viên */}
                        <Card className="premium-card shadow-sm border-0 p-4 mb-4" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)' }}>
                            <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                                <div>
                                    <h4 className="fw-bold text-navy mb-1">Chào mừng trở lại, {currentUser?.name}!</h4>
                                    <p className="text-muted small mb-0">Hãy duy trì việc tự học và hoàn thành các bài tập để nhận chứng chỉ nhé.</p>
                                </div>
                                <div className="text-navy fw-semibold small bg-white px-3 py-2 rounded shadow-sm border">
                                    <i className="bi bi-trophy text-warning me-2"></i>
                                    <span>Hoàn thành 1 khóa học</span>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Bảng danh sách khóa học đăng ký học */}
                        <Card className="premium-card shadow-sm border-0">
                            <Card.Body className="p-0">
                                <div className="p-4 border-bottom">
                                    <h5 className="fw-bold text-navy mb-0">Danh Sách Khóa Học</h5>
                                </div>
                                <div className="table-responsive">
                                    <Table hover className="premium-table mb-0" striped>
                                        <thead>
                                            <tr>
                                                <th>Tên Khóa Học</th>
                                                <th>Giảng Viên</th>
                                                <th>Trạng Thái</th>
                                                <th>Tiến Độ Học</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockEnrolls.map(enroll => (
                                                <tr key={enroll.id}>
                                                    <td><strong className="text-dark">{enroll.title}</strong></td>
                                                    <td>{enroll.instructor}</td>
                                                    <td>{getStatusBadge(enroll.status)}</td>
                                                    <td style={{ minWidth: '150px' }}>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <ProgressBar 
                                                                now={enroll.progress} 
                                                                variant={enroll.progress === 100 ? 'success' : 'primary'} 
                                                                style={{ height: '6px', flexGrow: 1 }}
                                                            />
                                                            <span className="small text-muted" style={{ minWidth: '35px' }}>{enroll.progress}%</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {enroll.status === 'approved' ? (
                                                            <Button variant="outline-primary" size="sm">
                                                                {enroll.progress === 100 ? 'Xem lại' : 'Học tiếp'}
                                                            </Button>
                                                        ) : (
                                                            <Button variant="outline-secondary" size="sm" disabled>
                                                                Chờ duyệt
                                                            </Button>
                                                        )}
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

export default StudentDashboard;
