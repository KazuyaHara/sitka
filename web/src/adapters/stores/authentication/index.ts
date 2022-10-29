/* eslint-disable import/prefer-default-export */
import create from 'zustand';

import { User } from '../../../domains/user';

type AuthState = Pick<User, 'authid'> & { initializing: boolean };

export const useAuthStore = create<AuthState>(() => ({ authid: null, initializing: true }));
