import { api } from '../utils/api';

export const login = (identifier: string, password: string) =>
    api.post('/auth/Login', { identifier, password });

export const register = (data: {name: string; email: string; password: string; role?: string}) =>
    api.post('/auth/register', data);