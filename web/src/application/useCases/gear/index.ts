import { Gear } from '../../../domains/gear';
import { IGearRepository } from '../../../interface/repository/gear';
import { GearSubmit, IGearUseCase } from '../../../interface/useCase/gear';

export default function useGearUseCase(gearRepository: IGearRepository): IGearUseCase {
  const create = async (data: GearSubmit) => {
    const params: Gear = { id: '', ...data };
    return gearRepository.create(params);
  };

  const destroy = async (gear: Gear) => {
    // TODO: check the gear is used in items
    await gearRepository.destroy(gear);
  };

  const list = async () => gearRepository.list();

  const update = async (id: string, data: GearSubmit) => {
    const params: Gear = { id, ...data };
    return gearRepository.update(params);
  };

  return { create, destroy, list, update };
}
