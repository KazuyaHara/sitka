import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

export default class Firebase {
  private _app: FirebaseApp;
  private _auth: Auth;
  private _firetore: Firestore;
  private static _instance: Firebase; // eslint-disable-line no-use-before-define

  private constructor() {
    this._app = initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    });

    this._auth = getAuth(this._app);
    this._auth.languageCode = 'ja';
    this._firetore = getFirestore(this._app);
  }

  public static get instance(): Firebase {
    if (!this._instance) this._instance = new Firebase();
    return this._instance;
  }

  public get app(): FirebaseApp {
    return this._app;
  }

  public get auth(): Auth {
    if (this._auth) return this._auth;
    this._auth = getAuth(this._app);
    return this._auth;
  }

  public get firetore(): Firestore {
    if (this._firetore) return this._firetore;
    this._firetore = getFirestore(this._app);
    return this._firetore;
  }
}
