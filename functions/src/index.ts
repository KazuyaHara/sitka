import * as admin from 'firebase-admin';

admin.initializeApp();

export { batchDeleteItems } from './firestore/item/batchDeleteItems';
export { processUploadedMedia } from './storage/media/onFinalize';
