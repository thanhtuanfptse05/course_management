import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

function ProductList({ products = [], onViewDetail }) {
    if (!products.length) {
        return <p className="text-muted">No products found.</p>;
    }

    return (
        <Row>
            {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} lg={4} className="mb-4">
                    <ProductCard
                        image={product.image}
                        title={product.title}
                        description={product.description}   
                        price={product.price}
                        category={product.category}
                        onViewDetail={() => onViewDetail?.(product)}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default ProductList;
