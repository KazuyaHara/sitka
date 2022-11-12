export interface IMediumUseCase {
  getBlob(path: string): Promise<Blob>;
}
