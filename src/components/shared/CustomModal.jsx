// [AI Generated Code - Prompt: "Tạo CustomModal component tái sử dụng bằng React-Bootstrap Modal, hỗ trợ tiêu đề, nội dung body hoặc children, nút xác nhận, trạng thái loading, tương thích các prop onCancel/onHide"]
import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

function CustomModal({
    show,
    title,
    body,
    children,
    onConfirm,
    onCancel,
    onHide,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    confirmVariant = 'primary',
    loading = false,
    size = 'md'
}) {
    const handleCancel = onCancel || onHide;
    const modalContent = children || body;

    return (
        <Modal show={show} onHide={handleCancel} size={size} centered className="premium-modal">
            <Modal.Header closeButton style={{ borderBottom: '2px solid #e0f2fe' }}>
                <Modal.Title className="fw-bold fs-5 text-navy">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
                {modalContent}
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '1px solid #e2e8f0' }}>
                <Button 
                    variant="outline-secondary" 
                    onClick={handleCancel} 
                    disabled={loading}
                    className="fw-semibold px-4 rounded-3"
                >
                    {cancelText || 'Hủy'}
                </Button>
                {onConfirm && (
                    <Button 
                        variant={confirmVariant} 
                        onClick={onConfirm} 
                        disabled={loading}
                        className="fw-semibold px-4 rounded-3 d-flex align-items-center gap-2"
                    >
                        {loading && <Spinner animation="border" size="sm" />}
                        <span>{confirmText}</span>
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;
