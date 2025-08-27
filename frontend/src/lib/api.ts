import { csrfManager } from './csrf';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
  };
  accessToken: string;
  refreshToken: string;
}

export interface AvailabilityResponse {
  available: boolean;
  reason?: string;
  villa?: {
    id: string;
    name: string;
    pricePerNight: number;
    maxGuests: number;
  };
  nights?: number;
  totalPrice?: number;
}

export interface BookingResponse {
  _id: string;
  userId: string;
  villaId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  guestNames?: string[];
  contactPhone?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentResponse {
  paymentId: string;
  transactionRef: string;
  payhereData: any;
  payhereUrl: string;
}

export interface VillaResponse {
  _id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  facilities: string[];
  amenities: string[];
  isAvailable: boolean;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  policies?: {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    houseRules: string[];
  };
  rating: number;
  reviewCount: number;
}

// API Client Class
class ApiClient {
  private baseURL: string;
  private accessToken: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
    }
  }

  private setToken(token: string) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  private clearToken() {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    // Add CSRF token for non-GET requests
    if (options.method && options.method !== 'GET') {
      const csrfHeaders = await csrfManager.getTokenHeader();
      Object.assign(headers, csrfHeaders);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Include cookies for CSRF
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Retry the request with new token
            headers.Authorization = `Bearer ${this.accessToken}`;
            const retryResponse = await fetch(url, {
              ...options,
              headers,
            });
            if (!retryResponse.ok) {
              throw new Error(`HTTP error! status: ${retryResponse.status}`);
            }
            return await retryResponse.json();
          } else {
            this.clearToken();
            throw new Error('Authentication failed');
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return false;

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  // Authentication APIs
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.accessToken) {
      this.setToken(response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    
    return response;
  }

  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.accessToken) {
      this.setToken(response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    await this.request('/auth/logout', { method: 'POST' });
    this.clearToken();
    localStorage.removeItem('refreshToken');
  }

  async getProfile(): Promise<any> {
    return this.request('/auth/profile');
  }

  // Villa APIs
  async getVillaDetails(): Promise<VillaResponse> {
    return this.request<VillaResponse>('/villas');
  }

  async getVillaStats(): Promise<any> {
    return this.request('/villas/stats');
  }

  // Booking APIs
  async checkAvailability(data: {
    checkIn: string;
    checkOut: string;
    guests: number;
  }): Promise<AvailabilityResponse> {
    return this.request<AvailabilityResponse>('/bookings/check-availability', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createBooking(data: {
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests?: string;
    guestNames?: string[];
    contactPhone?: string;
    contactEmail?: string;
  }): Promise<BookingResponse> {
    return this.request<BookingResponse>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserBookings(): Promise<BookingResponse[]> {
    return this.request<BookingResponse[]>('/bookings/my-bookings');
  }

  async getBookingById(id: string): Promise<BookingResponse> {
    return this.request<BookingResponse>(`/bookings/${id}`);
  }

  async cancelBooking(id: string, reason: string): Promise<BookingResponse> {
    return this.request<BookingResponse>(`/bookings/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
    });
  }

  // Admin Booking APIs
  async getAllBookings(): Promise<BookingResponse[]> {
    return this.request<BookingResponse[]>('/bookings');
  }

  async updateBookingStatus(
    id: string,
    data: { status: string; notes?: string }
  ): Promise<BookingResponse> {
    return this.request<BookingResponse>(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getBookingCalendar(): Promise<any[]> {
    return this.request('/bookings/admin/calendar');
  }

  // Payment APIs
  async initiatePayment(bookingId: string): Promise<PaymentResponse> {
    return this.request<PaymentResponse>(`/payments/initiate/${bookingId}`, {
      method: 'POST',
    });
  }

  async getPaymentStatus(paymentId: string): Promise<any> {
    return this.request(`/payments/status/${paymentId}`);
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).role : null;
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual API functions for convenience
export const authAPI = {
  register: (data: any) => apiClient.register(data),
  login: (credentials: any) => apiClient.login(credentials),
  logout: () => apiClient.logout(),
  getProfile: () => apiClient.getProfile(),
};

export const villaAPI = {
  getDetails: () => apiClient.getVillaDetails(),
  getStats: () => apiClient.getVillaStats(),
};

export const bookingAPI = {
  checkAvailability: (data: any) => apiClient.checkAvailability(data),
  create: (data: any) => apiClient.createBooking(data),
  getUserBookings: () => apiClient.getUserBookings(),
  getById: (id: string) => apiClient.getBookingById(id),
  cancel: (id: string, reason: string) => apiClient.cancelBooking(id, reason),
  // Admin methods
  getAll: () => apiClient.getAllBookings(),
  updateStatus: (id: string, data: any) => apiClient.updateBookingStatus(id, data),
  getCalendar: () => apiClient.getBookingCalendar(),
};

export const paymentAPI = {
  initiate: (bookingId: string) => apiClient.initiatePayment(bookingId),
  getStatus: (paymentId: string) => apiClient.getPaymentStatus(paymentId),
};
