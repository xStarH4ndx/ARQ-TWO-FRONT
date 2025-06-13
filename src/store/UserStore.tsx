import { create } from 'zustand';
import { client } from '../api/client';

type userData = {
  id: string;
  access_token: string;
  email: string;
};

interface UserState {
  id: string;
  access_token: string;
  email: string;
  getAccessToken: () => string;
  getEmail: () => string;
  getId: () => string;
  setId: (id: string) => void;
  setUserData: (data: userData) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  id: '',
  access_token: '',
  email: '',

  getId: () => {
    const state = get();
    return state.id;
  },

  getAccessToken: () => {
    const state = get();
    return state.access_token;
  },

  getEmail: () => {
    const state = get();
    return state.email;
  },

  setId: (id) => {
    set({ id });
    localStorage.setItem('id', id);
  },

  setUserData: (data) => {
    set({
      access_token: data.access_token,
      email: data.email,
    });
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('email', data.email);
  },

  logout: () => {
    set({ access_token: '', email: '', id: '' });
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    client.clearStore();
  },

}));