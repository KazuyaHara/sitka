import { TUser } from '../../../domains/user';
import { IUserUseCase } from '../../../interface/useCase/user';
import authenticationDriver from '../../infrastructure/authentication';

export default function userRepository(): IUserUseCase {
  const sendPasswordResetEmail = async (email: string) => {
    await authenticationDriver().sendPasswordResetEmail(email);
  };

  const signIn = async (email: string, password: string) => {
    await authenticationDriver().signIn(email, password);
  };

  const signOut = async () => {
    await authenticationDriver().signOut();
  };

  const subscribe = (nextOrObserver: (authid: TUser['authid']) => void) =>
    authenticationDriver().subscribe((user) => nextOrObserver(user?.uid ?? null));

  return { sendPasswordResetEmail, signIn, signOut, subscribe };
}
