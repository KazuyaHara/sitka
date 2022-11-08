import { ItemWithURL } from '../../../domains/item';

export type ItemSubmit = { files: File[] };

export interface IItemUseCase {
  get(id: string): Promise<ItemWithURL | null>;
  listDeleted(): Promise<ItemWithURL[]>;
  queueUpload(files: File[]): Promise<void>;
  restoreItems(ids: string[]): Promise<void>;
  softDelete(id: string): Promise<void>;
  subscribe(limit: number, onNext: (items: ItemWithURL[]) => void): () => void;
  upload(file: File): Promise<void>;
}
