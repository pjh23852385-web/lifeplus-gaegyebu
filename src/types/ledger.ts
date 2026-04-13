export interface LedgerItem {
  id: number;
  date: string;
  type: "income" | "expense";
  description: string;
  amount: number;
}
