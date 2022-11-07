import { Item } from '../../../domains/item';
import { IItemRepository } from '../../../interface/repository/item';
import itemDriver from '../../infrastructure/item';

export default function itemRepository(): IItemRepository {
  const create = async (data: Item): Promise<void> => {
    await itemDriver().create(data);
  };

  const get = async (id: string): Promise<Item | null> =>
    itemDriver()
      .get(id)
      .then((doc) => {
        if (!doc.exists()) return null;
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        };
      });

  const getId = (): string => itemDriver().getId();

  const softDelete = (id: string): Promise<void> => itemDriver().softDelete(id);

  const subscribe = (limit: number, onNext: (items: Item[]) => void) =>
    itemDriver().subscribe(limit, (querySnapshot) =>
      onNext(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date.toDate(),
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
          };
        })
      )
    );

  return { create, get, getId, softDelete, subscribe };
}
