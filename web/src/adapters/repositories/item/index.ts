import { Item } from '../../../domains/item';
import { IItemRepository } from '../../../interface/repository/item';
import itemDriver from '../../infrastructure/item';

export default function itemRepository(): IItemRepository {
  const create = async (data: Item): Promise<void> => {
    await itemDriver().create(data);
  };

  const getId = (): string => itemDriver().getId();

  return { create, getId };
}
