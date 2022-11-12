import { IMediumRepository } from '../../../interface/repository/medium';
import { IMediumUseCase } from '../../../interface/useCase/medium';

export default function useMediumUseCase(mediumRepository: IMediumRepository): IMediumUseCase {
  const getBlob = async (path: string) => mediumRepository.getBlob(path);

  return { getBlob };
}
