// [AI Generated Code - Prompt: "Tạo trang CourseDetail.jsx layout 2 cột: cột trái nội dung chi tiết khóa học (ảnh, mô tả, đề cương, thông tin giảng viên), cột phải Box đăng ký sticky (giá, nút Đăng ký, điểm nổi bật). Dùng useParams để lấy id. Mock data tĩnh."]

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './CourseDetail.css';

// ─── Mock data khóa học (đồng bộ với Home.jsx) ──────────────────────────────
const mockCourses = [
    {
        id: 1,
        title: 'ReactJS Fundamentals',
        category: 'Web Dev',
        price: 'Miễn phí',
        instructorName: 'Nguyễn Văn An',
        instructorBio: 'Kỹ sư Frontend với 7 năm kinh nghiệm tại các công ty công nghệ hàng đầu Việt Nam.',
        thumbnail: 'https://placehold.co/800x400/0f52ba/ffffff?text=ReactJS+Fundamentals',
        description: 'Khóa học này giúp bạn nắm vững các khái niệm cốt lõi của ReactJS từ cơ bản đến nâng cao. Bạn sẽ học cách xây dựng các ứng dụng Single Page Application (SPA) hiện đại với React Hooks, React Router và quản lý state hiệu quả.',
        enrolledCount: 1240,
        status: 'active',
        syllabus: [
            'Giới thiệu về ReactJS và JSX',
            'Components, Props và State',
            'React Hooks: useState, useEffect',
            'React Router DOM v6',
            'Quản lý State với Context API',
            'Tích hợp Axios gọi REST API',
        ],
    },
    {
        id: 2,
        title: 'Node.js Căn bản cho người mới bắt đầu',
        category: 'Backend',
        price: '299.000đ',
        instructorName: 'Trần Thị Bình',
        instructorBio: 'Backend Developer với hơn 5 năm kinh nghiệm xây dựng hệ thống RESTful API quy mô lớn.',
        thumbnail: 'https://placehold.co/800x400/3b82f6/ffffff?text=Node.js+Basics',
        description: 'Khóa học Node.js dành cho người mới bắt đầu. Bạn sẽ hiểu rõ cách Node.js hoạt động, xây dựng REST API với Express.js và kết nối với cơ sở dữ liệu MongoDB.',
        enrolledCount: 870,
        status: 'active',
        syllabus: [
            'Giới thiệu Node.js và npm',
            'Module system và CommonJS',
            'Xây dựng HTTP Server',
            'Express.js Framework',
            'RESTful API Design',
            'Kết nối MongoDB với Mongoose',
        ],
    },
    {
        id: 3,
        title: 'UI/UX Design Pro — Thiết kế giao diện',
        category: 'Design',
        price: '199.000đ',
        instructorName: 'Lê Văn Cường',
        instructorBio: 'UI/UX Designer với 8 năm kinh nghiệm thiết kế sản phẩm số tại các startup và tập đoàn lớn.',
        thumbnail: 'https://placehold.co/800x400/06b6d4/ffffff?text=UI%2FUX+Design',
        description: 'Học cách thiết kế giao diện người dùng chuyên nghiệp với Figma. Từ wireframe đến prototype hoàn chỉnh, bạn sẽ nắm được quy trình thiết kế UI/UX theo chuẩn công nghiệp.',
        enrolledCount: 543,
        status: 'active',
        syllabus: [
            'Nguyên tắc cơ bản của UI/UX',
            'Figma từ A đến Z',
            'Thiết kế Wireframe',
            'Prototype tương tác',
            'Design System & Component',
            'Kiểm tra Usability Testing',
        ],
    },
    {
        id: 4,
        title: 'Python cho người mới hoàn toàn',
        category: 'Backend',
        price: '149.000đ',
        instructorName: 'Phạm Thị Dung',
        instructorBio: 'Data Scientist và Python Developer với 6 năm kinh nghiệm trong lĩnh vực Data Analysis và Machine Learning.',
        thumbnail: 'https://placehold.co/800x400/0f52ba/ffffff?text=Python+Basics',
        description: 'Khóa học Python hoàn toàn cho người mới. Bạn sẽ học từ cú pháp cơ bản, cấu trúc dữ liệu đến lập trình hướng đối tượng và xử lý file.',
        enrolledCount: 2100,
        status: 'active',
        syllabus: [
            'Cú pháp Python cơ bản',
            'Kiểu dữ liệu và biến',
            'Vòng lặp và điều kiện',
            'Hàm và Module',
            'Lập trình hướng đối tượng',
            'Xử lý File và Exception',
        ],
    },
    {
        id: 5,
        title: 'Figma Mastery — Thiết kế từ A đến Z',
        category: 'Design',
        price: 'Miễn phí',
        instructorName: 'Hoàng Văn Em',
        instructorBio: 'Product Designer tại các công ty Fintech với chuyên môn sâu về Figma và Design Thinking.',
        thumbnail: 'https://placehold.co/800x400/3b82f6/ffffff?text=Figma+Mastery',
        description: 'Thành thạo Figma từ cơ bản đến nâng cao. Học tất cả tính năng của Figma để tạo ra những thiết kế chuyên nghiệp và prototype tương tác ấn tượng.',
        enrolledCount: 980,
        status: 'active',
        syllabus: [
            'Làm quen giao diện Figma',
            'Frames, Groups và Layers',
            'Auto Layout',
            'Components và Variants',
            'Prototyping và Animation',
            'Xuất tài sản (Export Assets)',
        ],
    },
    {
        id: 6,
        title: 'CSS & Bootstrap 5 nâng cao',
        category: 'Web Dev',
        price: '99.000đ',
        instructorName: 'Vũ Thị Phương',
        instructorBio: 'Frontend Developer chuyên về CSS Animation và responsive design với 4 năm kinh nghiệm thực chiến.',
        thumbnail: 'https://placehold.co/800x400/06b6d4/ffffff?text=CSS+%26+Bootstrap',
        description: 'Nâng cao kỹ năng CSS và Bootstrap 5 của bạn. Học flexbox, grid, animation và cách sử dụng Bootstrap 5 để tạo giao diện responsive chuyên nghiệp.',
        enrolledCount: 650,
        status: 'active',
        syllabus: [
            'CSS Flexbox toàn diện',
            'CSS Grid Layout',
            'CSS Animation và Transition',
            'Bootstrap 5 Grid System',
            'Bootstrap 5 Components',
            'Tùy biến Bootstrap với SASS',
        ],
    },
];
// ────────────────────────────────────────────────────────────────────────────

function CourseDetail() {
    const { id } = useParams();
    const course = mockCourses.find((c) => c.id === parseInt(id));

    // ── Không tìm thấy khóa học ──
    if (!course) {
        return (
            <>
                <Header />
                <Container className="py-5 text-center">
                    <div className="cd-not-found">
                        <div className="cd-not-found-icon mb-3">😕</div>
                        <h2>Không tìm thấy khóa học</h2>
                        <p className="text-muted">Khóa học này không tồn tại hoặc đã bị xóa.</p>
                        <Button as={Link} to="/" variant="primary" className="mt-2">
                            ← Quay về trang chủ
                        </Button>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <Container className="py-4 py-lg-5">
                <Row className="gx-4 gx-lg-5">

                    {/* ── Cột Trái: Nội dung chi tiết ── */}
                    <Col lg={8} className="mb-4">

                        {/* Ảnh thumbnail */}
                        <img
                            src={course.thumbnail}
                            alt={`Ảnh khóa học ${course.title}`}
                            className="cd-thumbnail w-100 mb-4"
                        />

                        {/* Badges */}
                        <div className="d-flex gap-2 mb-3">
                            <Badge className="cd-badge-category">{course.category}</Badge>
                            <Badge className="cd-badge-status">● Đang mở</Badge>
                        </div>

                        {/* Tiêu đề chính (h1 duy nhất) */}
                        <h1 className="cd-title mb-3">{course.title}</h1>

                        {/* Mô tả khóa học */}
                        <section className="mb-4">
                            <h2 className="cd-section-title">Mô tả khóa học</h2>
                            <p className="cd-description">{course.description}</p>
                        </section>

                        {/* Đề cương khóa học */}
                        <section className="mb-4">
                            <h2 className="cd-section-title">Nội dung khóa học</h2>
                            <ListGroup variant="flush" className="cd-syllabus">
                                {course.syllabus.map((item, idx) => (
                                    <ListGroup.Item key={idx} className="cd-syllabus-item">
                                        <span className="cd-syllabus-check">✅</span>
                                        {item}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </section>

                        {/* Thông tin giảng viên */}
                        <section className="cd-instructor-box">
                            <h2 className="cd-section-title">Giảng viên</h2>
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={`https://placehold.co/64x64/e0f2fe/0f52ba?text=${course.instructorName.charAt(0)}`}
                                    alt={`Avatar ${course.instructorName}`}
                                    className="cd-instructor-avatar"
                                />
                                <div>
                                    <div className="cd-instructor-name">{course.instructorName}</div>
                                    <div className="cd-instructor-bio">{course.instructorBio}</div>
                                </div>
                            </div>
                        </section>
                    </Col>

                    {/* ── Cột Phải: Box đăng ký (Sticky) ── */}
                    <Col lg={4}>
                        <div className="cd-enroll-box">
                            <Card className="border-0 shadow-sm cd-enroll-card">
                                <Card.Body className="p-4">
                                    {/* Giá */}
                                    <div className="cd-price mb-3">
                                        {course.price}
                                    </div>

                                    {/* Nút đăng ký chính */}
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-100 cd-enroll-btn mb-3"
                                        id={`enroll-btn-${course.id}`}
                                    >
                                        🎓 Đăng ký học ngay
                                    </Button>

                                    {/* Điểm nổi bật */}
                                    <ListGroup variant="flush" className="cd-highlights mb-3">
                                        <ListGroup.Item className="cd-highlight-item border-0 px-0">
                                            ✔ Truy cập trọn đời
                                        </ListGroup.Item>
                                        <ListGroup.Item className="cd-highlight-item border-0 px-0">
                                            ✔ Học mọi lúc, mọi nơi
                                        </ListGroup.Item>
                                        <ListGroup.Item className="cd-highlight-item border-0 px-0">
                                            ✔ Chứng chỉ hoàn thành
                                        </ListGroup.Item>
                                        <ListGroup.Item className="cd-highlight-item border-0 px-0">
                                            ✔ Hỗ trợ từ giảng viên
                                        </ListGroup.Item>
                                    </ListGroup>

                                    {/* Divider */}
                                    <hr className="cd-divider" />

                                    {/* Thông tin nhanh */}
                                    <div className="cd-meta">
                                        <div className="cd-meta-row">
                                            <span className="cd-meta-label">👨‍🎓 Học viên</span>
                                            <span className="cd-meta-value">{course.enrolledCount.toLocaleString('vi-VN')}</span>
                                        </div>
                                        <div className="cd-meta-row">
                                            <span className="cd-meta-label">📂 Danh mục</span>
                                            <span className="cd-meta-value">{course.category}</span>
                                        </div>
                                        <div className="cd-meta-row">
                                            <span className="cd-meta-label">👤 Giảng viên</span>
                                            <span className="cd-meta-value">{course.instructorName}</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                </Row>
            </Container>

            <Footer />
        </>
    );
}

export default CourseDetail;
