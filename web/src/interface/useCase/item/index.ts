export type ItemSubmit = { files: File[] };

export interface IItemUseCase {
  queueUpload(files: File[]): Promise<void>;
  upload(file: File): Promise<void>;
}
