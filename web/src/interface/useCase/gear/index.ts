import { Gear } from '../../../domains/gear';

export interface IGearUseCase {
  create(data: Gear): Promise<void>;
  list(): Promise<Gear[]>;
}
