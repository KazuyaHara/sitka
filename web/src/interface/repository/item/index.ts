import { Item } from '../../../domains/item';

export interface IItemRepository {
  create(data: Item): Promise<void>;
  get(id: string): Promise<Item | null>;
  getId(): string;
  listDeleted(): Promise<Item[]>;
  restoreItems(ids: string[]): Promise<void>;
  softDelete(id: string): Promise<void>;
  subscribe(limit: number, onNext: (items: Item[]) => void): () => void;
}
