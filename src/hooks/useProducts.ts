import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';

const useProducts = (): {
  products: Product[],
  loading: boolean,
  error: Error | null,
  addProduct: (product: Product) => Promise<void>,
  updateProduct: (product: Product) => Promise<void>,
  deleteProduct: (id: string) => Promise<void>
} => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProducts()
     .then(setProducts)
     .catch(setError)
     .finally(() => setLoading(false));
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export default useProducts;