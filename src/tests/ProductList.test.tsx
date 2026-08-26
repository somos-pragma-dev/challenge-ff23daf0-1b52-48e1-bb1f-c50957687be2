import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { ProductProvider } from '../context/ProductContext';

describe('ProductList', () => {
  test('renders loading state', () => {
    render(
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    );
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});


package.json
{
  "name": "product-management-spa",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "typescript": "5.1.6",
    "react-scripts": "5.0.1",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "jest": "29.5.0"
  }
}