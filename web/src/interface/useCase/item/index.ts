import { ItemWithURL } from '../../../domains/item';

export type ItemSubmit = { files: File[] };

export interface IItemUseCase {
  queueUpload(files: File[]): Promise<void>;
  subscribe(limit: number, onNext: (items: ItemWithURL[]) => void): () => void;
  upload(file: File): Promise<void>;
}
