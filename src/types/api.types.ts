// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Example Data Types - Modify these based on your Figma design needs
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  inStock?: boolean;
}

export interface DashboardData {
  metrics: {
    totalUsers: number;
    totalRevenue: number;
    activeProducts: number;
    pendingOrders: number;
  };
  recentActivity: Activity[];
}

export interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  user?: User;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
