// [AI Generated Code - Prompt: "CourseForm Modal Thêm/Sửa khóa học theo UI Rule Xanh-Trắng FER202"]
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import FormField from '../shared/FormField';

const EMPTY_FORM = {
    title: '',
    description: '',
    price: 0,
    categoryId: '',
    status: 'active',
};

function CourseForm({ show, onHide, onSubmit, initialData = null, categories = [] }) {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const isEditMode = !!initialData;

    useEffect(() => {
        if (show) {
            setFormData(initialData ? { ...initialData } : EMPTY_FORM);
            setErrors({});
            setSubmitError('');
        }
    }, [show, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Tên khóa học không được để trống.';
        if (formData.price < 0) newErrors.price = 'Giá không được âm.';
        if (!formData.categoryId) newErrors.categoryId = 'Vui lòng chọn danh mục.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        setSubmitError('');
        try {
            await onSubmit({ ...formData, categoryId: Number(formData.categoryId) });
            onHide();
        } catch {
            setSubmitError('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));
    const statusOptions = [
        { value: 'active', label: 'Đang hiển thị' },
        { value: 'inactive', label: 'Ẩn' },
    ];

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header
                closeButton
                style={{ background: '#f0f7ff', borderBottom: '2px solid #e0f2fe' }}
            >
                <Modal.Title style={{ color: '#0f52ba', fontWeight: 700 }}>
                    {isEditMode ? '✏️ Chỉnh sửa khóa học' : '➕ Thêm khóa học mới'}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body style={{ padding: '1.5rem' }}>
                    {submitError && (
                        <Alert variant="danger" className="mb-3">
                            {submitError}
                        </Alert>
                    )}

                    <FormField
                        label="Tên khóa học"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="VD: ReactJS Fundamentals"
                        required
                        validationMessage={errors.title}
                    />

                    <FormField
                        type="textarea"
                        label="Mô tả"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Mô tả ngắn gọn về nội dung khóa học..."
                        rows={3}
                    />

                    <FormField
                        type="number"
                        label="Giá (USD)"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0"
                        required
                        validationMessage={errors.price}
                    />

                    <FormField
                        type="select"
                        label="Danh mục"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        options={categoryOptions}
                        required
                        validationMessage={errors.categoryId}
                    />

                    <FormField
                        type="select"
                        label="Trạng thái"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={statusOptions}
                    />
                </Modal.Body>

                <Modal.Footer style={{ borderTop: '1px solid #e2e8f0' }}>
                    <Button variant="outline-secondary" onClick={onHide} disabled={loading}>
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        style={{ minWidth: '120px' }}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Đang lưu...
                            </>
                        ) : isEditMode ? 'Lưu thay đổi' : 'Thêm khóa học'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CourseForm;
