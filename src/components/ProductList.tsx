import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/product';

const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;