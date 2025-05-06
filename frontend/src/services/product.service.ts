import { api } from './api';
import type { Product } from '../types/Product';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  const response = await api.post('/products', product);
  return response.data;
};
