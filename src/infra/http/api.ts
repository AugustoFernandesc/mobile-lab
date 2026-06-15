import axios from 'axios';
import { environment } from '../../config/environment';
import { tokenStorage } from '../storage/tokenStorage';

export const api = axios.create({
  baseURL: environment.api_url,
});

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});