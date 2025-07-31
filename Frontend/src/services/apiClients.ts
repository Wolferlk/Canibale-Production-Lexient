import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Base API configuration
const API_BASE_URL = "https://canibale-production-lexient.vercel.app";

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      // Handle token expiry, redirect to login, etc.
      console.log("Session expired. Please login again.");
      // You could add redirection logic here
    }
    return Promise.reject(error);
  }
);

// API endpoints organized by resource
const api = {
  products: {
    getAll: (): Promise<AxiosResponse> => apiClient.get("/api/products"),

    getById: (id: string): Promise<AxiosResponse> =>
      apiClient.get(`/api/products/${id}`),

    getLatest: (): Promise<AxiosResponse> => apiClient.get("/api/products/new"),

    add: (product: any): Promise<AxiosResponse> =>
      apiClient.post("/api/products", product),

    update: (id: string, updates: any): Promise<AxiosResponse> =>
      apiClient.put(`/api/products/${id}`, updates),

    delete: (id: string): Promise<AxiosResponse> =>
      apiClient.delete(`/api/products/${id}`),
  },

  orders: {
    getAll: (): Promise<AxiosResponse> => apiClient.get("/api/orders"),

    getById: (id: string): Promise<AxiosResponse> =>
      apiClient.get(`/api/orders/${id}`),

    add: (order: any): Promise<AxiosResponse> =>
      apiClient.post("/api/orders", order),

    update: (id: string, updates: any): Promise<AxiosResponse> =>
      apiClient.put(`/api/orders/${id}`, updates),

    delete: (id: string): Promise<AxiosResponse> =>
      apiClient.delete(`/api/orders/${id}`),
  },

  contacts: {
    getAll: (): Promise<AxiosResponse> => apiClient.get("/api/contacts"),

    getById: (id: string): Promise<AxiosResponse> =>
      apiClient.get(`/api/contacts/${id}`),

    add: (contact: any): Promise<AxiosResponse> =>
      apiClient.post("/api/contacts", contact),

    update: (id: string, updates: any): Promise<AxiosResponse> =>
      apiClient.put(`/api/contacts/${id}`, updates),

    delete: (id: string): Promise<AxiosResponse> =>
      apiClient.delete(`/api/contacts/${id}`),
  },

  photos: {
    getAll: (): Promise<AxiosResponse> => apiClient.get("/api/photos"),

    getById: (id: string): Promise<AxiosResponse> =>
      apiClient.get(`/api/photos/${id}`),

    add: (photo: any): Promise<AxiosResponse> =>
      apiClient.post("/api/photos", photo),

    update: (id: string, updates: any): Promise<AxiosResponse> =>
      apiClient.put(`/api/photos/${id}`, updates),

    delete: (id: string): Promise<AxiosResponse> =>
      apiClient.delete(`/api/photos/${id}`),
  },

  users: {
    login: (credentials: {
      username: string;
      password: string;
    }): Promise<AxiosResponse> =>
      apiClient.post("/api/users/login", credentials),

    getAll: (): Promise<AxiosResponse> => apiClient.get("/api/users/viewusers"),

    getProfile: (): Promise<AxiosResponse> =>
      apiClient.get("/api/users/viewprofile"),

    add: (user: any): Promise<AxiosResponse> =>
      apiClient.post("/api/users/add", user),

    update: (userId: string, updates: any): Promise<AxiosResponse> =>
      apiClient.put(`/api/users/edit/${userId}`, updates),

    updateProfile: (updates: any): Promise<AxiosResponse> =>
      apiClient.put("/api/users/update", updates),

    delete: (userId: string): Promise<AxiosResponse> =>
      apiClient.delete(`/api/users/delete/${userId}`),
  },

  chat: {
    send: (message: string, sessionId?: string): Promise<AxiosResponse> =>
      apiClient.post("/api/chat", { message, sessionId }),
  },
};

export default api;