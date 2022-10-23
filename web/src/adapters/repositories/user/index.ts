import { TUser } from '../../../domains/user';
import { IUserUseCase } from '../../../interface/useCase/user';
import authenticationDriver from '../../infrastructure/authentication';

export default function userRepository(): IUserUseCase {
  const signIn = async (email: string, password: string) => {
    await authenticationDriver().signIn(email, password);
  };

  const subscribe = (nextOrObserver: (authid: TUser['authid']) => void) =>
    authenticationDriver().subscribe((user) => nextOrObserver(user?.uid ?? null));

  return { signIn, subscribe };
}
