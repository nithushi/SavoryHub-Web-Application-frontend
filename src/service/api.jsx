import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// --- Request Interceptor ---
// යන හැම request එකකටම token එක එකතු කරනවා
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- NEW: Response Interceptor ---
// එන හැම response එකක්ම check කරනවා
api.interceptors.response.use(
  // If the response is successful, just return it
  (response) => {
    return response;
  },
  // If there is an error in the response
  (error) => {
    // Check if the error is because the token is expired (401 or 403 status)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("Token expired or invalid. Logging out...");
      
      // Remove the expired token and user data from storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect the user to the login page
      // window.location.href forces a full page reload, clearing all states.
      window.location.href = '/login';
    }
    
    // For all other errors, just return the error
    return Promise.reject(error);
  }
);

export default api;