import { Product } from '../types/product';

export const validateProduct = (product: Product): boolean => {
  if (product.name.trim() === '' || product.price <= 0) return false;
  return true;
};