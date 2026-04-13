"use client";

import { useState } from "react";
import { LedgerItem } from "@/types/ledger";
import { todayString } from "@/utils/format";

interface Props {
  onAdd: (item: Omit<LedgerItem, "id">) => void;
}

export default function InputForm({ onAdd }: Props) {
  const [date, setDate] = useState(todayString());
  const [type, setType] = useState<"income" | "expense">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const parsedAmount = parseInt(amount);
    if (!date || !description.trim() || !parsedAmount || parsedAmount <= 0) {
      alert("모든 항목을 올바르게 입력해주세요.");
      return;
    }
    onAdd({ date, type, description: description.trim(), amount: parsedAmount });
    setDescription("");
    setAmount("");
  };

  const inputClass =
    "px-4 py-3 bg-[rgba(15,15,40,0.6)] border border-[rgba(123,47,247,0.2)] rounded-xl text-sm text-[var(--star-white)] placeholder-[var(--text-dim)] outline-none transition-all focus:border-[var(--nebula-purple)] focus:shadow-[0_0_15px_rgba(123,47,247,0.2)] backdrop-blur-sm";

  return (
    <div className="form-section mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[var(--nebula-purple)] to-[var(--nebula-pink)]" />
        <h2 className="text-lg font-bold text-[var(--star-white)]">&#x1F680; 기록 추가</h2>
      </div>
      <div className="space-card p-7 animate-fade-up">
        <div className="grid grid-cols-[160px_110px_1fr_140px_auto] gap-3 items-center max-md:grid-cols-2 max-sm:grid-cols-1">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="expense">&#x1F4A5; 지출</option>
            <option value="income">&#x1F6F8; 수입</option>
          </select>
          <input
            type="text"
            placeholder="우주 어디에 사용했나요?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} max-md:col-span-2 max-sm:col-span-1`}
          />
          <input
            type="number"
            placeholder="금액 (원)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={inputClass}
          />
          <button
            onClick={handleSubmit}
            className="px-7 py-3 rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap transition-all duration-300 bg-gradient-to-r from-[var(--nebula-purple)] to-[var(--nebula-pink)] text-white hover:shadow-[0_0_25px_rgba(123,47,247,0.4)] hover:-translate-y-0.5 active:scale-95 max-md:col-span-2 max-sm:col-span-1"
          >
            발사 &#x1F680;
          </button>
        </div>
      </div>
    </div>
  );
}
