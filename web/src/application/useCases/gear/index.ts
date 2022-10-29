import { Gear } from '../../../domains/gear';
import { IGearRepository } from '../../../interface/repository/gear';
import { GearSubmit, IGearUseCase } from '../../../interface/useCase/gear';

export default function useGearUseCase(userRepository: IGearRepository): IGearUseCase {
  const create = async (data: GearSubmit) => userRepository.create(new Gear(data));

  const list = async () => userRepository.list();

  const update = async (id: string, data: GearSubmit) =>
    userRepository.update(new Gear({ id, ...data }));

  return { create, list, update };
}
