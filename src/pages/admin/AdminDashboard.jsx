// [AI Generated Code - Prompt: "Khôi phục AdminDashboard.jsx về giao diện thống kê cơ bản gồm 4 thẻ thống kê và 2 bảng danh sách gần đây"]
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Badge, Card } from 'react-bootstrap';
import courseService from '../../services/courseService';
import userService from '../../services/userService';
import enrollmentService from '../../services/enrollmentService';
import StatCard from '../../components/shared/StatCard';
import Loading from '../../components/common/Loading';

function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalInstructors: 0,
        totalRevenue: 0
    });
    const [recentCourses, setRecentCourses] = useState([]);
    const [recentEnrollments, setRecentEnrollments] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [courses, users, enrollments] = await Promise.all([
                    courseService.getAll(),
                    userService.getAll(),
                    enrollmentService.getAll()
                ]);

                // Tính toán thống kê
                const totalCourses = courses.length;
                const totalStudents = users.filter(u => u.role === 'student').length;
                const totalInstructors = users.filter(u => u.role === 'instructor').length;

                // Tính doanh thu giả lập: Tổng (giá khóa học * số enrollment đã approved)
                let totalRevenue = 0;
                enrollments.forEach(enrollment => {
                    if (enrollment.status === 'approved') {
                        const course = courses.find(c => c.id === enrollment.courseId);
                        if (course) {
                            totalRevenue += (course.price || 0);
                        }
                    }
                });

                setStats({
                    totalCourses,
                    totalStudents,
                    totalInstructors,
                    totalRevenue
                });

                // Lấy 5 khóa học gần đây nhất
                const sortedCourses = [...courses].reverse().slice(0, 5);
                setRecentCourses(sortedCourses);

                // Lấy 5 đơn đăng ký gần đây nhất
                const enrichedEnrollments = enrollments.map(en => {
                    const student = users.find(u => u.id === en.studentId);
                    const course = courses.find(c => c.id === en.courseId);
                    return {
                        ...en,
                        studentName: student ? student.name : 'Chưa rõ',
                        studentEmail: student ? student.email : '',
                        courseTitle: course ? course.title : 'Khóa học đã bị xóa'
                    };
                }).reverse().slice(0, 5);
                setRecentEnrollments(enrichedEnrollments);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu thống kê. Vui lòng kiểm tra JSON-Server.');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 25000);
    };

    if (loading) return <Loading message="Đang phân tích dữ liệu hệ thống..." />;

    if (error) {
        return (
            <Container className="py-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h1 className="fw-bold text-navy mb-1" style={{ fontSize: '1.85rem' }}>Bảng điều khiển</h1>
                    <p className="text-muted mb-0">Thống kê và hoạt động hệ thống quản lý khóa học.</p>
                </div>
            </div>

            {/* Stats Cards Row */}
            <Row className="g-3 g-lg-4 mb-5">
                <Col xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Tổng khóa học"
                        value={stats.totalCourses}
                        color="primary"
                        subtitle="Khóa học đang hoạt động"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                            </svg>
                        }
                    />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Tổng học viên"
                        value={stats.totalStudents}
                        color="success"
                        subtitle="Tài khoản học tập"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                        }
                    />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Giảng viên"
                        value={stats.totalInstructors}
                        color="warning"
                        subtitle="Chuyên gia đào tạo"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
                                <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                <path d="M14 8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5zM2 12h12v.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        }
                    />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Doanh thu giả lập"
                        value={formatCurrency(stats.totalRevenue)}
                        color="danger"
                        subtitle="Đăng ký đã duyệt"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                            </svg>
                        }
                    />
                </Col>
            </Row>

            {/* Tables Row */}
            <Row className="g-4">
                {/* Recent Courses */}
                <Col xs={12} lg={6}>
                    <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
                        <Card.Header className="bg-white py-3 border-bottom-0">
                            <h5 className="fw-bold text-navy mb-0">Khóa học mới cập nhật</h5>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="table-responsive">
                                <Table className="admin-table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Tên khóa học</th>
                                            <th>Giá</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentCourses.map(course => (
                                            <tr key={course.id}>
                                                <td className="fw-semibold text-navy">{course.title}</td>
                                                <td>
                                                    {course.price === 0 ? (
                                                        <Badge bg="success">Miễn phí</Badge>
                                                    ) : (
                                                        <span className="text-secondary">{formatCurrency(course.price)}</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <Badge bg={course.status === 'active' ? 'primary' : 'secondary'}>
                                                        {course.status === 'active' ? 'Hoạt động' : 'Ẩn'}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Recent Enrollments */}
                <Col xs={12} lg={6}>
                    <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
                        <Card.Header className="bg-white py-3 border-bottom-0">
                            <h5 className="fw-bold text-navy mb-0">Hoạt động đăng ký gần đây</h5>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="table-responsive">
                                <Table className="admin-table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Học viên</th>
                                            <th>Khóa học</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentEnrollments.map(en => {
                                            const statusColors = {
                                                approved: 'success',
                                                pending: 'warning',
                                                rejected: 'danger'
                                            };
                                            const statusText = {
                                                approved: 'Đã duyệt',
                                                pending: 'Chờ duyệt',
                                                rejected: 'Từ chối'
                                            };
                                            return (
                                                <tr key={en.id}>
                                                    <td>
                                                        <div className="fw-semibold text-navy">{en.studentName}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{en.studentEmail}</div>
                                                    </td>
                                                    <td className="text-truncate" style={{ maxWidth: '180px' }}>{en.courseTitle}</td>
                                                    <td>
                                                        <Badge bg={statusColors[en.status] || 'secondary'}>
                                                            {statusText[en.status] || en.status}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;
