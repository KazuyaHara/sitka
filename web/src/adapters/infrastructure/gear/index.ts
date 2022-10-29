import {
  addDoc,
  collection,
  DocumentReference,
  FirestoreError,
  getDocs,
  QuerySnapshot,
  serverTimestamp,
} from 'firebase/firestore';

import { Gear } from '../../../domains/gear';
import Firebase from '../firebase';

export interface IGearDriver {
  create(data: Gear): Promise<Error | DocumentReference>;
  list(): Promise<QuerySnapshot>;
}

export default function gearDriver(): IGearDriver {
  const gearsRef = collection(Firebase.instance.firetore, 'gears');

  const handleError = (error: FirestoreError): Error => {
    switch (error.code) {
      case 'already-exists':
        return new Error('既に同じデータが存在しています');
      case 'not-found':
        return new Error('データが見つかりませんでした');
      case 'permission-denied':
        return new Error('権限が不足しています');
      default:
        return new Error('エラーが発生しました');
    }
  };

  const create = async (data: Gear) =>
    addDoc(gearsRef, {
      maker: data.maker,
      name: data.name,
      type: data.type,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch((error) => {
      throw handleError(error);
    });

  const list = async () =>
    getDocs(gearsRef).catch((error) => {
      throw handleError(error);
    });

  return { create, list };
}
