import { Product } from '../types/product';
import { validateProduct } from '../utils/validations';

const products: Product[] = [];

export const fetchProducts = async (): Promise<Product[]> => {
  return products;
};

export const addProduct = async (product: Product): Promise<void> => {
  if (!validateProduct(product)) throw new Error('Invalid product');
  products.push(product);
};

export const updateProduct = async (product: Product): Promise<void> => {
  if (!validateProduct(product)) throw new Error('Invalid product');
  const index = products.findIndex(p => p.id === product.id);
  if (index!== -1) products[index] = product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const index = products.findIndex(p => p.id === id);
  if (index!== -1) products.splice(index, 1);
};