import { TUser } from '../../../domains/user';

export interface IUserRepository {
  signIn(email: string, password: string): Promise<Error | void>;
  subscribe(nextOrObserver: (authid: TUser['authid']) => void): () => void;
}
