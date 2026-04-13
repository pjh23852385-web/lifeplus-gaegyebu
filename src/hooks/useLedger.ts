"use client";

import { useState, useEffect, useCallback } from "react";
import { LedgerItem } from "@/types/ledger";
import { supabase } from "@/lib/supabase";

export function useLedger() {
  const [items, setItems] = useState<LedgerItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("ledger_items")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Failed to fetch:", error);
        return;
      }

      setItems(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = useCallback(
    async (item: Omit<LedgerItem, "id">) => {
      const { error } = await supabase.from("ledger_items").insert({
        date: item.date,
        type: item.type,
        description: item.description,
        amount: item.amount,
      });

      if (error) {
        console.error("Failed to add:", error);
        return;
      }

      fetchItems();
    },
    [fetchItems]
  );

  const deleteItem = useCallback(
    async (id: number) => {
      const { error } = await supabase
        .from("ledger_items")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Failed to delete:", error);
        return;
      }

      fetchItems();
    },
    [fetchItems]
  );

  const totalIncome = items
    .filter((i) => i.type === "income")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalExpense = items
    .filter((i) => i.type === "expense")
    .reduce((sum, i) => sum + i.amount, 0);

  return {
    items,
    loading,
    addItem,
    deleteItem,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
}
