"use client";

import { useState } from "react";
import { LedgerItem } from "@/types/ledger";
import { formatMoney } from "@/utils/format";

interface Props {
  items: LedgerItem[];
  onDelete: (id: number) => void;
}

type Filter = "all" | "income" | "expense";

export default function TransactionList({ items, onDelete }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = (filter === "all" ? items : items.filter((i) => i.type === filter))
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  const filters: { label: string; value: Filter }[] = [
    { label: "전체", value: "all" },
    { label: "수입", value: "income" },
    { label: "지출", value: "expense" },
  ];

  return (
    <div className="list-section">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[var(--accent)] rounded-sm" />
          <h2 className="text-lg font-bold text-[var(--text-dark)]">거래 내역</h2>
        </div>
        <div className="flex gap-2">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-[18px] py-2 rounded-3xl text-[13px] font-medium border transition-all cursor-pointer ${
                filter === value
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-white text-[var(--text-mid)] border-gray-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden animate-fade-up">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[var(--text-light)] text-sm">
            내역이 없습니다.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-sm mr-3.5 shrink-0 ${
                  item.type === "income"
                    ? "bg-[rgba(15,155,88,0.1)]"
                    : "bg-[rgba(233,69,96,0.1)]"
                }`}
              >
                {item.type === "income" ? "↑" : "↓"}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[var(--text-dark)]">
                  {item.description}
                </div>
                <div className="text-xs text-[var(--text-light)] mt-0.5">
                  {item.date}
                </div>
              </div>
              <div
                className={`font-bold text-[15px] mr-4 tabular-nums ${
                  item.type === "income"
                    ? "text-[var(--income-color)]"
                    : "text-[var(--expense-color)]"
                }`}
              >
                {item.type === "income" ? "+" : "-"}
                {formatMoney(item.amount)}
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="text-gray-300 text-lg leading-none px-2 py-1.5 rounded-lg hover:text-[var(--accent)] hover:bg-[rgba(233,69,96,0.08)] transition-all cursor-pointer"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
