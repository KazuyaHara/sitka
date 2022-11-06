import { Gear } from '../../../domains/gear';

export type GearSubmit = Pick<Gear, 'maker' | 'name' | 'type'>;

export interface IGearUseCase {
  create(gear: Gear): Promise<void>;
  destroy(gear: Gear): Promise<void>;
  list(): Promise<Gear[]>;
  update(gear: Gear): Promise<void>;
}
