const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your actual API base URL

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function callApi<T>(endpoint: string, method: string, body?: any, authRequired: boolean = false): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (authRequired) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      throw new Error('Authentication token not found.');
    }
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error(jsonResponse.message || 'Something went wrong');
  }

  return jsonResponse;
}

export const login = async (email: string, password: string) => {
  return callApi<any>('auth/login', 'POST', { email, password });
};

export const register = async (name: string, email: string, password: string) => {
  return callApi<any>('auth/register', 'POST', { name, email, password });
};

export const logout = async () => {
  // Depending on your backend, this might be a simple client-side token removal
  // or an API call to invalidate the token on the server.
  // For now, we'll assume client-side token removal is sufficient for the frontend.
  // If your backend requires an API call for logout, uncomment and modify the line below:
  // return callApi<any>('auth/logout', 'POST', {}, true);
  console.log('Client-side logout initiated.');
};

export const getUser = async () => {
  return callApi<any>('auth/user', 'GET', undefined, true);
};

export const resetPassword = async (email: string) => {
  return callApi<any>('auth/password/reset', 'POST', { email });
};
