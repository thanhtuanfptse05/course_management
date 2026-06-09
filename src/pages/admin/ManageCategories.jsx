// [AI Generated Code - Prompt: "ManageCategories: Quản lý danh mục khóa học (Bảng danh sách + Form)"]
import React, { useState } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';
import CustomModal from '../../components/CustomModal';

const ManageCategories = () => {
  const [categories] = useState(mockDb.categories);
  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const handleShowModal = (cat = null) => {
    setSelectedCat(cat);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-navy mb-0">Quản lý Danh mục</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          + Thêm danh mục
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="table-premium mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Tên Danh mục</th>
                <th className="px-4 py-3">Mô tả</th>
                <th className="px-4 py-3 text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className="align-middle">
                  <td className="px-4 py-3 text-muted">#{cat.id}</td>
                  <td className="px-4 py-3 fw-medium text-navy">{cat.name}</td>
                  <td className="px-4 py-3 text-muted">{cat.description}</td>
                  <td className="px-4 py-3 text-end">
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowModal(cat)}>
                      Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <CustomModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        title={selectedCat ? "Sửa danh mục" : "Thêm danh mục"}
        onSave={() => setShowModal(false)}
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium text-navy">Tên danh mục</Form.Label>
            <Form.Control type="text" defaultValue={selectedCat?.name} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium text-navy">Mô tả</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={selectedCat?.description} />
          </Form.Group>
        </Form>
      </CustomModal>
    </>
  );
};

export default ManageCategories;
