import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiUrl || 'http://localhost:5000',
  endpoints: {
    auth: {
      login: '/api/v1/auth/login',
      refresh: '/api/v1/auth/refresh',
      logout: '/api/v1/auth/logout',
      profile: '/api/v1/auth/profile',
      changePassword: '/api/v1/auth/change-password'
    },
    users: {
      list: '/api/users',
      create: '/api/users',
      update: (id: string) => `/api/users/${id}`,
      delete: (id: string) => `/api/users/${id}`,
      get: (id: string) => `/api/users/${id}`
    },
    employees: {
      list: '/api/employees',
      create: '/api/employees',
      update: (id: string) => `/api/employees/${id}`,
      delete: (id: string) => `/api/employees/${id}`,
      get: (id: string) => `/api/employees/${id}`
    },
    departments: {
      list: '/api/departments'
    },
    branches: {
      list: '/api/branches'
    }
  }
};

export const HTTP_CONFIG = {
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
};