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

  const filters: { label: string; value: Filter; emoji: string }[] = [
    { label: "전체", value: "all", emoji: "&#x1F30D;" },
    { label: "수입", value: "income", emoji: "&#x1F6F8;" },
    { label: "지출", value: "expense", emoji: "&#x1F4A5;" },
  ];

  return (
    <div className="list-section">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[var(--nebula-pink)] to-[var(--nebula-orange)]" />
          <h2 className="text-lg font-bold text-[var(--star-white)]">&#x1F4AB; 거래 로그</h2>
        </div>
        <div className="flex gap-2">
          {filters.map(({ label, value, emoji }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                filter === value
                  ? "bg-gradient-to-r from-[var(--nebula-purple)] to-[var(--nebula-pink)] text-white border-transparent shadow-[0_0_15px_rgba(123,47,247,0.3)]"
                  : "bg-transparent text-[var(--text-dim)] border-[rgba(100,100,255,0.15)] hover:border-[var(--nebula-purple)] hover:text-[var(--nebula-purple)]"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: emoji }} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-card overflow-hidden animate-fade-up">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[var(--text-dim)] text-sm">
            &#x1F30C; 이 우주에는 아직 기록이 없습니다...
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center px-6 py-4 border-b border-[rgba(100,100,255,0.08)] last:border-b-0 hover:bg-[rgba(123,47,247,0.05)] transition-all duration-300 group"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-base mr-4 shrink-0 ${
                  item.type === "income"
                    ? "bg-[rgba(0,255,136,0.1)] shadow-[0_0_10px_rgba(0,255,136,0.1)]"
                    : "bg-[rgba(255,45,149,0.1)] shadow-[0_0_10px_rgba(255,45,149,0.1)]"
                }`}
              >
                {item.type === "income" ? "\u{1F6F8}" : "\u{1F4A5}"}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[var(--star-white)]">
                  {item.description}
                </div>
                <div className="text-xs text-[var(--text-dim)] mt-0.5">{item.date}</div>
              </div>
              <div
                className={`font-black text-[15px] mr-4 tabular-nums ${
                  item.type === "income"
                    ? "text-[var(--income-color)] drop-shadow-[0_0_8px_rgba(0,255,136,0.3)]"
                    : "text-[var(--expense-color)] drop-shadow-[0_0_8px_rgba(255,45,149,0.3)]"
                }`}
              >
                {item.type === "income" ? "+" : "-"}
                {formatMoney(item.amount)}
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="text-[var(--text-dim)] text-lg leading-none px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:text-[var(--nebula-pink)] hover:bg-[rgba(255,45,149,0.1)] transition-all cursor-pointer"
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
