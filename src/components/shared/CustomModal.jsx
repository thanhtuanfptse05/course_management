// [AI Generated Code - Prompt: "Tạo CustomModal component tái sử dụng bằng React-Bootstrap Modal, hỗ trợ tiêu đề, nội dung, nút xác nhận, trạng thái loading"]
import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

function CustomModal({
    show,
    onHide,
    title,
    children,
    onConfirm,
    confirmText = 'Xác nhận',
    confirmVariant = 'primary',
    loading = false,
    size = 'md'
}) {
    return (
        <Modal show={show} onHide={onHide} size={size} centered className="premium-modal">
            <Modal.Header closeButton className="border-bottom-0 pb-0">
                <Modal.Title className="fw-bold fs-5 text-navy">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
                {children}
            </Modal.Body>
            <Modal.Footer className="border-top-0 pt-0">
                <Button 
                    variant="light" 
                    onClick={onHide} 
                    disabled={loading}
                    className="fw-semibold px-4 rounded-3"
                >
                    Hủy bỏ
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
