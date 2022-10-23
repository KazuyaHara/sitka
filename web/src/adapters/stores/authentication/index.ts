/* eslint-disable import/prefer-default-export */
import create from 'zustand';

import { TUser } from '../../../domains/user';

type AuthState = Pick<TUser, 'authid'> & { initializing: boolean };

export const useAuthStore = create<AuthState>(() => ({ authid: null, initializing: true }));
