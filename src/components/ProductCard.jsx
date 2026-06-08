import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function ProductCard({ image, title, description, price, category, onViewDetail }) {
    return (
        <Card className="h-100 product-card shadow-sm border-0">
            {image && (
                <Card.Img
                    variant="top"
                    src={image}
                    alt={title}
                    className="product-card-image"
                />
            )}
            <Card.Body className="d-flex flex-column">  
                <div className="mb-3">
                    <Badge bg="secondary" className="mb-2">
                        {category}
                    </Badge>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-muted small">{description}</Card.Text>
                </div>
            
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div>
                        <span className="h5 mb-0">{price}</span>
                    </div>
                    <Button variant="primary" size="sm" onClick={onViewDetail}>
                        View Detail
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
