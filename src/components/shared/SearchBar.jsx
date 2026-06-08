// [AI Generated Code - Prompt: "Tạo SearchBar component với input và icon tìm kiếm theo phong cách thiết kế của ui-rule.md"]
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function SearchBar({ value, onChange, placeholder = 'Tìm kiếm...' }) {
    return (
        <InputGroup className="premium-search-bar" style={{ maxWidth: '400px' }}>
            <InputGroup.Text className="bg-white border-end-0 text-muted">
                {/* Dùng SVG kính lúp thay vì cài icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </InputGroup.Text>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border-start-0 ps-0"
                style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                }}
            />
        </InputGroup>
    );
}

export default SearchBar;
