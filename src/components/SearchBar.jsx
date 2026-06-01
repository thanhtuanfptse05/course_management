import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function SearchBar({ keyword, setKeyword, onSearch }) {
    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault();
                onSearch?.();
            }}
            className="mb-3"
        >
            <InputGroup>
                <Form.Control
                    type="search"
                    value={keyword}
                    onChange={(event) => setKeyword?.(event.target.value)}
                    placeholder="Search products, categories, or topics"
                    aria-label="Search"
                />
                <Button type="submit" variant="primary">
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchBar;
