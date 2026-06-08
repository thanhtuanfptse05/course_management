// [AI Generated Code - Prompt: "Tạo ManageUsers hiển thị danh sách người dùng, cho phép tìm kiếm, lọc theo vai trò, phân trang và Khóa/Mở khóa tài khoản có modal xác nhận"]
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Badge, Row, Col, Alert } from 'react-bootstrap';
import userService from '../../services/userService';
import SearchBar from '../../components/shared/SearchBar';
import Pagination from '../../components/shared/Pagination';
import CustomModal from '../../components/shared/CustomModal';
import Loading from '../../components/common/Loading';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);

    // Search, filter, pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Modal state
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAll();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Không thể tải danh sách người dùng.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showAlert = (message, variant = 'success') => {
        setAlertMsg({ message, variant });
        setTimeout(() => setAlertMsg(null), 3000);
    };

    // Mở modal thay đổi trạng thái
    const openStatusModal = (user) => {
        setSelectedUser(user);
        setShowStatusModal(true);
    };

    // Thực hiện khóa/mở khóa
    const handleToggleStatus = async () => {
        if (!selectedUser) return;
        const newStatus = !selectedUser.isActive;

        try {
            setActionLoading(true);
            await userService.toggleActive(selectedUser.id, newStatus);
            showAlert(`${newStatus ? 'Mở khóa' : 'Khóa'} tài khoản "${selectedUser.name}" thành công!`);
            setShowStatusModal(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (err) {
            console.error(err);
            showAlert('Không thể thay đổi trạng thái tài khoản.', 'danger');
        } finally {
            setActionLoading(false);
        }
    };

    // Xử lý tìm kiếm và lọc
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleRoleFilterChange = (e) => {
        setRoleFilter(e.target.value);
        setCurrentPage(1);
    };

    // Lọc danh sách users
    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    // Phân trang
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentItems = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <Loading message="Đang tải dữ liệu tài khoản..." />;

    // Map role badges
    const roleBadges = {
        admin: { bg: 'primary-light', text: 'primary-blue', label: 'Quản trị viên' },
        instructor: { bg: 'warning-light', text: 'warning-yellow', label: 'Giảng viên' },
        student: { bg: 'success-light', text: 'success-green', label: 'Học viên' }
    };

    return (
        <Container className="py-4">
            <div className="mb-4">
                <h1 className="fw-bold text-navy mb-1" style={{ fontSize: '1.85rem' }}>Quản lý Tài khoản</h1>
                <p className="text-muted mb-0">Quản lý và điều chỉnh quyền truy cập của người dùng trên toàn hệ thống.</p>
            </div>

            {alertMsg && (
                <Alert variant={alertMsg.variant} dismissible onClose={() => setAlertMsg(null)}>
                    {alertMsg.message}
                </Alert>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Filter toolbar */}
            <Row className="bg-white p-3 rounded-3 shadow-sm mb-4 g-3 align-items-center">
                <Col xs={12} md={6}>
                    <SearchBar 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                        placeholder="Tìm theo tên hoặc email..." 
                    />
                </Col>
                <Col xs={12} md={6} className="d-flex justify-content-md-end">
                    <Form.Group className="d-flex align-items-center mb-0" style={{ minWidth: '220px' }}>
                        <Form.Label className="me-2 mb-0 fw-semibold text-muted text-nowrap" style={{ fontSize: '0.875rem' }}>Vai trò:</Form.Label>
                        <Form.Select 
                            value={roleFilter} 
                            onChange={handleRoleFilterChange}
                            className="rounded-3"
                        >
                            <option value="all">Tất cả</option>
                            <option value="admin">Quản trị viên</option>
                            <option value="instructor">Giảng viên</option>
                            <option value="student">Học viên</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            {/* Bảng danh sách */}
            <div className="bg-white rounded-3 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <Table className="admin-table align-middle mb-0">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>STT</th>
                                <th>Họ và tên</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Trạng thái</th>
                                <th className="text-end" style={{ width: '180px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-muted">
                                        Không tìm thấy người dùng phù hợp.
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((user, index) => {
                                    const roleInfo = roleBadges[user.role] || { bg: 'secondary', text: 'white', label: user.role };
                                    return (
                                        <tr key={user.id}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="fw-semibold text-navy">{user.name}</td>
                                            <td className="text-secondary">{user.email}</td>
                                            <td>
                                                <span 
                                                    className={`px-3 py-1 rounded-pill fw-bold text-uppercase ${roleInfo.bg} ${roleInfo.text}`}
                                                    style={{ fontSize: '0.75rem' }}
                                                >
                                                    {roleInfo.label}
                                                </span>
                                            </td>
                                            <td>
                                                <Badge bg={user.isActive !== false ? 'success' : 'danger'}>
                                                    {user.isActive !== false ? 'Hoạt động' : 'Đã khóa'}
                                                </Badge>
                                            </td>
                                            <td className="text-end">
                                                {user.role === 'admin' ? (
                                                    <span className="text-muted small">Không được thao tác</span>
                                                ) : (
                                                    <Button 
                                                        variant={user.isActive !== false ? 'outline-danger' : 'outline-success'} 
                                                        size="sm" 
                                                        className="rounded-3 px-3 fw-semibold"
                                                        onClick={() => openStatusModal(user)}
                                                    >
                                                        {user.isActive !== false ? 'Khóa' : 'Mở khóa'}
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
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

            {/* Modal Xác nhận Khóa / Mở khóa */}
            <CustomModal
                show={showStatusModal}
                onHide={() => setShowStatusModal(false)}
                title={selectedUser?.isActive !== false ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở khóa tài khoản'}
                onConfirm={handleToggleStatus}
                confirmText={selectedUser?.isActive !== false ? 'Khóa tài khoản' : 'Mở khóa'}
                confirmVariant={selectedUser?.isActive !== false ? 'danger' : 'success'}
                loading={actionLoading}
            >
                <p className="mb-0 text-navy">
                    Bạn có chắc chắn muốn {selectedUser?.isActive !== false ? <strong className="text-danger">Khóa</strong> : <strong className="text-success">Mở khóa</strong>} tài khoản của người dùng <strong>"{selectedUser?.name}"</strong> ({selectedUser?.email}) không?
                </p>
            </CustomModal>
        </Container>
    );
}

export default ManageUsers;
