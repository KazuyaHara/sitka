/* eslint-disable import/prefer-default-export */
import create from 'zustand';

import { ItemWithURL } from '../../../domains/item';

type ItemState = { items: ItemWithURL[] };

export const useItemStore = create<ItemState>(() => ({ items: [] }));
