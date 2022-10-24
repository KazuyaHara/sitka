import { TUser } from '../../../domains/user';
import { IUserRepository } from '../../../interface/repository/user';
import { IUserUseCase } from '../../../interface/useCase/user';

export default function useUserUseCase(userRepository: IUserRepository): IUserUseCase {
  const sendPasswordResetEmail = async (email: string) =>
    userRepository.sendPasswordResetEmail(email);

  const signIn = async (email: string, password: string) => userRepository.signIn(email, password);

  const signOut = async () => userRepository.signOut();

  const subscribe = (nextOrObserver: (authid: TUser['authid']) => void) =>
    userRepository.subscribe(nextOrObserver);

  return { sendPasswordResetEmail, signIn, signOut, subscribe };
}
