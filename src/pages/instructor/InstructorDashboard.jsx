// [AI Generated Code - Prompt: "InstructorDashboard với bảng khóa học, CRUD, toggle status theo UI Rule Xanh-Trắng"]
import React, { useState, useEffect, useCallback } from 'react';
import {
    Container, Row, Col, Table, Button, Badge,
    Spinner, Alert, Form, Card
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    getCoursesByInstructor,
    deleteCourse,
    toggleCourseStatus,
    createCourse,
    updateCourse,
} from '../../services/courseService';
import { getAllCategories } from '../../services/categoryService';
import CourseForm from '../../components/courses/CourseForm';
import CustomModal from '../../components/shared/CustomModal';

function InstructorDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // CourseForm modal state
    const [showForm, setShowForm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Delete confirm modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    // Success toast
    const [successMsg, setSuccessMsg] = useState('');

    const instructorId = user?.id;

    const loadData = useCallback(async () => {
        if (!instructorId) return;
        setLoading(true);
        setError('');
        try {
            const [coursesData, categoriesData] = await Promise.all([
                getCoursesByInstructor(instructorId),
                getAllCategories(),
            ]);
            setCourses(coursesData);
            setCategories(categoriesData);
        } catch {
            setError('Không thể tải dữ liệu. Vui lòng kiểm tra JSON-Server đang chạy trên cổng 3000.');
        } finally {
            setLoading(false);
        }
    }, [instructorId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const showSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const getCategoryName = (categoryId) => {
        const cat = categories.find(c => c.id === Number(categoryId));
        return cat?.name || '—';
    };

    // Mở form thêm mới
    const handleAddNew = () => {
        setSelectedCourse(null);
        setShowForm(true);
    };

    // Mở form sửa
    const handleEdit = (course) => {
        setSelectedCourse(course);
        setShowForm(true);
    };

    // Submit form (thêm hoặc sửa)
    const handleFormSubmit = async (formData) => {
        if (selectedCourse) {
            await updateCourse(selectedCourse.id, { ...formData, instructorId });
            showSuccess('✅ Cập nhật khóa học thành công!');
        } else {
            await createCourse({ ...formData, instructorId });
            showSuccess('✅ Thêm khóa học mới thành công!');
        }
        await loadData();
    };

    // Mở confirm xóa
    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setShowDeleteModal(true);
    };

    // Xác nhận xóa
    const handleConfirmDelete = async () => {
        if (!courseToDelete) return;
        try {
            await deleteCourse(courseToDelete.id);
            setShowDeleteModal(false);
            setCourseToDelete(null);
            showSuccess('✅ Đã xóa khóa học thành công!');
            await loadData();
        } catch {
            setError('Xóa thất bại. Vui lòng thử lại.');
        }
    };

    // Toggle trạng thái
    const handleToggleStatus = async (course) => {
        try {
            await toggleCourseStatus(course.id, course.status);
            showSuccess(`✅ Đã ${course.status === 'active' ? 'ẩn' : 'hiện'} khóa học.`);
            await loadData();
        } catch {
            setError('Không thể thay đổi trạng thái. Vui lòng thử lại.');
        }
    };

    return (
        <Container className="py-4">
            {/* Page Header */}
            <Row className="align-items-center mb-4">
                <Col>
                    <h1 style={{ color: '#0f52ba', fontWeight: 700, fontSize: '2rem' }}>
                        📚 Dashboard Giảng viên
                    </h1>
                    <p style={{ color: '#64748b', marginBottom: 0 }}>
                        Xin chào, <strong>{user?.name || 'Instructor'}</strong>! Quản lý các khóa học của bạn tại đây.
                    </p>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="primary"
                        onClick={handleAddNew}
                        style={{ fontWeight: 600, borderRadius: '8px', padding: '10px 20px' }}
                    >
                        + Thêm khóa học mới
                    </Button>
                </Col>
            </Row>

            {/* Alerts */}
            {successMsg && <Alert variant="success" className="mb-3">{successMsg}</Alert>}
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            {/* Stats Cards */}
            <Row className="g-3 mb-4">
                <Col md={4}>
                    <Card className="premium-card text-center p-3">
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f52ba' }}>
                            {courses.length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Tổng khóa học</div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="premium-card text-center p-3">
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
                            {courses.filter(c => c.status === 'active').length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Đang hiển thị</div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="premium-card text-center p-3">
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>
                            {courses.filter(c => c.status === 'inactive').length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Đang ẩn</div>
                    </Card>
                </Col>
            </Row>

            {/* Courses Table */}
            <Card className="premium-card">
                <Card.Header
                    style={{
                        background: '#e0f2fe',
                        borderBottom: '2px solid #bfdbfe',
                        borderRadius: '12px 12px 0 0',
                    }}
                >
                    <h5 style={{ margin: 0, color: '#0f172a', fontWeight: 600 }}>
                        Danh sách khóa học của tôi
                    </h5>
                </Card.Header>
                <Card.Body style={{ padding: 0 }}>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" style={{ color: '#0f52ba' }} />
                            <p className="mt-2" style={{ color: '#64748b' }}>Đang tải dữ liệu...</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-5" style={{ color: '#64748b' }}>
                            <div style={{ fontSize: '3rem' }}>📭</div>
                            <p>Bạn chưa có khóa học nào. Hãy thêm khóa học đầu tiên!</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="mb-0" style={{ fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ background: '#f0f7ff' }}>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>#</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Tên khóa học</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Danh mục</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Giá</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Trạng thái</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px' }}>Hiển thị</th>
                                        <th style={{ color: '#0f172a', fontWeight: 600, padding: '12px 16px', textAlign: 'center' }}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, index) => (
                                        <tr key={course.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px 16px', color: '#64748b' }}>{index + 1}</td>
                                            <td style={{ padding: '12px 16px', fontWeight: 500, color: '#0f172a' }}>
                                                {course.title}
                                            </td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <Badge
                                                    pill
                                                    style={{
                                                        background: '#e0f2fe',
                                                        color: '#0f52ba',
                                                        fontWeight: 500,
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    {getCategoryName(course.categoryId)}
                                                </Badge>
                                            </td>
                                            <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 600 }}>
                                                {course.price === 0 ? 'Miễn phí' : `$${course.price}`}
                                            </td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <Badge
                                                    pill
                                                    bg={course.status === 'active' ? 'success' : 'secondary'}
                                                    style={{ fontSize: '0.8rem' }}
                                                >
                                                    {course.status === 'active' ? 'Hiển thị' : 'Đã ẩn'}
                                                </Badge>
                                            </td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <Form.Check
                                                    type="switch"
                                                    id={`toggle-${course.id}`}
                                                    checked={course.status === 'active'}
                                                    onChange={() => handleToggleStatus(course)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </td>
                                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => navigate(`/instructor/courses/${course.id}/students`)}
                                                    style={{ borderRadius: '6px', fontSize: '0.8rem' }}
                                                >
                                                    👥 Học viên
                                                </Button>
                                                <Button
                                                    variant="outline-warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdit(course)}
                                                    style={{ borderRadius: '6px', fontSize: '0.8rem' }}
                                                >
                                                    ✏️ Sửa
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(course)}
                                                    style={{ borderRadius: '6px', fontSize: '0.8rem' }}
                                                >
                                                    🗑️ Xóa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* CourseForm Modal */}
            <CourseForm
                show={showForm}
                onHide={() => setShowForm(false)}
                onSubmit={handleFormSubmit}
                initialData={selectedCourse}
                categories={categories}
            />

            {/* Delete Confirm Modal */}
            <CustomModal
                show={showDeleteModal}
                title="Xác nhận xóa khóa học"
                body={
                    <p>
                        Bạn có chắc chắn muốn xóa khóa học{' '}
                        <strong style={{ color: '#ef4444' }}>"{courseToDelete?.title}"</strong>? Hành động này không thể hoàn tác.
                    </p>
                }
                onConfirm={handleConfirmDelete}
                onCancel={() => { setShowDeleteModal(false); setCourseToDelete(null); }}
                confirmText="Xóa"
                confirmVariant="danger"
            />
        </Container>
    );
}

export default InstructorDashboard;
