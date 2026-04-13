"use client";

import StarField from "@/components/StarField";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SummaryCards from "@/components/SummaryCards";
import InputForm from "@/components/InputForm";
import Charts from "@/components/Charts";
import TransactionList from "@/components/TransactionList";
import Footer from "@/components/Footer";
import { useLedger } from "@/hooks/useLedger";

export default function Home() {
  const { items, loading, addItem, deleteItem, totalIncome, totalExpense, balance } = useLedger();

  return (
    <>
      <StarField />
      <Header />
      <Hero />
      <main className="relative z-10 max-w-[960px] mx-auto px-6 py-8 flex-1">
        {loading && (
          <div className="text-center py-20 text-[var(--text-dim)] text-sm animate-pulse">
            데이터를 불러오는 중...
          </div>
        )}
        {!loading && (<>
        <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
        <InputForm onAdd={addItem} />
        <Charts items={items} />
        <TransactionList items={items} onDelete={deleteItem} />
        </>)}
      </main>
      <Footer />
    </>
  );
}
