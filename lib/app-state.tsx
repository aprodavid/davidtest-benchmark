'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialStoredState } from './mock-data';
import { ActiveLoan, BorrowDraft, HistoryEntry, Item, LoanLine, StoredState } from './types';

const STORAGE_KEY = 'gym-loan-app-v1';

type AppState = {
  hydrated: boolean;
  items: Item[];
  activeLoans: ActiveLoan[];
  history: HistoryEntry[];
  adminPin: string;
  draft: BorrowDraft;
  getRemainingCount: (itemId: string) => number;
  toggleDraftItem: (itemId: string) => void;
  setDraftQuantity: (itemId: string, value: number) => void;
  setDraftTab: (tab: 'class' | 'custom') => void;
  setDraftGrade: (grade: string) => void;
  setDraftClass: (classRoom: string) => void;
  setDraftCustomName: (name: string) => void;
  submitBorrow: () => void;
  submitReturn: (loanIds: string[]) => void;
  addItem: (payload: { name: string; total: number; quantitySelectable: boolean }) => void;
  deleteItem: (itemId: string) => void;
  verifyAdminPin: (pin: string) => boolean;
  updateAdminPin: (pin: string) => void;
};

const AppContext = createContext<AppState | null>(null);

const initialDraft: BorrowDraft = {
  selectedItemIds: [],
  quantities: {},
  borrowerTab: 'class',
  grade: '4',
  classRoom: '3',
  customName: ''
};

function formatNow() {
  return new Date().toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function buildBorrowerLabel(draft: BorrowDraft) {
  return draft.borrowerTab === 'class'
    ? `${draft.grade}학년 ${draft.classRoom}반`
    : draft.customName.trim() || '직접 입력';
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [items, setItems] = useState<Item[]>(initialStoredState.items);
  const [activeLoans, setActiveLoans] = useState<ActiveLoan[]>(initialStoredState.activeLoans);
  const [history, setHistory] = useState<HistoryEntry[]>(initialStoredState.history);
  const [adminPin, setAdminPin] = useState(initialStoredState.adminPin);
  const [draft, setDraft] = useState<BorrowDraft>(initialDraft);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStoredState));
      } else {
        const parsed = JSON.parse(raw) as Partial<StoredState>;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(parsed.items?.length ? parsed.items : initialStoredState.items);
        setActiveLoans(parsed.activeLoans ?? []);
        setHistory(parsed.history ?? []);
        setAdminPin(parsed.adminPin || initialStoredState.adminPin);
      }
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStoredState));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const nextStored: StoredState = { items, activeLoans, history, adminPin };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStored));
  }, [hydrated, items, activeLoans, history, adminPin]);

  const remainingMap = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => map.set(item.id, item.total));
    activeLoans.forEach((loan) => {
      loan.lines.forEach((line) => {
        const current = map.get(line.itemId) ?? 0;
        map.set(line.itemId, Math.max(0, current - line.quantity));
      });
    });
    return map;
  }, [items, activeLoans]);

  const value = useMemo<AppState>(
    () => ({
      hydrated,
      items,
      activeLoans,
      history,
      adminPin,
      draft,
      getRemainingCount: (itemId) => remainingMap.get(itemId) ?? 0,
      toggleDraftItem: (itemId) => {
        setDraft((prev) => ({
          ...prev,
          selectedItemIds: prev.selectedItemIds.includes(itemId)
            ? prev.selectedItemIds.filter((id) => id !== itemId)
            : [...prev.selectedItemIds, itemId]
        }));
      },
      setDraftQuantity: (itemId, value) => {
        const max = remainingMap.get(itemId) ?? 1;
        const bounded = Math.max(1, Math.min(max, value));
        setDraft((prev) => ({ ...prev, quantities: { ...prev.quantities, [itemId]: bounded } }));
      },
      setDraftTab: (tab) => setDraft((prev) => ({ ...prev, borrowerTab: tab })),
      setDraftGrade: (grade) => setDraft((prev) => ({ ...prev, grade })),
      setDraftClass: (classRoom) => setDraft((prev) => ({ ...prev, classRoom })),
      setDraftCustomName: (name) => setDraft((prev) => ({ ...prev, customName: name })),
      submitBorrow: () => {
        if (!draft.selectedItemIds.length) return;

        const borrowerLabel = buildBorrowerLabel(draft);
        const borrowedAt = formatNow();
        const lines: LoanLine[] = draft.selectedItemIds
          .map((itemId) => {
            const item = items.find((value) => value.id === itemId);
            if (!item) return null;
            return {
              itemId,
              itemName: item.name,
              icon: item.icon,
              quantity: item.quantitySelectable ? draft.quantities[itemId] ?? 1 : 1
            };
          })
          .filter((line): line is LoanLine => !!line && line.quantity > 0);

        if (!lines.length) return;

        const loanId = crypto.randomUUID();
        const nextLoan: ActiveLoan = {
          id: loanId,
          borrowerType: draft.borrowerTab,
          borrowerLabel,
          borrowedAt,
          lines
        };

        setActiveLoans((prev) => [nextLoan, ...prev]);
        setHistory((prev) => [
          ...lines.map((line) => ({
            id: crypto.randomUUID(),
            loanId,
            status: 'borrowed' as const,
            borrowedAt,
            borrowerLabel,
            line
          })),
          ...prev
        ]);
        setDraft(initialDraft);
      },
      submitReturn: (loanIds) => {
        if (!loanIds.length) return;
        const returning = activeLoans.filter((loan) => loanIds.includes(loan.id));
        const returnedAt = formatNow();

        setActiveLoans((prev) => prev.filter((loan) => !loanIds.includes(loan.id)));
        setHistory((prev) => [
          ...returning.flatMap((loan) =>
            loan.lines.map((line) => ({
              id: crypto.randomUUID(),
              loanId: loan.id,
              status: 'returned' as const,
              borrowedAt: loan.borrowedAt,
              returnedAt,
              borrowerLabel: loan.borrowerLabel,
              line
            }))
          ),
          ...prev
        ]);
      },
      addItem: ({ name, total, quantitySelectable }) => {
        const nextItem: Item = {
          id: crypto.randomUUID(),
          name,
          icon: '📦',
          total: Math.max(1, total),
          quantitySelectable
        };
        setItems((prev) => [...prev, nextItem]);
      },
      deleteItem: (itemId) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      },
      verifyAdminPin: (pin) => pin === adminPin,
      updateAdminPin: (pin) => {
        if (pin.trim()) setAdminPin(pin.trim());
      }
    }),
    [hydrated, items, activeLoans, history, adminPin, draft, remainingMap]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('AppProvider is required');
  return ctx;
}
