import {
  addDoc,
  collection,
  DocumentReference,
  FirestoreError,
  serverTimestamp,
} from 'firebase/firestore';

import { Gear } from '../../../domains/gear';
import Firebase from '../firebase';

export interface IGearDriver {
  create(data: Gear): Promise<Error | DocumentReference>;
}

export default function gearDriver(): IGearDriver {
  const handleError = (error: FirestoreError): Error => {
    switch (error.code) {
      case 'already-exists':
        throw new Error('既に同じデータが存在しています');
      case 'not-found':
        throw new Error('データが見つかりませんでした');
      case 'permission-denied':
        throw new Error('権限が不足しています');
      default:
        throw new Error('エラーが発生しました');
    }
  };

  const create = async (data: Gear) => {
    const gearsRef = collection(Firebase.instance.firetore, 'gears');
    return addDoc(gearsRef, {
      maker: data.maker,
      name: data.name,
      type: data.type,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch(handleError);
  };

  return { create };
}
