import { TUser } from '../../../domains/user';

export interface IUserUseCase {
  sendPasswordResetEmail(email: string): Promise<Error | void>;
  signIn(email: string, password: string): Promise<Error | void>;
  signOut(): Promise<Error | void>;
  subscribe(nextOrObserver: (authid: TUser['authid']) => void): () => void;
}
