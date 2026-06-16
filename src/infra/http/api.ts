import axios from 'axios';

import { environment } from '../../config/environment';
import { tokenStorage } from '../storage/tokenStorage';

type RetriableRequestConfig = {
  _retry?: boolean;
  headers?: Record<string, string>;
};

let unauthorizedHandler: (() => Promise<void> | void) | null = null;
let refreshPromise: Promise<string | null> | null = null;

const refreshClient = axios.create({
  baseURL: environment.apiUrl,
  timeout: 10000,
});

export const api = axios.create({
  baseURL: environment.apiUrl,
  timeout: 10000,
});

export function setUnauthorizedHandler(handler: (() => Promise<void> | void) | null) {
  unauthorizedHandler = handler;
}

async function clearStoredSession() {
  await tokenStorage.clearSession();
}

async function runUnauthorizedHandler() {
  if (unauthorizedHandler) {
    await unauthorizedHandler();
  }
}

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = await tokenStorage.getRefreshToken();

      if (!refreshToken) {
        await clearStoredSession();
        return null;
      }

      try {
        const response = await refreshClient.post<{
          token: string;
          refresh_token?: string;
        }>(environment.refreshTokenPath, {
          refresh_token: refreshToken,
        });

        const nextAccessToken = response.data.token.replace(/^Bearer\s+/i, '');
        const nextRefreshToken = response.data.refresh_token
          ? response.data.refresh_token.replace(/^Bearer\s+/i, '')
          : refreshToken;

        await tokenStorage.setToken(nextAccessToken);
        await tokenStorage.setRefreshToken(nextRefreshToken);

        return nextAccessToken;
      } catch {
        await clearStoredSession();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config as typeof error.config & RetriableRequestConfig;

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const nextAccessToken = await refreshAccessToken();

    if (!nextAccessToken) {
      await runUnauthorizedHandler();

      return Promise.reject(error);
    }

    originalRequest.headers = {
      ...originalRequest.headers,
      Authorization: `Bearer ${nextAccessToken}`,
    };

    return api(originalRequest);
  }
);
