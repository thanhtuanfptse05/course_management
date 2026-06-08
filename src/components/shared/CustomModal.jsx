// [AI Generated Code - Prompt: "shared/CustomModal.jsx hỗ trợ prop size cho Modal Bootstrap"]
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CustomModal({
    show,
    title,
    body,
    onConfirm,
    onCancel,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    confirmVariant = 'primary',
    size = undefined,
}) {
    return (
        <Modal show={show} onHide={onCancel} centered size={size}>
            <Modal.Header closeButton style={{ borderBottom: '2px solid #e0f2fe' }}>
                <Modal.Title style={{ color: '#0f172a', fontWeight: 600 }}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer style={{ borderTop: '1px solid #e2e8f0' }}>
                <Button variant="outline-secondary" onClick={onCancel}>
                    {cancelText}
                </Button>
                <Button variant={confirmVariant} onClick={onConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;
