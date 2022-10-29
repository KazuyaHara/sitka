import { Gear } from '../../../domains/gear';

export interface IGearUseCase {
  create(data: Gear): Promise<void>;
  get(id: string): Promise<Gear | null>;
  list(): Promise<Gear[]>;
}
