"use client";

import { useState, useEffect, useCallback } from "react";
import { LedgerItem } from "@/types/ledger";
import { SAMPLE_DATA } from "@/data/sampleData";

const STORAGE_KEY = "household_ledger_nextjs";

export function useLedger() {
  const [items, setItems] = useState<LedgerItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && JSON.parse(stored).length > 0) {
      setItems(JSON.parse(stored));
    } else {
      setItems(SAMPLE_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_DATA));
    }
  }, []);

  const save = useCallback((data: LedgerItem[]) => {
    setItems(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const addItem = useCallback(
    (item: Omit<LedgerItem, "id">) => {
      const newItem = { ...item, id: Date.now() };
      save([...items, newItem]);
    },
    [items, save]
  );

  const deleteItem = useCallback(
    (id: number) => {
      save(items.filter((item) => item.id !== id));
    },
    [items, save]
  );

  const totalIncome = items
    .filter((i) => i.type === "income")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalExpense = items
    .filter((i) => i.type === "expense")
    .reduce((sum, i) => sum + i.amount, 0);

  return {
    items,
    addItem,
    deleteItem,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
}
