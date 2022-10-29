import { Gear } from '../../../domains/gear';

export interface IGearRepository {
  create(data: Gear): Promise<void>;
  destroy(data: Gear): Promise<void>;
  list(): Promise<Gear[]>;
  update(data: Gear): Promise<void>;
}
