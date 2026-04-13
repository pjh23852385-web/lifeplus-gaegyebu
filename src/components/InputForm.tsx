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

  return (
    <div className="form-section">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-[var(--accent)] rounded-sm" />
        <h2 className="text-lg font-bold text-[var(--text-dark)]">내역 입력</h2>
      </div>
      <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] mb-8 animate-fade-up">
        <div className="grid grid-cols-[160px_110px_1fr_140px_auto] gap-3 items-center max-md:grid-cols-2 max-sm:grid-cols-1">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(233,69,96,0.1)] outline-none transition-all"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-[var(--accent)] focus:bg-white outline-none transition-all"
          >
            <option value="expense">지출</option>
            <option value="income">수입</option>
          </select>
          <input
            type="text"
            placeholder="내용을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(233,69,96,0.1)] outline-none transition-all max-md:col-span-2 max-sm:col-span-1"
          />
          <input
            type="number"
            placeholder="금액 (원)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(233,69,96,0.1)] outline-none transition-all"
          />
          <button
            onClick={handleSubmit}
            className="px-7 py-3 bg-[var(--accent)] text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(233,69,96,0.3)] transition-all whitespace-nowrap max-md:col-span-2 max-sm:col-span-1"
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
