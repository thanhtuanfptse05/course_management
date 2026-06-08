// [AI Generated Code - Prompt: "Thiết kế Footer cao cấp màu tối bằng Tiếng Việt với logo, các cột liên kết nhanh và thông tin bản quyền môn học FER202"]

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="custom-footer py-5 mt-auto">
            <Container>
                <Row className="g-4">
                    {/* Cột thông tin thương hiệu/dự án */}
                    <Col xs={12} md={4} className="pe-md-5">
                        <div className="d-flex align-items-center mb-3 text-white fw-bold fs-5">
                            <i className="bi bi-book-half text-primary me-2"></i>
                            <span>CourseMGT</span>
                        </div>
                        <p className="small text-muted mb-3">
                            Ứng dụng quản lý khóa học chất lượng cao dành cho giảng viên và sinh viên Đại học FPT, hỗ trợ theo dõi, đăng ký và quản lý lớp học trực tuyến một cách dễ dàng và hiệu quả.
                        </p>
                        <div className="d-flex gap-3 fs-5">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-muted"><i className="bi bi-facebook"></i></a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted"><i className="bi bi-github"></i></a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-muted"><i className="bi bi-youtube"></i></a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </Col>

                    {/* Cột liên kết nhanh */}
                    <Col xs={6} md={4}>
                        <h6 className="text-white fw-semibold mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                            Liên Kết Nhanh
                        </h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li><Link to="/">Trang Chủ</Link></li>
                            <li><Link to="/login">Đăng Nhập</Link></li>
                            <li><Link to="/register">Đăng Ký Thành Viên</Link></li>
                            <li><Link to="/demo">Component Demo</Link></li>
                        </ul>
                    </Col>

                    {/* Thông tin học thuật */}
                    <Col xs={6} md={4}>
                        <h6 className="text-white fw-semibold mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                            Thông Tin Học Thuật
                        </h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
                            <li>
                                <span className="text-white fw-medium">Môn học:</span> FER202 - Lập trình Front-End với React
                            </li>
                            <li>
                                <span className="text-white fw-medium">Lớp:</span> SE2014JS
                            </li>
                            <li>
                                <span className="text-white fw-medium">Nhóm:</span> Nhóm 03
                            </li>
                            <li>
                                <span className="text-white fw-medium">Cơ sở:</span> Đại học FPT Đà Nẵng
                            </li>
                        </ul>
                    </Col>
                </Row>

                <hr className="my-4" style={{ borderColor: '#334155' }} />

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small">
                    <p className="mb-0 text-muted">
                        © 2026 CourseMGT Nhóm 3 (SE2014JS-G03). Bảo lưu mọi quyền.
                    </p>
                    <p className="mb-0 text-muted">
                        Chứng nhận tính minh bạch của AI & trung thực học thuật (CLO9).
                    </p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;