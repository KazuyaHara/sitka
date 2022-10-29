import { Gear } from '../../../domains/gear';

export interface IGearRepository {
  create(data: Gear): Promise<void>;
  list(): Promise<Gear[]>;
}
