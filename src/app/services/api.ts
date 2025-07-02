import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Interceptor para adicionar o token mais recente
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('preifma.token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  console.log("AXIOS: ", config);

  return config;
});
