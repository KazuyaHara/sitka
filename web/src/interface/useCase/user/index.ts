import { TUser } from '../../../domains/user';

export interface IUserUseCase {
  signIn(email: string, password: string): Promise<Error | void>;
  subscribe(nextOrObserver: (authid: TUser['authid']) => void): () => void;
}
