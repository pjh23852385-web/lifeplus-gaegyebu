"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { LedgerItem } from "@/types/ledger";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface Props {
  items: LedgerItem[];
}

const CATEGORIES: Record<string, string[]> = {
  식비: ["마트", "장보기", "점심", "배달", "카페", "커피", "편의점", "간식"],
  고정지출: ["월세", "통신비", "전기세", "수도세", "구독", "넷플릭스"],
  교통: ["교통", "택시", "주유"],
  "쇼핑/생활": ["옷", "생활용품", "약국", "헤어"],
  "여가/문화": ["영화", "모임", "회식", "도서"],
};

const tooltipStyle = {
  backgroundColor: "rgba(26,26,46,0.9)" as const,
  padding: 12,
  cornerRadius: 10,
};

export default function Charts({ items }: Props) {
  // 일별 차트 데이터
  const dates = [...new Set(items.map((d) => d.date))].sort();
  const dailyIncome: Record<string, number> = {};
  const dailyExpense: Record<string, number> = {};
  dates.forEach((d) => { dailyIncome[d] = 0; dailyExpense[d] = 0; });
  items.forEach((item) => {
    if (item.type === "income") dailyIncome[item.date] += item.amount;
    else dailyExpense[item.date] += item.amount;
  });

  // 카테고리 파이차트 데이터
  const catTotals: Record<string, number> = {};
  items.filter((d) => d.type === "expense").forEach((item) => {
    let matched = "기타";
    for (const [cat, keywords] of Object.entries(CATEGORIES)) {
      if (keywords.some((kw) => item.description.includes(kw))) { matched = cat; break; }
    }
    catTotals[matched] = (catTotals[matched] || 0) + item.amount;
  });

  // 주간별 데이터
  const weekLabels = ["1주차", "2주차", "3주차", "4주차", "5주차"];
  const weekTotals = [0, 0, 0, 0, 0];
  items.filter((d) => d.type === "expense").forEach((item) => {
    const day = parseInt(item.date.slice(-2));
    if (day <= 7) weekTotals[0] += item.amount;
    else if (day <= 14) weekTotals[1] += item.amount;
    else if (day <= 21) weekTotals[2] += item.amount;
    else if (day <= 28) weekTotals[3] += item.amount;
    else weekTotals[4] += item.amount;
  });
  const filteredWeekLabels = weekLabels.filter((_, i) => weekTotals[i] > 0);
  const filteredWeekTotals = weekTotals.filter((v) => v > 0);

  const tickCallback = (v: number | string) => Number(v) / 10000 + "만";
  const moneyLabel = (ctx: { dataset: { label?: string }; raw: unknown }) =>
    (ctx.dataset.label ? ctx.dataset.label + ": " : "") + (ctx.raw as number).toLocaleString() + "원";

  return (
    <div className="chart-section mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-[var(--accent)] rounded-sm" />
        <h2 className="text-lg font-bold text-[var(--text-dark)]">월간 분석</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {/* 일별 수입/지출 */}
        <div className="col-span-2 max-sm:col-span-1 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow animate-fade-up">
          <h3 className="text-sm font-semibold text-[var(--text-mid)] mb-4">일별 수입 / 지출 추이</h3>
          <Bar
            data={{
              labels: dates.map((d) => d.slice(5)),
              datasets: [
                { label: "수입", data: dates.map((d) => dailyIncome[d]), backgroundColor: "rgba(15,155,88,0.75)", borderRadius: 6 },
                { label: "지출", data: dates.map((d) => dailyExpense[d]), backgroundColor: "rgba(233,69,96,0.75)", borderRadius: 6 },
              ],
            }}
            options={{
              responsive: true,
              interaction: { intersect: false, mode: "index" },
              plugins: {
                legend: { position: "top", labels: { usePointStyle: true, pointStyle: "circle", padding: 20 } },
                tooltip: { ...tooltipStyle, callbacks: { label: moneyLabel } },
              },
              scales: {
                y: { grid: { color: "rgba(0,0,0,0.04)" }, ticks: { callback: tickCallback } },
                x: { grid: { display: false } },
              },
            }}
          />
        </div>

        {/* 지출 카테고리 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h3 className="text-sm font-semibold text-[var(--text-mid)] mb-4">지출 카테고리 비율</h3>
          <Doughnut
            data={{
              labels: Object.keys(catTotals),
              datasets: [{
                data: Object.values(catTotals),
                backgroundColor: ["#e94560", "#1a73e8", "#f39c12", "#9b59b6", "#0f9b58", "#95a5a6"],
                borderWidth: 3,
                borderColor: "#fff",
                hoverOffset: 8,
              }],
            }}
            options={{
              responsive: true,
              cutout: "60%",
              plugins: {
                legend: { position: "bottom", labels: { padding: 16, usePointStyle: true, pointStyle: "circle", font: { size: 12 } } },
                tooltip: {
                  ...tooltipStyle,
                  callbacks: {
                    label: (ctx) => {
                      const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
                      const pct = ((ctx.raw as number) / total * 100).toFixed(1);
                      return `${ctx.label}: ${(ctx.raw as number).toLocaleString()}원 (${pct}%)`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* 주간별 지출 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow animate-fade-up" style={{ animationDelay: "200ms" }}>
          <h3 className="text-sm font-semibold text-[var(--text-mid)] mb-4">주간별 지출 현황</h3>
          <Bar
            data={{
              labels: filteredWeekLabels,
              datasets: [{
                label: "지출",
                data: filteredWeekTotals,
                backgroundColor: ["#e94560", "#1a73e8", "#f39c12", "#0f9b58", "#9b59b6"],
                borderRadius: 8,
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { ...tooltipStyle, callbacks: { label: moneyLabel } },
              },
              scales: {
                y: { grid: { color: "rgba(0,0,0,0.04)" }, ticks: { callback: tickCallback } },
                x: { grid: { display: false } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
