import { Container } from "react-bootstrap";

function Header() {
  return (
    <header className="bg-primary text-white py-2">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <small>📧 contact@coursemanagement.edu</small>
          <small>📞 0123-456-789</small>
        </div>
      </Container>
    </header>
  );
}

export default Header;
