import {
  AuthError,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as FirebaseSignOut,
  Unsubscribe,
  User,
  UserCredential,
} from 'firebase/auth';

import Firebase from '../firebase';

export interface IAuthenticationDriver {
  signIn(email: string, password: string): Promise<UserCredential | Error>;
  signOut(): Promise<Error | void>;
  subscribe(nextOrObserver: (user: User | null) => void): Unsubscribe;
}

export default function authenticationDriver(): IAuthenticationDriver {
  const handleError = (error: AuthError): Error => {
    switch (error.code) {
      case 'auth/email-already-in-use':
      case 'auth/provider-already-linked':
        throw new Error('このメールアドレスは既に登録されています');
      case 'auth/invalid-credential':
        throw new Error('エラーが発生しました');
      case 'auth/invalid-email':
        throw new Error('メールアドレスを確認してください');
      case 'auth/invalid-user-token':
        throw new Error('再ログインしてください');
      case 'auth/invalid-verification-code':
        throw new Error('認証コードを確認してください');
      case 'auth/invalid-verification-id':
        throw new Error('エラーが発生しました');
      case 'auth/operation-not-allowed':
        throw new Error('エラーが発生しました');
      case 'auth/requires-recent-login':
        throw new Error('再認証が必要です');
      case 'auth/user-disabled':
        throw new Error('このアカウントは無効化されています');
      case 'auth/user-mismatch':
        throw new Error('パスワードを確認してください');
      case 'auth/user-not-found':
        throw new Error('このメールアドレスは登録されていません');
      case 'auth/user-token-expired':
        throw new Error('エラーが発生しました');
      case 'auth/weak-password':
        throw new Error('より安全なパスワードを設定してください');
      case 'auth/wrong-password':
        throw new Error('パスワードを確認してください');
      default:
        throw new Error('エラーが発生しました');
    }
  };

  const signIn = async (email: string, password: string) =>
    signInWithEmailAndPassword(Firebase.instance.auth, email, password).catch(handleError);

  const signOut = async () => FirebaseSignOut(Firebase.instance.auth).catch(handleError);

  const subscribe = (nextOrObserver: (user: User | null) => void) =>
    onAuthStateChanged(Firebase.instance.auth, nextOrObserver);

  return { signIn, signOut, subscribe };
}
