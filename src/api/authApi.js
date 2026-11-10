/**
 * Production-Ready Authentication API Client for React.js
 * 
 * Security Principles Followed:
 * 1. Access Token is stored ONLY in-memory (never in localStorage or sessionStorage).
 * 2. Refresh Token is handled exclusively by the browser via HttpOnly, SameSite cookies.
 * 3. Automatic 401 Interception: Silently refreshes expired access tokens and retries failed requests.
 * 4. Request Queueing: Prevents parallel refresh calls (thundering herd problem).
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// In-Memory Token Storage (Shielded from XSS attacks that target localStorage)
let inMemoryAccessToken = null;
let isRefreshing = false;
let failedQueue = [];

export const getAccessToken = () => inMemoryAccessToken;
export const setAccessToken = (token) => {
  inMemoryAccessToken = token;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Universal Authenticated Fetch Wrapper
 * @param {string} endpoint 
 * @param {RequestInit} options 
 * @returns {Promise<any>}
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Inject Bearer access token if present in memory
  if (inMemoryAccessToken) {
    headers['Authorization'] = `Bearer ${inMemoryAccessToken}`;
  }

  const fetchConfig = {
    ...options,
    headers,
    credentials: 'include' // CRITICAL: Sends and receives HttpOnly refresh token cookies
  };

  let response;
  try {
    response = await fetch(url, fetchConfig);
  } catch (netErr) {
    const friendlyError = new Error('Cannot connect to the backend server. Please ensure the backend is running on port 5000 (npm run dev in Backend).');
    friendlyError.status = 503;
    friendlyError.isNetworkError = true;
    throw friendlyError;
  }

  // Auto-Refresh on 401 Token Expiration
  if (response.status === 401 && !options._retry && endpoint !== '/api/auth/refresh' && endpoint !== '/api/auth/login') {
    if (isRefreshing) {
      // Queue requests that arrive while a refresh is in-flight
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          fetchConfig.headers['Authorization'] = `Bearer ${token}`;
          return fetch(url, fetchConfig).then(res => res.json());
        });
    }

    options._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const refreshData = await refreshResponse.json();

      if (!refreshResponse.ok || !refreshData.success) {
        throw new Error(refreshData.message || 'Session expired');
      }

      setAccessToken(refreshData.accessToken);
      processQueue(null, refreshData.accessToken);

      // Retry the original request with new token
      fetchConfig.headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
      response = await fetch(url, fetchConfig);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      setAccessToken(null);
      window.dispatchEvent(new CustomEvent('auth:session-expired'));
      throw refreshErr;
    } finally {
      isRefreshing = false;
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// ---------------------------------------------------------------------------
// Dedicated Auth API Functions
// ---------------------------------------------------------------------------

export const authApi = {
  /**
   * Register a new user
   */
  async register({ name, email, password, confirmPassword, phone }) {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        confirmPassword: confirmPassword || password,
        phone: phone || ''
      })
    });
    if (data.data?.accessToken || data.accessToken) {
      setAccessToken(data.data?.accessToken || data.accessToken);
    }
    return data;
  },

  /**
   * Login with email and password
   */
  async login({ email, password }) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.data?.accessToken || data.accessToken) {
      setAccessToken(data.data?.accessToken || data.accessToken);
    }
    return data;
  },

  /**
   * Silently refresh access token via HttpOnly cookie
   */
  async refresh() {
    const data = await apiFetch('/api/auth/refresh', {
      method: 'POST'
    });
    if (data.data?.accessToken || data.accessToken) {
      setAccessToken(data.data?.accessToken || data.accessToken);
    }
    return data;
  },

  /**
   * Logout from current device
   */
  async logout() {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setAccessToken(null);
    }
  },

  /**
   * Logout from all devices
   */
  async logoutAll() {
    try {
      await apiFetch('/api/auth/logout-all', { method: 'POST' });
    } finally {
      setAccessToken(null);
    }
  },

  /**
   * Fetch current authenticated profile
   */
  async getMe() {
    return apiFetch('/api/auth/me', { method: 'GET' });
  }
};

// ---------------------------------------------------------------------------
// Dedicated Order API Functions (Connects Cart & Checkout to MongoDB Atlas)
// ---------------------------------------------------------------------------

export const orderApi = {
  /**
   * Place and store order in MongoDB Atlas
   */
  async createOrder(orderPayload) {
    return apiFetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    });
  },

  /**
   * Fetch orders for current logged-in customer
   */
  async getMyOrders(email = null) {
    const query = email ? `?email=${encodeURIComponent(email)}` : '';
    return apiFetch(`/api/orders/my-orders${query}`, {
      method: 'GET'
    });
  },

  /**
   * Fetch all orders (Admin overview)
   */
  async getAllOrders() {
    return apiFetch('/api/orders/all', {
      method: 'GET'
    });
  },

  /**
   * Fetch single order by Order ID
   */
  async getOrderById(orderId) {
    return apiFetch(`/api/orders/${orderId}`, {
      method: 'GET'
    });
  }
};

