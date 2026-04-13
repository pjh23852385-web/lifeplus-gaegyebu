"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SummaryCards from "@/components/SummaryCards";
import InputForm from "@/components/InputForm";
import Charts from "@/components/Charts";
import TransactionList from "@/components/TransactionList";
import Footer from "@/components/Footer";
import { useLedger } from "@/hooks/useLedger";

export default function Home() {
  const { items, addItem, deleteItem, totalIncome, totalExpense, balance } = useLedger();

  return (
    <>
      <Header />
      <Hero />
      <main className="max-w-[960px] mx-auto px-6 py-8 flex-1">
        <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
        <InputForm onAdd={addItem} />
        <Charts items={items} />
        <TransactionList items={items} onDelete={deleteItem} />
      </main>
      <Footer />
    </>
  );
}
