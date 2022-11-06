import { ref, uploadBytes, UploadResult } from 'firebase/storage';

import { Medium } from '../../../domains/medium';
import Firebase, { handleStorageError } from '../firebase';

export interface IMediumDriver {
  upload(medium: Medium, data: File): Promise<UploadResult>;
}

export default function mediumDriver(): IMediumDriver {
  const upload = async (medium: Medium, file: File) =>
    uploadBytes(
      ref(Firebase.instance.storage, `media/${medium.id}/original.${medium.extension}`),
      file
    ).catch((error) => {
      throw handleStorageError(error);
    });

  return { upload };
}
