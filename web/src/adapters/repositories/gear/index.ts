import { Gear } from '../../../domains/gear';
import { IGearUseCase } from '../../../interface/useCase/gear';
import gearDriver from '../../infrastructure/gear';

export default function gearRepository(): IGearUseCase {
  const create = async (data: Gear) => {
    await gearDriver().create(data);
  };

  return { create };
}
