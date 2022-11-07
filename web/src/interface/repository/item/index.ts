import { Item } from '../../../domains/item';

export interface IItemRepository {
  create(data: Item): Promise<void>;
  get(id: string): Promise<Item | null>;
  getId(): string;
  subscribe(limit: number, onNext: (items: Item[]) => void): () => void;
}
