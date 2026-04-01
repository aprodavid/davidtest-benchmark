export type Item = {
  id: string;
  name: string;
  icon: string;
  total: number;
  remaining: number;
  quantitySelectable: boolean;
};

export type Borrower =
  | { mode: 'class'; grade: string; classRoom: string }
  | { mode: 'custom'; label: string };

export type RecordItem = {
  id: string;
  itemId: string;
  itemName: string;
  icon: string;
  quantity: number;
  borrowerText: string;
  rentedAt: string;
  status: 'borrowed' | 'returned';
};
