import { apiService } from './api.service';
import {
  User,
  Product,
  DashboardData,
  PaginatedResponse,
  PaginationParams,
} from '../types/api.types';

// Example API endpoints - Customize based on your backend
export const dataService = {
  // User endpoints
  getUsers: (params?: PaginationParams) => {
    const queryParams = params ? `?page=${params.page}&limit=${params.limit}` : '';
    return apiService.get<PaginatedResponse<User>>(`/users${queryParams}`);
  },

  getUserById: (id: number) => {
    return apiService.get<User>(`/users/${id}`);
  },

  createUser: (userData: Partial<User>) => {
    return apiService.post<User>('/users', userData);
  },

  updateUser: (id: number, userData: Partial<User>) => {
    return apiService.put<User>(`/users/${id}`, userData);
  },

  deleteUser: (id: number) => {
    return apiService.delete<void>(`/users/${id}`);
  },

  // Product endpoints
  getProducts: (params?: PaginationParams) => {
    const queryParams = params ? `?page=${params.page}&limit=${params.limit}` : '';
    return apiService.get<PaginatedResponse<Product>>(`/products${queryParams}`);
  },

  getProductById: (id: number) => {
    return apiService.get<Product>(`/products/${id}`);
  },

  createProduct: (productData: Partial<Product>) => {
    return apiService.post<Product>('/products', productData);
  },

  updateProduct: (id: number, productData: Partial<Product>) => {
    return apiService.put<Product>(`/products/${id}`, productData);
  },

  deleteProduct: (id: number) => {
    return apiService.delete<void>(`/products/${id}`);
  },

  // Dashboard endpoints
  getDashboardData: () => {
    return apiService.get<DashboardData>('/dashboard');
  },

  // Search endpoint
  search: (query: string, type?: string) => {
    return apiService.get<any[]>(`/search?q=${query}${type ? `&type=${type}` : ''}`);
  },
};
