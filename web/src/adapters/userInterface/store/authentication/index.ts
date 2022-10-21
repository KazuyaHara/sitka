/* eslint-disable import/prefer-default-export */
import create from 'zustand';

type AuthState = { initializing: boolean };

export const useAuthStore = create<AuthState>(() => ({ initializing: true }));
