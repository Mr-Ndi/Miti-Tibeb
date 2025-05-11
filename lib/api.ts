// Get the API base URL from environment variables
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Validate API URL
if (!API_BASE) {
  console.error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'vendor' | 'admin';
  businessName?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  material: string;
  imageUrl: string;
  vendor: string;
  owner?: {
    businessName: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'vendor';
  businessName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Functions
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (!API_BASE) {
    throw new Error('API URL is not configured. Please check your environment variables.');
  }

  const url = `${API_BASE}${endpoint}`;
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || `API error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during the API request');
  }
}

// Auth Functions
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function logout(): Promise<void> {
  return fetchApi('/auth/logout', {
    method: 'POST',
  });
}

export async function getCurrentUser(): Promise<User> {
  return fetchApi<User>('/auth/me');
}

// Product Functions
export async function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>('/user/furniture');
}

export async function getProduct(id: string): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`);
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  return fetchApi<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  return fetchApi(`/products/${id}`, {
    method: 'DELETE',
  });
}

// Wishlist Functions
export async function getWishlist(): Promise<Product[]> {
  return fetchApi<Product[]>('/wishlist');
}

export async function addToWishlist(productId: string): Promise<void> {
  return fetchApi('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}

export async function removeFromWishlist(productId: string): Promise<void> {
  return fetchApi(`/wishlist/${productId}`, {
    method: 'DELETE',
  });
}

// Vendor Functions
export async function getVendorProducts(): Promise<Product[]> {
  return fetchApi<Product[]>('/vendor/products');
}

export async function getVendorProfile(): Promise<User> {
  return fetchApi<User>('/vendor/profile');
}

export async function updateVendorProfile(data: Partial<User>): Promise<User> {
  return fetchApi<User>('/vendor/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// Helper function to get auth headers
export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Helper function to handle API errors
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
} 