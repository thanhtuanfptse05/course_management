import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Mock data tạm thời, tuần sau sẽ lấy từ JSON-Server
const mockCourses = [
    { id: 1, title: 'ReactJS Fundamentals', category: 'Web Dev', price: 'Free' },
    { id: 2, title: 'Node.js Basics', category: 'Backend', price: '$29' },
    { id: 3, title: 'UI/UX Design', category: 'Design', price: '$19' },
];

function Home() {
    return (
        <>
            <Header />

            {/* Hero section */}
            <div className="bg-primary text-white py-5 text-center">
                <Container>
                    <h1>Welcome to CourseMGT</h1>
                    <p className="lead">Learn anytime, anywhere. Browse our top courses.</p>
                    <Button variant="light" size="lg">Explore Courses</Button>
                </Container>
            </div>

            {/* Course list */}
            <Container className="py-5">
                <h2 className="mb-4">Example Courses</h2>
                <Row>
                    {mockCourses.map(course => (
                        <Col md={4} key={course.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{course.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {course.category}
                                    </Card.Subtitle>
                                    <Card.Text>Price: {course.price}</Card.Text>
                                    <Button variant="primary" size="sm">Register now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Footer />
        </>
    );
}

export default Home;