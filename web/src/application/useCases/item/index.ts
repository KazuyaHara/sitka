/* eslint-disable no-use-before-define */
import { Item } from '../../../domains/item';
import { Medium } from '../../../domains/medium';
import { IItemRepository } from '../../../interface/repository/item';
import { IMediumRepository } from '../../../interface/repository/medium';
import { IItemUseCase } from '../../../interface/useCase/item';

export default function useItemUseCase(
  itemRepository: IItemRepository,
  mediumRepository: IMediumRepository
): IItemUseCase {
  const queueUpload = async (files: File[]) => {
    await Promise.all(Array.from(files).map(async (file) => upload(file)));
  };

  const upload = async (file: File) => {
    const id = itemRepository.getId();

    // upload file to Firestore Storage
    let medium: Medium = {
      id,
      archived: false,
      extension: file.name.split('.').pop()?.toLowerCase() as Medium['extension'],
      mimeType: file.type as Medium['mimeType'],
      name: file.name,
      path: '',
      thumbnail: '',
    };
    medium = await mediumRepository.upload(medium, file);

    // save item to Firebase Firestore
    const item: Item = { id, medium };
    await itemRepository.create(item);
  };

  return { queueUpload, upload };
}
