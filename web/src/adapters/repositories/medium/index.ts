import { Medium } from '../../../domains/medium';
import { IMediumRepository } from '../../../interface/repository/medium';
import mediumDriver from '../../infrastructure/medium';

export default function mediumRepository(): IMediumRepository {
  const upload = async (medium: Medium, file: File) => {
    const result = await mediumDriver().upload(medium, file);
    const updatedMedium = medium;
    updatedMedium.path = result.ref.fullPath;
    updatedMedium.thumbnail = result.ref.fullPath;
    return updatedMedium;
  };

  return { upload };
}
