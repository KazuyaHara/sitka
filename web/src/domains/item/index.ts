import { Medium } from '../medium';

export type Item = { id: string; date: Date; gearId?: string; medium: Medium };
export type ItemWithURL = Item & { url: string };
