import * as admin from 'firebase-admin';

admin.initializeApp();

export { processUploadedMedia } from './storage/media/onFinalize';
