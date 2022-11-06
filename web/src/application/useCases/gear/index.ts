import { Gear } from '../../../domains/gear';
import { IGearRepository } from '../../../interface/repository/gear';
import { IGearUseCase } from '../../../interface/useCase/gear';

export default function useGearUseCase(gearRepository: IGearRepository): IGearUseCase {
  const create = async (gear: Gear) => gearRepository.create(gear);

  const destroy = async (gear: Gear) => {
    // TODO: check the gear is used in items
    await gearRepository.destroy(gear);
  };

  const list = async () => gearRepository.list();

  const update = async (gear: Gear) => gearRepository.update(gear);

  return { create, destroy, list, update };
}
