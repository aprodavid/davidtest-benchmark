export type Item = {
  id: string;
  name: string;
  icon: string;
  total: number;
  quantitySelectable: boolean;
};

export type LoanLine = {
  itemId: string;
  itemName: string;
  icon: string;
  quantity: number;
};

export type ActiveLoan = {
  id: string;
  borrowerType: 'class' | 'custom';
  borrowerLabel: string;
  borrowedAt: string;
  lines: LoanLine[];
};

export type HistoryEntry = {
  id: string;
  loanId: string;
  status: 'borrowed' | 'returned';
  borrowedAt: string;
  returnedAt?: string;
  borrowerLabel: string;
  line: LoanLine;
};

export type BorrowDraft = {
  selectedItemIds: string[];
  quantities: Record<string, number>;
  borrowerTab: 'class' | 'custom';
  grade: string;
  classRoom: string;
  customName: string;
};

export type StoredState = {
  items: Item[];
  activeLoans: ActiveLoan[];
  history: HistoryEntry[];
  adminPin: string;
};
