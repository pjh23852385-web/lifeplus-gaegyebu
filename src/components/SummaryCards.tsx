"use client";

import { formatMoney } from "@/utils/format";

interface Props {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const cards = [
  {
    key: "income",
    label: "INCOMING",
    icon: "&#x1F6F8;",
    gradient: "from-[#00ff88] to-[#00cc66]",
    glowColor: "rgba(0,255,136,0.2)",
    borderColor: "rgba(0,255,136,0.3)",
    textColor: "text-[var(--income-color)]",
  },
  {
    key: "expense",
    label: "OUTGOING",
    icon: "&#x1F4A5;",
    gradient: "from-[#ff2d95] to-[#ff6b35]",
    glowColor: "rgba(255,45,149,0.2)",
    borderColor: "rgba(255,45,149,0.3)",
    textColor: "text-[var(--expense-color)]",
  },
  {
    key: "balance",
    label: "BALANCE",
    icon: "&#x1FA90;",
    gradient: "from-[#00d4ff] to-[#7b2ff7]",
    glowColor: "rgba(0,212,255,0.2)",
    borderColor: "rgba(0,212,255,0.3)",
    textColor: "text-[var(--balance-color)]",
  },
] as const;

export default function SummaryCards({ totalIncome, totalExpense, balance }: Props) {
  const values = { income: totalIncome, expense: totalExpense, balance };

  return (
    <div className="summary-section grid grid-cols-3 gap-5 mb-10 max-sm:grid-cols-1">
      {cards.map(({ key, label, icon, gradient, glowColor, borderColor, textColor }, i) => (
        <div
          key={key}
          className="relative group space-card p-6 text-center animate-fade-up"
          style={{
            animationDelay: `${i * 150}ms`,
            borderColor,
            boxShadow: `0 0 25px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity"
            style={{ backgroundImage: `linear-gradient(135deg, ${glowColor}, transparent)` }} />
          <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: icon }} />
          <div className="text-[10px] text-[var(--text-dim)] font-bold tracking-[3px] uppercase mb-2">
            {label}
          </div>
          <div className={`text-2xl font-black ${textColor} drop-shadow-[0_0_10px_${glowColor}]`}>
            {formatMoney(values[key])}
          </div>
        </div>
      ))}
    </div>
  );
}
