// [AI Generated Code - Prompt: "Tạo component CourseCard hiển thị thẻ khóa học với ảnh thumbnail, badge danh mục, tên khóa học, giảng viên, giá và nút Xem chi tiết. Áp dụng hiệu ứng hover premium-card theo ui-rule.md"]

import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CourseCard.css';

/**
 * CourseCard — Thẻ hiển thị thông tin tóm tắt một khóa học
 * @param {Object} course - { id, title, category, price, instructorName, thumbnail }
 */
function CourseCard({ course }) {
    const { id, title, category, price, instructorName, thumbnail } = course;

    return (
        <Card className="h-100 premium-card border-0 course-card-wrapper">
            {/* Ảnh thumbnail khóa học */}
            <div className="course-card-img-wrapper">
                <Card.Img
                    variant="top"
                    src={thumbnail || `https://placehold.co/400x220/0f52ba/ffffff?text=${encodeURIComponent(title)}`}
                    alt={`Ảnh khóa học ${title}`}
                    className="course-card-img"
                />
                {/* Badge danh mục nằm trên ảnh */}
                <Badge className="course-card-badge">{category}</Badge>
            </div>

            <Card.Body className="d-flex flex-column px-3 pt-3 pb-2">
                {/* Tên khóa học */}
                <Card.Title className="course-card-title mb-2">
                    {title}
                </Card.Title>

                {/* Thông tin giảng viên */}
                <div className="course-card-instructor mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="me-1 mb-1" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.029 10 8 10c-2.03 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    <span>{instructorName || 'Chưa có giảng viên'}</span>
                </div>

                {/* Khu vực giá + nút — tự đẩy xuống cuối card */}
                <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span className="course-card-price">
                        {price || 'Miễn phí'}
                    </span>
                    <Button
                        as={Link}
                        to={`/courses/${id}`}
                        variant="outline-primary"
                        size="sm"
                        className="course-card-btn"
                    >
                        Xem chi tiết
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CourseCard;
