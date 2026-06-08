// [AI Generated Code - Prompt: "Tạo NotFound page hiển thị thông báo lỗi 404 và nút quay lại trang chủ bằng Tiếng Việt"]

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 text-center py-5">
      <div className="p-5 bg-white rounded shadow-sm border" style={{ maxWidth: '500px' }}>
        <h1 className="display-1 text-primary fw-bold mb-3">404</h1>
        <h3 className="fw-semibold text-dark mb-3">Không Tìm Thấy Trang</h3>
        <p className="text-secondary mb-4">
          Đường dẫn bạn truy cập có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng trên hệ thống.
        </p>
        <Button as={Link} to="/" variant="primary" className="px-4">
          <i className="bi bi-house-door me-2"></i>Quay lại Trang Chủ
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
