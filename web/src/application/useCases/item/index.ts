/* eslint-disable no-use-before-define */
import { Item, ItemWithURL } from '../../../domains/item';
import { Medium } from '../../../domains/medium';
import { IItemRepository } from '../../../interface/repository/item';
import { IMediumRepository } from '../../../interface/repository/medium';
import { IItemUseCase } from '../../../interface/useCase/item';

export default function useItemUseCase(
  itemRepository: IItemRepository,
  mediumRepository: IMediumRepository
): IItemUseCase {
  const get = async (id: string) =>
    itemRepository.get(id).then(async (item) => {
      if (!item) return null;
      const url = await mediumRepository.getURL(item.medium.thumbnail || item.medium.path);
      return { ...item, url };
    });

  const listDeleted = async () =>
    itemRepository.listDeleted().then(async (items) =>
      Promise.all(
        items.map(async (item) => {
          const url = await mediumRepository.getURL(item.medium.thumbnail || item.medium.path);
          return { ...item, url };
        })
      )
    );

  const queueUpload = async (files: File[]) => {
    await Promise.all(Array.from(files).map(async (file) => upload(file)));
  };

  const restoreItems = async (ids: string[]) => itemRepository.restoreItems(ids);

  const softDelete = async (id: string) => itemRepository.softDelete(id);

  const subscribe = (limit: number, onNext: (items: ItemWithURL[]) => void) =>
    itemRepository.subscribe(limit, async (items) => {
      const itemsWithURL = await Promise.all(
        items.map(async (item) => {
          const url = await mediumRepository.getURL(item.medium.thumbnail || item.medium.path);
          return { ...item, url };
        })
      );
      onNext(itemsWithURL);
    });

  const upload = async (file: File) => {
    const id = itemRepository.getId();

    // Upload file to Firestore Storage
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

    // Save item to Firebase Firestore
    // set UNIX epoch to date temporarily
    const item: Item = { id, date: new Date(0), medium };
    await itemRepository.create(item);
  };

  return { get, listDeleted, queueUpload, restoreItems, softDelete, subscribe, upload };
}
