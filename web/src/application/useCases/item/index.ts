/* eslint-disable no-use-before-define */
import { Medium } from '../../../domains/medium';
import { IMediumRepository } from '../../../interface/repository/medium';
import { IItemUseCase } from '../../../interface/useCase/item';

export default function useItemUseCase(mediumRepository: IMediumRepository): IItemUseCase {
  const queueUpload = async (files: File[]) => {
    await Promise.all(Array.from(files).map(async (file) => upload(file)));
  };

  const upload = async (file: File) => {
    const id = 'test';

    // upload file to Firestore Storage
    const medium = new Medium({
      id,
      extension: file.name.split('.').pop() as Medium['extension'],
      mimeType: file.type as Medium['mimeType'],
      name: file.name,
    });
    await mediumRepository.upload(medium, file);
  };

  return { queueUpload, upload };
}
