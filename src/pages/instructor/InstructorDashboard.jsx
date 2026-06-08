// [AI Generated Code - Prompt: "Thiết kế trang InstructorDashboard bằng Tiếng Việt với grid và Sidebar phân quyền cho Giảng viên, tích hợp CRUD khóa học thật từ JSON-Server qua các dịch vụ courseService và categoryService"]

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
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from '../../components/layout/Sidebar';

function InstructorDashboard() {
    const { currentUser } = useAuth();
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

    const instructorId = currentUser?.id;

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
        try {
            if (selectedCourse) {
                await updateCourse(selectedCourse.id, { ...formData, instructorId });
                showSuccess('✅ Cập nhật khóa học thành công!');
            } else {
                await createCourse({ ...formData, instructorId });
                showSuccess('✅ Thêm khóa học mới thành công!');
            }
            setShowForm(false);
            await loadData();
        } catch {
            setError('Thao tác thất bại. Vui lòng thử lại.');
        }
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
                        {/* Page Header */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h1 className="h2 fw-bold text-navy mb-1">
                                    Chào mừng giảng viên, {currentUser?.name || 'Giảng viên'}
                                </h1>
                                <p className="text-muted small mb-0">
                                    Quản lý khóa học, bài học và theo dõi học sinh của bạn
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                onClick={handleAddNew}
                                className="d-flex align-items-center gap-2"
                            >
                                <i className="bi bi-plus-lg"></i>
                                <span>Tạo Khóa Học Mới</span>
                            </Button>
                        </div>

                        {/* Alerts */}
                        {successMsg && <Alert variant="success" className="mb-3">{successMsg}</Alert>}
                        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                        {/* Stats Cards */}
                        <Row className="g-4 mb-4">
                            <Col sm={6} lg={4}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-journal-bookmark text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">{courses.length}</h2>
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
                                        <h2 className="fw-bold mb-1">
                                            {courses.filter(c => c.status === 'active').length}
                                        </h2>
                                        <p className="text-muted small mb-0">Đang hoạt động</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6} lg={4}>
                                <Card className="premium-card h-100 text-center p-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-inline-flex p-3 bg-light-blue rounded-circle mb-3">
                                            <i className="bi bi-star text-primary fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">
                                            {courses.filter(c => c.status === 'inactive').length}
                                        </h2>
                                        <p className="text-muted small mb-0">Đang ẩn</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* Courses Table Card */}
                        <Card className="premium-card shadow-sm border-0 mb-4">
                            <Card.Body className="p-0">
                                <div className="p-4 border-bottom">
                                    <h5 className="fw-bold text-navy mb-0">Danh Sách Lớp Học Đang Giảng Dạy</h5>
                                </div>

                                {loading ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" style={{ color: '#0f52ba' }} />
                                        <p className="mt-2 text-muted small">Đang tải dữ liệu...</p>
                                    </div>
                                ) : courses.length === 0 ? (
                                    <div className="text-center py-5 text-muted">
                                        <div className="fs-1">📭</div>
                                        <p className="small mt-2">Bạn chưa có khóa học nào. Hãy thêm khóa học đầu tiên!</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <Table hover className="premium-table mb-0" striped>
                                            <thead>
                                                <tr>
                                                    <th>Tên Khóa Học</th>
                                                    <th>Danh Mục</th>
                                                    <th>Giá</th>
                                                    <th>Trạng Thái</th>
                                                    <th>Hiển thị</th>
                                                    <th>Thao Tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {courses.map((course) => (
                                                    <tr key={course.id}>
                                                        <td>
                                                            <strong className="text-dark">{course.title}</strong>
                                                        </td>
                                                        <td>
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
                                                        <td>
                                                            <strong style={{ color: '#10b981' }}>
                                                                {course.price === 0 || course.price === 'Free' ? 'Miễn phí' : `${course.price.toLocaleString('vi-VN')}đ`}
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <span className={`badge ${course.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                                                {course.status === 'active' ? 'Hoạt động' : 'Bản nháp/Ẩn'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                type="switch"
                                                                id={`toggle-${course.id}`}
                                                                checked={course.status === 'active'}
                                                                onChange={() => handleToggleStatus(course)}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => navigate(`/instructor/courses/${course.id}/students`)}
                                                            >
                                                                <i className="bi bi-people me-1"></i>Học viên
                                                            </Button>
                                                            <Button
                                                                variant="outline-warning"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => handleEdit(course)}
                                                            >
                                                                <i className="bi bi-pencil me-1"></i>Sửa
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleDeleteClick(course)}
                                                            >
                                                                <i className="bi bi-trash me-1"></i>Xóa
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
                    </Col>
                </Row>
            </Container>

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

            <Footer />
        </div>
    );
}

export default InstructorDashboard;
