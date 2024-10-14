import { makeAutoObservable, runInAction } from "mobx";
import { login as loginApi } from "../api/auth";
import axios from "axios";
import Cookies from 'js-cookie';

interface AuthResponse {
  token: string;
  refresh_token: string;
  refresh_token_expiration: number;
}

interface AuthStoreData {
  token: string;
  refreshToken: string;
  refreshTokenExpiration: number;
  isAuthenticated: boolean;
}

class AuthStore {
  token: string | null = null;
  refreshToken: string | null = null;
  refreshTokenExpiration: number | null = null;
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async authenticate(login: string, password: string) {
    try {
      const data: AuthResponse = await loginApi(login, password);
      runInAction(() => {
        this.setTokens({
          token: data.token,
          refreshToken: data.refresh_token,
          refreshTokenExpiration: data.refresh_token_expiration,
          isAuthenticated: true,
        });
      });
    } catch (error) {
      console.error("Auth error:", error);
    }
  }

  setTokens(data: AuthStoreData) {
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    this.refreshTokenExpiration = data.refreshTokenExpiration;
    this.isAuthenticated = true;

    Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
    Cookies.set('refresh_token', data.refreshToken, { secure: true, sameSite: 'strict' });
    Cookies.set('refresh_token_expiration', data.refreshTokenExpiration.toString(), { secure: true, sameSite: 'strict' });

    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  }

  logout() {
    this.token = null;
    this.refreshToken = null;
    this.refreshTokenExpiration = null;
    this.isAuthenticated = false;

    Cookies.remove('token');
    Cookies.remove('refresh_token');
    Cookies.remove('refresh_token_expiration');

    delete axios.defaults.headers.common["Authorization"];
  }

  initializeFromCookies() {
    const token = Cookies.get('token');
    const refreshToken = Cookies.get('refresh_token');
    const refreshTokenExpiration = Cookies.get('refresh_token_expiration');

    if (token && refreshToken && refreshTokenExpiration) {
      runInAction(() => {
        this.token = token;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiration = parseInt(refreshTokenExpiration, 10);
        this.isAuthenticated = true;

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      });
    } else {
      this.logout();
    }
  }
}

export const authStore = new AuthStore();
