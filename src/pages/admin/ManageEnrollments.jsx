// [AI Generated Code - Prompt: "Tạo cấu trúc component Class cho ManageEnrollments gồm Filter, Table và Layout chính, sử dụng CSS riêng"]

import React from 'react';
import { Container, Row, Col, Table, Badge, Button, Form } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from '../../components/layout/Sidebar';
import './ManageEnrollments.css';

// 1. Component Filter (Điều hướng / Lọc dữ liệu)
class EnrollmentFilter extends React.Component {
    render() {
        return (
            <div className="mb-4">
                <h4 className="page-title">Manage Enrollments</h4>
                <Form.Group style={{ maxWidth: '300px' }}>
                    <Form.Label>Filter by Status</Form.Label>
                    <Form.Select>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </Form.Select>
                </Form.Group>
            </div>
        );
    }
}

// 2. Component Table (Bảng danh sách và các nút Approve/Reject)
class EnrollmentTable extends React.Component {
    render() {
        // Dữ liệu giả lập (Mock data tương tự db.json) để dễ hiểu
        const mockEnrollments = [
            { id: 1, studentName: 'Alice Student', courseName: 'ReactJS Fundamentals', status: 'pending' },
            { id: 2, studentName: 'Bob Student', courseName: 'Figma for UI/UX Designers', status: 'pending' }
        ];

        return (
            <div className="table-enrollments">
                <Table hover responsive className="mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Course Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockEnrollments.map((enrollment) => (
                            <tr key={enrollment.id}>
                                <td>{enrollment.id}</td>
                                <td>{enrollment.studentName}</td>
                                <td>{enrollment.courseName}</td>
                                <td>
                                    <Badge bg="warning" text="dark">{enrollment.status.toUpperCase()}</Badge>
                                </td>
                                <td>
                                    <Button size="sm" className="btn-approve me-2">
                                        Approve
                                    </Button>
                                    <Button size="sm" className="btn-reject">
                                        Reject
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

// 3. Component Layout Chính (Content) bao bọc các Component con
class ManageEnrollments extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <Container className="py-4 flex-grow-1">
                    <Row className="gx-4">
                        <Col lg={3} md={4} className="mb-4">
                            <Sidebar />
                        </Col>
                        <Col lg={9} md={8}>
                            <div className="enrollments-container">
                                {/* Gọi Component Filter */}
                                <EnrollmentFilter />
                                {/* Gọi Component Table */}
                                <EnrollmentTable />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default ManageEnrollments;
