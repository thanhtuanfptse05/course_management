// [AI Generated Code - Prompt: "Thiết kế Modal tái sử dụng chứa Form"]
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, onHide, title, children, onSave, saveText = "Lưu" }) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fs-5 fw-bold text-navy">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Hủy bỏ
        </Button>
        {onSave && (
          <Button variant="primary" onClick={onSave}>
            {saveText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
