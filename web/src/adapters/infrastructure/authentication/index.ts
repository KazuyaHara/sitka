/* eslint-disable import/prefer-default-export */
import { onAuthStateChanged } from 'firebase/auth';

import { useAuthStore } from '../../userInterface/store/authentication';
import Firebase from '../firebase';

export class AuthenticationAdapter {
  static subscribe(): () => void {
    const onComplete = () => useAuthStore.setState({ initializing: false });
    const onError = () => {};

    return onAuthStateChanged(Firebase.instance.auth, onComplete, onError, onComplete);
  }
}
