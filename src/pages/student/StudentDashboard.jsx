// [AI Generated Code - Prompt: "Tạo cấu trúc component Class cho StudentDashboard, áp dụng Badges trạng thái, Progress Bar và Cancel button"]

import React from 'react';
import { Container, Row, Col, Badge, ProgressBar, Button } from 'react-bootstrap';
import './StudentDashboard.css';

// 1. Component Thông tin hồ sơ (Phần phụ)
class StudentProfileSummary extends React.Component {
    render() {
        return (
            <div className="profile-summary-card">
                <h4>Alice Student</h4>
                <p>student1@fpt.edu.vn</p>
                <p><strong>2</strong> Enrolled Courses</p>
            </div>
        );
    }
}

// 2. Component Danh sách khóa học dạng Card (Phần chính)
class EnrolledCourseList extends React.Component {
    render() {
        // Dữ liệu giả lập
        const mockEnrolledCourses = [
            {
                id: 1,
                courseName: 'ReactJS Fundamentals',
                status: 'approved',
                progress: 50
            },
            {
                id: 2,
                courseName: 'Advanced Next.js & TypeScript',
                status: 'pending',
                progress: 0
            },
            {
                id: 4,
                courseName: 'Figma for UI/UX Designers',
                status: 'rejected',
                progress: 0
            }
        ];

        return (
            <Row xs={1} md={2} lg={3} className="g-4">
                {mockEnrolledCourses.map((enrollment) => (
                    <Col key={enrollment.id}>
                        <div className="premium-card d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5>{enrollment.courseName}</h5>
                                <Badge
                                    bg={
                                        enrollment.status === 'approved' ? 'success'
                                        : enrollment.status === 'pending' ? 'warning'
                                        : 'danger'
                                    }
                                    className="badge-status"
                                >
                                    {enrollment.status.toUpperCase()}
                                </Badge>
                            </div>

                            {/* Chỉ hiển thị Progress bar nếu Approved */}
                            {enrollment.status === 'approved' && (
                                <div className="mt-3">
                                    <small className="text-muted d-block mb-1">Learning Progress: {enrollment.progress}%</small>
                                    <ProgressBar now={enrollment.progress} className="progress" />
                                </div>
                            )}

                            {/* Cảnh báo nếu Rejected */}
                            {enrollment.status === 'rejected' && (
                                <div className="mt-3">
                                    <small className="text-danger">Your enrollment was declined.</small>
                                </div>
                            )}

                            {/* Nút hủy đăng ký nếu khóa học chưa hoàn thành 100% */}
                            {enrollment.progress < 100 && enrollment.status !== 'rejected' && (
                                <div className="mt-auto pt-3">
                                    <Button size="sm" className="btn-cancel-enrollment w-100">
                                        Cancel Enrollment
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Col>
                ))}
            </Row>
        );
    }
}

// 3. Layout Chính cho Student Dashboard
class StudentDashboard extends React.Component {
    render() {
        return (
            <div className="student-container">
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <h2 className="page-title">My Courses</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <StudentProfileSummary />
                        </Col>
                        <Col md={9}>
                            <EnrolledCourseList />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default StudentDashboard;
