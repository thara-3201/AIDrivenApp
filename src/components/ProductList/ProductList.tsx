import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useApi } from '../../hooks/useApi';
import { dataService } from '../../services/data.service';
import { Product } from '../../types/api.types';
import { Loading, ErrorMessage, Button } from '../common';
import { ProductCard } from './ProductCard';
import './ProductList.css';

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, loading, error, refetch } = useFetch(
    () => dataService.getProducts({ page, limit }),
    [page]
  );

  const { execute: deleteProduct, loading: deleting } = useApi(
    (id: number) => dataService.deleteProduct(id)
  );

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      try {
        await deleteProduct(product.id);
        refetch();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleView = (product: Product) => {
    console.log('View product:', product);
    // Implement view logic or navigation
  };

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product);
    // Implement edit logic or navigation
  };

  if (loading) {
    return <Loading fullScreen message="Loading products..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
        fullScreen
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Products</h1>
        <Button variant="primary">Add Product</Button>
      </div>

      {data.data.length === 0 ? (
        <div className="product-list-empty">
          <p>No products found</p>
          <Button variant="primary">Add Your First Product</Button>
        </div>
      ) : (
        <>
          <div className="product-list-grid">
            {data.data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {data.pagination.totalPages > 1 && (
            <div className="product-list-pagination">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || deleting}
              >
                Previous
              </Button>
              <span className="product-list-pagination-info">
                Page {data.pagination.currentPage} of {data.pagination.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages || deleting}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
