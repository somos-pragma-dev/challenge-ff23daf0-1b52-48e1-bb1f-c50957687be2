import React, { createContext, useContext } from 'react';
import useProducts from '../hooks/useProducts';

const ProductContext = createContext(null);

export const ProductProvider: React.FC = ({ children }) => {
  const products = useProducts();
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);