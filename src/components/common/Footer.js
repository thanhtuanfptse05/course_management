import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Course Management</h5>
            <p className="text-muted">
              Hệ thống quản lý khóa học trực tuyến — giúp bạn học tập và phát
              triển kỹ năng mọi lúc mọi nơi.
            </p>
          </Col>

          <Col md={4}>
            <h5>Liên kết</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted text-decoration-none">Trang chủ</a></li>
              <li><a href="/courses" className="text-muted text-decoration-none">Khóa học</a></li>
              <li><a href="/login" className="text-muted text-decoration-none">Đăng nhập</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Liên hệ</h5>
            <ul className="list-unstyled text-muted">
              <li>📧 contact@coursemanagement.edu</li>
              <li>📞 0123-456-789</li>
              <li>📍 FPT University, Hà Nội</li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />

        <div className="text-center text-muted">
          <small>&copy; 2026 Course Management — FER202 Group 03. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
