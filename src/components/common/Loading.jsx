// [AI Generated Code - Prompt: "Tạo Loading component hiển thị Spinner ở trung tâm màn hình bằng Tiếng Việt sử dụng React-Bootstrap"]

import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center">
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} className="mb-3" />
        <h5 className="text-muted">Đang tải dữ liệu, vui lòng đợi...</h5>
      </div>
    </div>
  );
}

export default Loading;
