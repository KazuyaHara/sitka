import {
  AuthError,
  onAuthStateChanged,
  sendPasswordResetEmail as FirebaseSendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as FirebaseSignOut,
  Unsubscribe,
  User,
  UserCredential,
} from 'firebase/auth';

import Firebase from '../firebase';

export interface IAuthenticationDriver {
  sendPasswordResetEmail(email: string): Promise<void>;
  signIn(email: string, password: string): Promise<UserCredential>;
  signOut(): Promise<void>;
  subscribe(nextOrObserver: (user: User | null) => void): Unsubscribe;
}

export default function authenticationDriver(): IAuthenticationDriver {
  const handleError = (error: AuthError): Error => {
    switch (error.code) {
      case 'auth/email-already-in-use':
      case 'auth/provider-already-linked':
        return new Error('このメールアドレスは既に登録されています');
      case 'auth/invalid-credential':
        return new Error('エラーが発生しました');
      case 'auth/invalid-email':
        return new Error('メールアドレスを確認してください');
      case 'auth/invalid-user-token':
        return new Error('再ログインしてください');
      case 'auth/invalid-verification-code':
        return new Error('認証コードを確認してください');
      case 'auth/invalid-verification-id':
        return new Error('エラーが発生しました');
      case 'auth/operation-not-allowed':
        return new Error('エラーが発生しました');
      case 'auth/requires-recent-login':
        return new Error('再認証が必要です');
      case 'auth/user-disabled':
        return new Error('このアカウントは無効化されています');
      case 'auth/user-mismatch':
        return new Error('パスワードを確認してください');
      case 'auth/user-not-found':
        return new Error('このメールアドレスは登録されていません');
      case 'auth/user-token-expired':
        return new Error('エラーが発生しました');
      case 'auth/weak-password':
        return new Error('より安全なパスワードを設定してください');
      case 'auth/wrong-password':
        return new Error('パスワードを確認してください');
      default:
        return new Error('エラーが発生しました');
    }
  };

  const sendPasswordResetEmail = async (email: string) =>
    FirebaseSendPasswordResetEmail(Firebase.instance.auth, email).catch((error) => {
      throw handleError(error);
    });

  const signIn = async (email: string, password: string) =>
    signInWithEmailAndPassword(Firebase.instance.auth, email, password).catch((error) => {
      throw handleError(error);
    });

  const signOut = async () =>
    FirebaseSignOut(Firebase.instance.auth).catch((error) => {
      throw handleError(error);
    });

  const subscribe = (nextOrObserver: (user: User | null) => void) =>
    onAuthStateChanged(Firebase.instance.auth, nextOrObserver);

  return { sendPasswordResetEmail, signIn, signOut, subscribe };
}
