import { Gear } from '../../../domains/gear';

export type GearSubmit = Pick<Gear, 'maker' | 'name' | 'type'>;

export interface IGearUseCase {
  create(data: GearSubmit): Promise<void>;
  list(): Promise<Gear[]>;
  update(id: string, data: GearSubmit): Promise<void>;
}
