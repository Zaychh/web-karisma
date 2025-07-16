import axios from 'axios';

const API = 'http://localhost:3000/api/auth'; // ganti sesuai base URL lo

export const register = async (data: { name: string; email: string; password: string; role: string }) => {
  return axios.post(`${API}/register`, data);
};

export const login = async (identifier: string, password: string) => {
  return axios.post(`${API}/login`, {
    identifier,
    password,
  });
};
