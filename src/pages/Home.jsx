// [AI Generated Code - Prompt: "Tạo trang Home.jsx với Hero Section gradient xanh biển, thanh Search & Filter lọc khóa học theo tên và danh mục, lưới CourseCard 3 cột responsive. Mock 6 khóa học mẫu. Không dùng thẻ <a>, dùng Link react-router-dom"]

import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CourseCard from '../components/courses/CourseCard';
import './Home.css';

// ─── Mock data 6 khóa học mẫu ───────────────────────────────────────────────
const mockCourses = [
    {
        id: 1,
        title: 'ReactJS Fundamentals',
        category: 'Web Dev',
        price: 'Miễn phí',
        instructorName: 'Nguyễn Văn An',
        thumbnail: 'https://placehold.co/400x220/0f52ba/ffffff?text=ReactJS',
    },
    {
        id: 2,
        title: 'Node.js Căn bản cho người mới bắt đầu',
        category: 'Backend',
        price: '299.000đ',
        instructorName: 'Trần Thị Bình',
        thumbnail: 'https://placehold.co/400x220/3b82f6/ffffff?text=NodeJS',
    },
    {
        id: 3,
        title: 'UI/UX Design Pro — Thiết kế giao diện',
        category: 'Design',
        price: '199.000đ',
        instructorName: 'Lê Văn Cường',
        thumbnail: 'https://placehold.co/400x220/06b6d4/ffffff?text=UI%2FUX',
    },
    {
        id: 4,
        title: 'Python cho người mới hoàn toàn',
        category: 'Backend',
        price: '149.000đ',
        instructorName: 'Phạm Thị Dung',
        thumbnail: 'https://placehold.co/400x220/0f52ba/ffffff?text=Python',
    },
    {
        id: 5,
        title: 'Figma Mastery — Thiết kế từ A đến Z',
        category: 'Design',
        price: 'Miễn phí',
        instructorName: 'Hoàng Văn Em',
        thumbnail: 'https://placehold.co/400x220/3b82f6/ffffff?text=Figma',
    },
    {
        id: 6,
        title: 'CSS & Bootstrap 5 nâng cao',
        category: 'Web Dev',
        price: '99.000đ',
        instructorName: 'Vũ Thị Phương',
        thumbnail: 'https://placehold.co/400x220/06b6d4/ffffff?text=Bootstrap',
    },
];

const CATEGORIES = ['Tất cả', 'Web Dev', 'Backend', 'Design'];
// ────────────────────────────────────────────────────────────────────────────

function Home() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    // ── Lọc khóa học theo từ khóa & danh mục ──
    const filteredCourses = mockCourses.filter((course) => {
        const matchKeyword = course.title
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
        const matchCategory =
            selectedCategory === 'Tất cả' || course.category === selectedCategory;
        return matchKeyword && matchCategory;
    });

    // ── Scroll xuống khu vực danh sách khoá học ──
    const handleExploreClick = () => {
        document.getElementById('course-list-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Header />

            {/* ── Khối A: Hero Section ────────────────────────────────── */}
            <section className="home-hero d-flex align-items-center">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <p className="home-hero-subtitle mb-2">Nền tảng học trực tuyến</p>
                            <h1 className="home-hero-title mb-3">
                                Khám phá Khóa học<br />
                                <span className="home-hero-highlight">dành riêng cho bạn</span>
                            </h1>
                            <p className="home-hero-desc mb-4">
                                Hơn 100+ khóa học chất lượng cao từ các giảng viên hàng đầu.
                                Học bất cứ lúc nào, bất cứ đâu.
                            </p>
                            <Button
                                variant="light"
                                size="lg"
                                className="home-hero-btn"
                                onClick={handleExploreClick}
                            >
                                🎓 Xem tất cả khóa học
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ── Khối B: Thanh Search & Filter ──────────────────────── */}
            <section className="home-search-section py-4">
                <Container>
                    <Row className="g-3 align-items-center justify-content-center">
                        <Col lg={6} md={7}>
                            <InputGroup className="home-search-input-group">
                                <InputGroup.Text className="home-search-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#64748b" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </InputGroup.Text>
                                <Form.Control
                                    id="search-input"
                                    placeholder="Tìm kiếm khóa học..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    className="home-search-control"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg={3} md={4}>
                            <Form.Select
                                id="category-filter"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="home-filter-select"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ── Khối C: Lưới Danh sách Khóa học ────────────────────── */}
            <section id="course-list-section" className="py-5">
                <Container>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h2 className="home-section-title mb-0">
                            {selectedCategory === 'Tất cả' ? 'Tất cả khóa học' : selectedCategory}
                        </h2>
                        <span className="home-course-count">
                            {filteredCourses.length} khóa học
                        </span>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <Row xs={1} sm={2} md={3} className="g-4">
                            {filteredCourses.map((course) => (
                                <Col key={course.id}>
                                    <CourseCard course={course} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="home-empty-state text-center py-5">
                            <div className="home-empty-icon mb-3">🔍</div>
                            <h5 className="text-muted">Không tìm thấy khóa học phù hợp</h5>
                            <p className="text-muted small">Thử thay đổi từ khóa hoặc chọn danh mục khác</p>
                        </div>
                    )}
                </Container>
            </section>

            <Footer />
        </>
    );
}

export default Home;