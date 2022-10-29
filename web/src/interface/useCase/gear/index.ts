import { Gear } from '../../../domains/gear';

export interface IGearUseCase {
  create(data: Gear): Promise<Error | void>;
}
