// [AI Generated Code - Prompt: "Tạo ManageCategories hỗ trợ CRUD danh mục khóa học bằng React-Bootstrap Modal, SearchBar và phân trang, có thông báo thành công/lỗi"]
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from '../../components/layout/Sidebar';
import categoryService from '../../services/categoryService';
import SearchBar from '../../components/shared/SearchBar';
import Pagination from '../../components/shared/Pagination';
import CustomModal from '../../components/shared/CustomModal';
import Loading from '../../components/common/Loading';

function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);

    // Search and pagination state
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Tải dữ liệu danh mục
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAll();
            setCategories(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Không thể tải danh sách danh mục.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Hiển thị thông báo tạm thời
    const showAlert = (message, variant = 'success') => {
        setAlertMsg({ message, variant });
        setTimeout(() => setAlertMsg(null), 3000);
    };

    // Thêm danh mục
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        try {
            setActionLoading(true);
            await categoryService.create({ name: categoryName.trim() });
            showAlert('Thêm danh mục mới thành công!');
            setCategoryName('');
            setShowAddModal(false);
            fetchCategories();
        } catch (err) {
            console.error(err);
            showAlert('Không thể thêm danh mục.', 'danger');
        } finally {
            setActionLoading(false);
        }
    };

    // Mở modal sửa danh mục
    const openEditModal = (cat) => {
        setSelectedCategory(cat);
        setCategoryName(cat.name);
        setShowEditModal(true);
    };

    // Sửa danh mục
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim() || !selectedCategory) return;

        try {
            setActionLoading(true);
            await categoryService.update(selectedCategory.id, { name: categoryName.trim() });
            showAlert('Cập nhật danh mục thành công!');
            setCategoryName('');
            setSelectedCategory(null);
            setShowEditModal(false);
            fetchCategories();
        } catch (err) {
            console.error(err);
            showAlert('Không thể cập nhật danh mục.', 'danger');
        } finally {
            setActionLoading(false);
        }
    };

    // Mở modal xóa
    const openDeleteModal = (cat) => {
        setSelectedCategory(cat);
        setShowDeleteModal(true);
    };

    // Xóa danh mục
    const handleDelete = async () => {
        if (!selectedCategory) return;

        try {
            setActionLoading(true);
            await categoryService.delete(selectedCategory.id);
            showAlert('Xóa danh mục thành công!');
            setSelectedCategory(null);
            setShowDeleteModal(false);
            fetchCategories();
        } catch (err) {
            console.error(err);
            showAlert('Không thể xóa danh mục.', 'danger');
        } finally {
            setActionLoading(false);
        }
    };

    // Lọc danh mục theo tìm kiếm
    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const currentItems = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset về trang 1 khi gõ tìm kiếm
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <Container className="py-4 flex-grow-1">
                    <Row className="gx-4">
                        <Col lg={3} md={4} className="mb-4">
                            <Sidebar />
                        </Col>
                        <Col lg={9} md={8}>
                            <Loading message="Đang tải danh sách danh mục..." />
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="py-4 flex-grow-1">
                <Row className="gx-4">
                    <Col lg={3} md={4} className="mb-4">
                        <Sidebar />
                    </Col>
                    <Col lg={9} md={8}>
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                            <div>
                                <h1 className="fw-bold text-navy mb-1" style={{ fontSize: '1.85rem' }}>Quản lý Danh mục</h1>
                                <p className="text-muted mb-0">Quản lý các phân loại khóa học hiện có trên hệ thống.</p>
                            </div>
                            <Button 
                                variant="primary" 
                                onClick={() => {
                                    setCategoryName('');
                                    setShowAddModal(true);
                                }}
                                className="fw-semibold px-4 rounded-3 d-flex align-items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                </svg>
                                <span>Thêm danh mục</span>
                            </Button>
                        </div>

                        {alertMsg && (
                            <Alert variant={alertMsg.variant} dismissible onClose={() => setAlertMsg(null)}>
                                {alertMsg.message}
                            </Alert>
                        )}

                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* Bộ lọc & Tìm kiếm */}
                        <div className="bg-white p-3 rounded-3 shadow-sm mb-4">
                            <SearchBar 
                                value={searchQuery} 
                                onChange={handleSearchChange} 
                                placeholder="Tìm kiếm danh mục..." 
                            />
                        </div>

                        {/* Bảng dữ liệu */}
                        <div className="bg-white rounded-3 shadow-sm overflow-hidden">
                            <div className="table-responsive">
                                <Table className="admin-table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '80px' }}>STT</th>
                                            <th>Tên danh mục</th>
                                            <th className="text-end" style={{ width: '200px' }}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center py-4 text-muted">
                                                    Không tìm thấy danh mục nào.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentItems.map((cat, index) => (
                                                <tr key={cat.id}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td className="fw-semibold text-navy">{cat.name}</td>
                                                    <td className="text-end">
                                                        <Button 
                                                            variant="outline-primary" 
                                                            size="sm" 
                                                            className="me-2 rounded-3"
                                                            onClick={() => openEditModal(cat)}
                                                        >
                                                            Sửa
                                                        </Button>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm" 
                                                            className="rounded-3"
                                                            onClick={() => openDeleteModal(cat)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        {/* Phân trang */}
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={setCurrentPage} 
                        />
                    </Col>
                </Row>
            </Container>

            {/* Modal Thêm */}
            <CustomModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                title="Thêm danh mục mới"
                onConfirm={handleAdd}
                confirmText="Thêm mới"
                loading={actionLoading}
            >
                <Form onSubmit={handleAdd}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-navy">Tên danh mục</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Nhập tên danh mục (Ví dụ: Web Development)"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </CustomModal>

            {/* Modal Sửa */}
            <CustomModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                title="Chỉnh sửa danh mục"
                onConfirm={handleEdit}
                confirmText="Cập nhật"
                loading={actionLoading}
            >
                <Form onSubmit={handleEdit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-navy">Tên danh mục</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Nhập tên danh mục"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </CustomModal>

            {/* Modal Xóa */}
            <CustomModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Xác nhận xóa danh mục"
                onConfirm={handleDelete}
                confirmText="Xóa danh mục"
                confirmVariant="danger"
                loading={actionLoading}
            >
                <p className="mb-0 text-navy">
                    Bạn có chắc chắn muốn xóa danh mục <strong className="text-danger">"{selectedCategory?.name}"</strong> không? 
                    Hành động này không thể hoàn tác.
                </p>
            </CustomModal>
            <Footer />
        </div>
    );
}

export default ManageCategories;
