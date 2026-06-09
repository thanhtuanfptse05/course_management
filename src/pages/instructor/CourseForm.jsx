// [AI Generated Code - Prompt: "CourseForm: Form Thêm/Sửa khóa học"]
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { mockDb } from '../../data/mockDb';

const CourseForm = ({ course }) => {
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    description: ''
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        categoryId: course.categoryId,
        description: course.description
      });
    }
  }, [course]);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium text-navy">Tên khóa học</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          placeholder="Nhập tên khóa học"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-medium text-navy">Danh mục</Form.Label>
        <Form.Select 
          value={formData.categoryId}
          onChange={e => setFormData({...formData, categoryId: e.target.value})}
        >
          <option value="">Chọn danh mục</option>
          {mockDb.categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Form.Select>
      </Form.Group>



      <Form.Group className="mb-3">
        <Form.Label className="fw-medium text-navy">Mô tả chi tiết</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={4}
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          placeholder="Mô tả nội dung khóa học..."
        />
      </Form.Group>
    </Form>
  );
};

export default CourseForm;
