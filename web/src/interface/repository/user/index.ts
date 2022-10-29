import { User } from '../../../domains/user';

export interface IUserRepository {
  sendPasswordResetEmail(email: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  subscribe(nextOrObserver: (authid: User['authid']) => void): () => void;
}
