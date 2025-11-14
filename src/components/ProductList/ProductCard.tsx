import React from 'react';
import { Product } from '../../types/api.types';
import { Card, CardBody, Button } from '../common';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Card hoverable>
      <CardBody>
        <div className="product-card">
          {product.image && (
            <div className="product-card-image">
              <img src={product.image} alt={product.title} />
            </div>
          )}
          <div className="product-card-content">
            <h3 className="product-card-title">{product.title}</h3>
            <p className="product-card-description">{product.description}</p>
            {product.category && (
              <span className="product-card-category">{product.category}</span>
            )}
            <div className="product-card-footer">
              <div className="product-card-price">${product.price.toFixed(2)}</div>
              {product.inStock !== undefined && (
                <span className={`product-card-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              )}
            </div>
            <div className="product-card-actions">
              {onView && (
                <Button size="small" variant="outline" onClick={() => onView(product)}>
                  View
                </Button>
              )}
              {onEdit && (
                <Button size="small" variant="secondary" onClick={() => onEdit(product)}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button size="small" variant="danger" onClick={() => onDelete(product)}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
