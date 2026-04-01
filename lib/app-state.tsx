'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { seedItems, seedRecords } from './mock-data';
import { Borrower, Item, RecordItem } from './types';

type RentDraft = {
  selectedIds: string[];
  quantities: Record<string, number>;
  borrowerMode: 'class' | 'custom';
  grade: string;
  classRoom: string;
  customBorrower: string;
};

type AppState = {
  items: Item[];
  records: RecordItem[];
  adminPassword: string;
  rentDraft: RentDraft;
  toggleSelect: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setBorrowerMode: (mode: 'class' | 'custom') => void;
  setGrade: (value: string) => void;
  setClassRoom: (value: string) => void;
  setCustomBorrower: (value: string) => void;
  completeRent: () => void;
  completeReturn: (recordIds: string[]) => void;
  addItem: (payload: { name: string; total: number; quantitySelectable: boolean }) => void;
  removeItem: (id: string) => void;
  verifyAdmin: (password: string) => boolean;
  changePassword: (nextPassword: string) => void;
};

const Ctx = createContext<AppState | null>(null);

function buildBorrowerText(draft: RentDraft): string {
  if (draft.borrowerMode === 'class') {
    return `${draft.grade}학년 ${draft.classRoom}반`;
  }
  return draft.customBorrower.trim() || '직접 입력 사용자';
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>(seedItems);
  const [records, setRecords] = useState<RecordItem[]>(seedRecords);
  const [adminPassword, setAdminPassword] = useState('0000');
  const [rentDraft, setRentDraft] = useState<RentDraft>({
    selectedIds: [],
    quantities: {},
    borrowerMode: 'class',
    grade: '4',
    classRoom: '3',
    customBorrower: ''
  });

  const value = useMemo<AppState>(
    () => ({
      items,
      records,
      adminPassword,
      rentDraft,
      toggleSelect: (id) => {
        setRentDraft((prev) => ({
          ...prev,
          selectedIds: prev.selectedIds.includes(id)
            ? prev.selectedIds.filter((v) => v !== id)
            : [...prev.selectedIds, id]
        }));
      },
      setQuantity: (id, quantity) => {
        setRentDraft((prev) => ({ ...prev, quantities: { ...prev.quantities, [id]: Math.max(0, quantity) } }));
      },
      setBorrowerMode: (mode) => setRentDraft((prev) => ({ ...prev, borrowerMode: mode })),
      setGrade: (value) => setRentDraft((prev) => ({ ...prev, grade: value })),
      setClassRoom: (value) => setRentDraft((prev) => ({ ...prev, classRoom: value })),
      setCustomBorrower: (value) => setRentDraft((prev) => ({ ...prev, customBorrower: value })),
      completeRent: () => {
        const borrowerText = buildBorrowerText(rentDraft);
        const now = '데모 시각';
        const selected = items.filter((item) => rentDraft.selectedIds.includes(item.id));

        setItems((prev) =>
          prev.map((item) => {
            const selectedItem = selected.find((s) => s.id === item.id);
            if (!selectedItem) return item;
            const q = rentDraft.quantities[item.id] || 1;
            return { ...item, remaining: Math.max(0, item.remaining - q) };
          })
        );

        setRecords((prev) => [
          ...selected.map((item) => ({
            id: `${Date.now()}-${item.id}`,
            itemId: item.id,
            itemName: item.name,
            icon: item.icon,
            quantity: rentDraft.quantities[item.id] || 1,
            borrowerText,
            rentedAt: now,
            status: 'borrowed' as const
          })),
          ...prev
        ]);

        setRentDraft((prev) => ({ ...prev, selectedIds: [], quantities: {} }));
      },
      completeReturn: (recordIds) => {
        setRecords((prev) =>
          prev.map((r) => {
            if (!recordIds.includes(r.id)) return r;
            return { ...r, status: 'returned' as const };
          })
        );

        setItems((prev) =>
          prev.map((item) => {
            const returned = records.filter((r) => recordIds.includes(r.id) && r.itemId === item.id);
            const addBack = returned.reduce((acc, r) => acc + r.quantity, 0);
            return { ...item, remaining: Math.min(item.total, item.remaining + addBack) };
          })
        );
      },
      addItem: ({ name, total, quantitySelectable }) => {
        const id = `${Date.now()}`;
        setItems((prev) => [...prev, { id, name, icon: '📦', total, remaining: total, quantitySelectable }]);
      },
      removeItem: (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
      verifyAdmin: (password) => password === adminPassword,
      changePassword: (nextPassword) => setAdminPassword(nextPassword)
    }),
    [items, records, adminPassword, rentDraft]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('AppProvider is required');
  return ctx;
}
