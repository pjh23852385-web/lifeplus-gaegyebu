"use client";

import { formatMoney } from "@/utils/format";

interface Props {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const cards = [
  { key: "income", label: "INCOME", icon: "+", colorClass: "text-[var(--income-color)]", bgClass: "bg-[rgba(15,155,88,0.1)]" },
  { key: "expense", label: "EXPENSE", icon: "−", colorClass: "text-[var(--expense-color)]", bgClass: "bg-[rgba(233,69,96,0.1)]" },
  { key: "balance", label: "BALANCE", icon: "=", colorClass: "text-[var(--balance-color)]", bgClass: "bg-[rgba(26,115,232,0.1)]" },
] as const;

export default function SummaryCards({ totalIncome, totalExpense, balance }: Props) {
  const values = { income: totalIncome, expense: totalExpense, balance };

  return (
    <div className="summary-section grid grid-cols-3 gap-4 -mt-10 mb-8 relative z-10">
      {cards.map(({ key, label, icon, colorClass, bgClass }, i) => (
        <div
          key={key}
          className="bg-white rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 animate-fade-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl ${bgClass}`}>
            {icon}
          </div>
          <div className="text-xs text-[var(--text-light)] font-medium tracking-widest uppercase mb-1">
            {label}
          </div>
          <div className={`text-[22px] font-bold ${colorClass}`}>
            {formatMoney(values[key])}
          </div>
        </div>
      ))}
    </div>
  );
}
