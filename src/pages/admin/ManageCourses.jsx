// [AI Generated Code - Prompt: "Tạo component ManageCourses chia nhỏ gồm CourseSummary và CourseTable"]

import React from 'react';
import { Container, Row, Col, Table, Badge, Button } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from '../../components/layout/Sidebar';
import './ManageCourses.css';

// 1. Component Thống kê
class CourseSummary extends React.Component {
    render() {
        return (
            <div className="course-summary-card">
                <h3>12</h3>
                <p>Total Courses</p>
            </div>
        );
    }
}

// 2. Component Bảng quản lý
class CourseTable extends React.Component {
    render() {
        const mockCourses = [
            { id: 101, title: 'ReactJS Basics', instructor: 'John Doe', price: 0, status: 'pending' },
            { id: 102, title: 'Advanced CSS', instructor: 'Jane Smith', price: 49, status: 'active' }
        ];

        return (
            <div className="table-courses">
                <Table hover responsive className="mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCourses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.id}</td>
                                <td>{course.title}</td>
                                <td>{course.instructor}</td>
                                <td>${course.price}</td>
                                <td>
                                    <Badge className={course.status === 'active' ? 'badge-active' : 'badge-pending'}>
                                        {course.status.toUpperCase()}
                                    </Badge>
                                </td>
                                <td>
                                    <Button size="sm" className="btn-approve-course me-2">
                                        Approve
                                    </Button>
                                    <Button size="sm" className="btn-hide-course">
                                        Hide
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

// 3. Component Layout chính
class ManageCourses extends React.Component {
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
                            <div className="courses-container">
                                <h2 className="page-title mb-4">Manage Courses</h2>
                                <Row>
                                    <Col md={4} className="mb-4">
                                        <CourseSummary />
                                    </Col>
                                    <Col md={8}>
                                        <CourseTable />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default ManageCourses;
