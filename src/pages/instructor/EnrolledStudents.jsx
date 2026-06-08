// [AI Generated Code - Prompt: "EnrolledStudents - Danh sách học viên đăng ký khóa học theo UI Rule Xanh-Trắng"]
import React, { useState, useEffect, useCallback } from 'react';
import {
    Container, Row, Col, Table, Badge,
    Spinner, Alert, Card, Form, Button
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCoursesByInstructor } from '../../services/courseService';
import { getStudentsByCourse } from '../../services/enrollmentService';

const STATUS_CONFIG = {
    approved: { label: 'Đã duyệt', bg: '#10b981', text: '#fff' },
    pending:  { label: 'Chờ duyệt', bg: '#f59e0b', text: '#fff' },
    rejected: { label: 'Từ chối',  bg: '#ef4444', text: '#fff' },
};

function EnrolledStudents() {
    const { courseId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(courseId || '');
    const [loading, setLoading] = useState(false);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [error, setError] = useState('');

    // Load danh sách khóa học của instructor
    useEffect(() => {
        if (!user?.id) return;
        setCoursesLoading(true);
        getCoursesByInstructor(user.id)
            .then(data => {
                setCourses(data);
                // Nếu chưa chọn khóa học, mặc định chọn cái đầu tiên
                if (!selectedCourseId && data.length > 0) {
                    setSelectedCourseId(String(data[0].id));
                }
            })
            .catch(() => setError('Không thể tải danh sách khóa học.'))
            .finally(() => setCoursesLoading(false));
    }, [user?.id]);

    // Load học viên khi selectedCourseId thay đổi
    const loadStudents = useCallback(async () => {
        if (!selectedCourseId) return;
        setLoading(true);
        setError('');
        try {
            const data = await getStudentsByCourse(Number(selectedCourseId));
            setStudents(data);
        } catch {
            setError('Không thể tải danh sách học viên.');
        } finally {
            setLoading(false);
        }
    }, [selectedCourseId]);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    const selectedCourseName = courses.find(c => String(c.id) === String(selectedCourseId))?.title || '';

    return (
        <Container className="py-4">
            {/* Page Header */}
            <Row className="align-items-center mb-4">
                <Col>
                    <h1 style={{ color: '#0f52ba', fontWeight: 700, fontSize: '2rem' }}>
                        👥 Danh sách Học viên
                    </h1>
                    <p style={{ color: '#64748b', marginBottom: 0 }}>
                        Xem học viên đã đăng ký các khóa học của bạn.
                    </p>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="outline-primary"
                        onClick={() => navigate('/instructor/dashboard')}
                        style={{ borderRadius: '8px', fontWeight: 500 }}
                    >
                        ← Quay lại Dashboard
                    </Button>
                </Col>
            </Row>

            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            {/* Filter chọn khóa học */}
            <Card className="premium-card mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col sm={4}>
                            <Form.Label style={{ fontWeight: 600, color: '#0f172a' }}>
                                Chọn khóa học:
                            </Form.Label>
                        </Col>
                        <Col sm={8}>
                            {coursesLoading ? (
                                <Spinner animation="border" size="sm" style={{ color: '#0f52ba' }} />
                            ) : (
                                <Form.Select
                                    value={selectedCourseId}
                                    onChange={e => setSelectedCourseId(e.target.value)}
                                    style={{ borderColor: '#cbd5e1', borderRadius: '8px' }}
                                >
                                    <option value="">-- Chọn khóa học --</option>
                                    {courses.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </Form.Select>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Stats */}
            {selectedCourseId && !loading && (
                <Row className="g-3 mb-4">
                    <Col md={4}>
                        <Card className="premium-card text-center p-3">
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f52ba' }}>
                                {students.length}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Tổng đăng ký</div>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="premium-card text-center p-3">
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
                                {students.filter(s => s.enrollmentStatus === 'approved').length}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Đã duyệt</div>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="premium-card text-center p-3">
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>
                                {students.filter(s => s.enrollmentStatus === 'pending').length}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Chờ duyệt</div>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Table */}
            <Card className="premium-card">
                <Card.Header
                    style={{
                        background: '#e0f2fe',
                        borderBottom: '2px solid #bfdbfe',
                        borderRadius: '12px 12px 0 0',
                    }}
                >
                    <h5 style={{ margin: 0, color: '#0f172a', fontWeight: 600 }}>
                        {selectedCourseName
                            ? `Học viên — ${selectedCourseName}`
                            : 'Chọn khóa học để xem danh sách học viên'}
                    </h5>
                </Card.Header>
                <Card.Body style={{ padding: 0 }}>
                    {!selectedCourseId ? (
                        <div className="text-center py-5" style={{ color: '#64748b' }}>
                            <div style={{ fontSize: '3rem' }}>🎓</div>
                            <p>Vui lòng chọn khóa học ở trên.</p>
                        </div>
                    ) : loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" style={{ color: '#0f52ba' }} />
                            <p className="mt-2" style={{ color: '#64748b' }}>Đang tải...</p>
                        </div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-5" style={{ color: '#64748b' }}>
                            <div style={{ fontSize: '3rem' }}>📭</div>
                            <p>Chưa có học viên nào đăng ký khóa học này.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="mb-0" style={{ fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ background: '#f0f7ff' }}>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>#</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Họ tên</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Email</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((s, index) => {
                                        const statusCfg = STATUS_CONFIG[s.enrollmentStatus] || { label: s.enrollmentStatus, bg: '#94a3b8', text: '#fff' };
                                        return (
                                            <tr key={s.enrollmentId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{index + 1}</td>
                                                <td style={{ padding: '12px 16px', fontWeight: 500, color: '#0f172a' }}>
                                                    {s.studentName}
                                                </td>
                                                <td style={{ padding: '12px 16px', color: '#64748b' }}>
                                                    {s.studentEmail}
                                                </td>
                                                <td style={{ padding: '12px 16px' }}>
                                                    <Badge
                                                        pill
                                                        style={{
                                                            background: statusCfg.bg,
                                                            color: statusCfg.text,
                                                            fontSize: '0.8rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {statusCfg.label}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EnrolledStudents;
