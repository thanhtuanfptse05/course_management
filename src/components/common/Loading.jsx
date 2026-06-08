// [AI Generated Code - Prompt: "Tạo Loading component hiển thị Spinner quay tròn sử dụng React-Bootstrap, màu xanh chủ đạo"]
import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading({ message = 'Đang tải dữ liệu...' }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <Spinner 
                animation="border" 
                role="status" 
                style={{ color: 'var(--primary-blue, #0f52ba)', width: '3rem', height: '3rem' }}
                className="mb-3"
            />
            <span className="text-muted fw-semibold">{message}</span>
        </div>
    );
}

export default Loading;
