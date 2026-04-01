import { Item, StoredState } from './types';

export const DEFAULT_ADMIN_PIN = '0000';

export const seedItems: Item[] = [
  { id: 'basketball', name: '농구공', icon: '🏀', total: 15, quantitySelectable: true },
  { id: 'vest-set', name: '팀 조끼 (세트)', icon: '🦺', total: 4, quantitySelectable: false },
  { id: 'soccerball', name: '축구공', icon: '⚽', total: 12, quantitySelectable: true },
  { id: 'volleyball', name: '배구공', icon: '🏐', total: 10, quantitySelectable: true },
  { id: 'vaulting-set', name: '뜀틀 세트', icon: '🤸', total: 2, quantitySelectable: false },
  { id: 'jump-rope', name: '줄넘기', icon: '🪢', total: 30, quantitySelectable: true }
];

export const initialStoredState: StoredState = {
  items: seedItems,
  activeLoans: [],
  history: [],
  adminPin: DEFAULT_ADMIN_PIN
};
