import { Gear } from '../../../domains/gear';
import { IGearRepository } from '../../../interface/repository/gear';
import { GearSubmit, IGearUseCase } from '../../../interface/useCase/gear';

export default function useGearUseCase(gearRepository: IGearRepository): IGearUseCase {
  const create = async (data: GearSubmit) => gearRepository.create(new Gear(data));

  const destroy = async (gear: Gear) => {
    // TODO: check the gear is used in items
    await gearRepository.destroy(gear);
  };

  const list = async () => gearRepository.list();

  const update = async (id: string, data: GearSubmit) =>
    gearRepository.update(new Gear({ id, ...data }));

  return { create, destroy, list, update };
}
