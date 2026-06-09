// [AI Generated Code - Prompt: "Thiết kế thanh Tìm kiếm (Search Bar) và Hộp chọn danh mục (Dropdown Filter)"]
import React from 'react';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';

const SearchBar = ({ categories = [], onSearch, onCategoryChange }) => {
  return (
    <Row className="mb-4 bg-white p-3 rounded shadow-sm border">
      <Col md={8} className="mb-3 mb-md-0">
        <InputGroup>
          <Form.Control
            placeholder="Tìm kiếm khóa học..."
            aria-label="Search"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
          <Button variant="primary">Tìm kiếm</Button>
        </InputGroup>
      </Col>
      <Col md={4}>
        <Form.Select aria-label="Lọc theo danh mục" onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default SearchBar;
