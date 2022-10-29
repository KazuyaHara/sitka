import { Gear } from '../../../domains/gear';
import { IGearRepository } from '../../../interface/repository/gear';
import { IGearUseCase } from '../../../interface/useCase/gear';

export type CreateSubmit = Gear;

export default function useGearUseCase(userRepository: IGearRepository): IGearUseCase {
  const create = async (data: CreateSubmit) => userRepository.create(data);

  return { create };
}
