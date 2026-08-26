import React from 'react';
import ProductList from '../components/ProductList';
import { ProductProvider } from '../context/ProductContext';

const HomePage: React.FC = () => {
  return (
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  );
};

export default HomePage;