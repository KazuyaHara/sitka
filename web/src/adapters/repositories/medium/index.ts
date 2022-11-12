import { Medium } from '../../../domains/medium';
import { IMediumRepository } from '../../../interface/repository/medium';
import mediumDriver from '../../infrastructure/medium';

export default function mediumRepository(): IMediumRepository {
  const getBlob = async (path: string): Promise<Blob> => mediumDriver().getBlob(path);

  const getURL = async (path: string): Promise<string> => mediumDriver().getURL(path);

  const upload = async (medium: Medium, file: File): Promise<Medium> => {
    const result = await mediumDriver().upload(medium, file);
    return { ...medium, path: result.ref.fullPath, thumbnail: result.ref.fullPath };
  };

  return { getBlob, getURL, upload };
}
