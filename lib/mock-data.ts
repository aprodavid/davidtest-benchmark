import { Item, RecordItem } from './types';

export const seedItems: Item[] = [
  { id: 'basketball', name: '농구공', icon: '🏀', total: 15, remaining: 15, quantitySelectable: true },
  { id: 'vest', name: '팀 조끼 (세트)', icon: '🦺', total: 4, remaining: 4, quantitySelectable: true },
  { id: 'soccer', name: '축구공', icon: '⚽', total: 12, remaining: 12, quantitySelectable: true },
  { id: 'volleyball', name: '배구공', icon: '🏐', total: 10, remaining: 10, quantitySelectable: true },
  { id: 'tumble', name: '뜀틀 세트', icon: '🤸', total: 2, remaining: 2, quantitySelectable: false },
  { id: 'rope', name: '줄넘기', icon: '🪢', total: 30, remaining: 30, quantitySelectable: true }
];

export const seedRecords: RecordItem[] = [
  {
    id: 'r1',
    itemId: 'tumble',
    itemName: '뜀틀 세트',
    icon: '🤸',
    quantity: 1,
    borrowerText: '4학년 3반',
    rentedAt: '3월 29일 오후 07:41',
    status: 'returned'
  },
  {
    id: 'r2',
    itemId: 'basketball',
    itemName: '농구공',
    icon: '🏀',
    quantity: 1,
    borrowerText: '4학년 3반',
    rentedAt: '3월 29일 오후 07:41',
    status: 'borrowed'
  }
];
