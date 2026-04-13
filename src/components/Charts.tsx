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
  backgroundColor: "rgba(10,10,30,0.95)" as const,
  borderColor: "rgba(123,47,247,0.3)",
  borderWidth: 1,
  padding: 14,
  cornerRadius: 12,
  titleColor: "#e8e8ff",
  bodyColor: "#a0a0cc",
};

const gridColor = "rgba(123, 47, 247, 0.08)";
const cosmicColors = ["#ff2d95", "#7b2ff7", "#00d4ff", "#ff6b35", "#00ff88", "#ffcc00"];

export default function Charts({ items }: Props) {
  const dates = [...new Set(items.map((d) => d.date))].sort();
  const dailyIncome: Record<string, number> = {};
  const dailyExpense: Record<string, number> = {};
  dates.forEach((d) => { dailyIncome[d] = 0; dailyExpense[d] = 0; });
  items.forEach((item) => {
    if (item.type === "income") dailyIncome[item.date] += item.amount;
    else dailyExpense[item.date] += item.amount;
  });

  const catTotals: Record<string, number> = {};
  items.filter((d) => d.type === "expense").forEach((item) => {
    let matched = "기타";
    for (const [cat, keywords] of Object.entries(CATEGORIES)) {
      if (keywords.some((kw) => item.description.includes(kw))) { matched = cat; break; }
    }
    catTotals[matched] = (catTotals[matched] || 0) + item.amount;
  });

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

  const scaleOptions = {
    y: { grid: { color: gridColor }, ticks: { callback: tickCallback, color: "#6060aa" } },
    x: { grid: { display: false }, ticks: { color: "#6060aa" } },
  };

  return (
    <div className="chart-section mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[var(--nebula-blue)] to-[var(--nebula-purple)]" />
        <h2 className="text-lg font-bold text-[var(--star-white)]">&#x1F30C; 우주 분석</h2>
      </div>
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        {/* 일별 */}
        <div className="col-span-2 max-sm:col-span-1 space-card p-6 animate-fade-up">
          <h3 className="text-sm font-semibold text-[var(--text-mid)] mb-4">&#x2604;&#xFE0F; 일별 수입 / 지출 궤적</h3>
          <Bar
            data={{
              labels: dates.map((d) => d.slice(5)),
              datasets: [
                {
                  label: "수입",
                  data: dates.map((d) => dailyIncome[d]),
                  backgroundColor: "rgba(0, 255, 136, 0.7)",
                  borderColor: "rgba(0, 255, 136, 1)",
                  borderWidth: 1,
                  borderRadius: 6,
                },
                {
                  label: "지출",
                  data: dates.map((d) => dailyExpense[d]),
                  backgroundColor: "rgba(255, 45, 149, 0.7)",
                  borderColor: "rgba(255, 45, 149, 1)",
                  borderWidth: 1,
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              interaction: { intersect: false, mode: "index" },
              plugins: {
                legend: { position: "top", labels: { usePointStyle: true, pointStyle: "circle", padding: 20, color: "#a0a0cc" } },
                tooltip: { ...tooltipStyle, callbacks: { label: moneyLabel } },
              },
              scales: scaleOptions,
            }}
          />
        </div>

        {/* 카테고리 */}
        <div className="space-card p-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h3 className="text-sm font-semibold text-[var(--text-mid)] mb-4">&#x1FA90; 지출 행성 비율</h3>
          <Doughnut
            data={{
              labels: Object.keys(catTotals),
              datasets: [{
                data: Object.values(catTotals),
                backgroundColor: cosmicColors.slice(0, Object.keys(catTotals).length),
                borderWidth: 2,
                borderColor: "rgba(5,5,15,0.8)",
                hoverOffset: 10,
              }],
            }}
            options={{
              responsive: true,
              cutout: "65%",
              plugins: {
                legend: { position: "bottom", labels: { padding: 16, usePointStyle: true, pointStyle: "circle", font: { size: 12 }, color: "#a0a0cc" } },
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

        {/* 주간별 */}
        <div className="space-card p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <h3 className="text-sm font-semibold text-[var(--text-mid)] mb-4">&#x1F31F; 주간 에너지 소비</h3>
          <Bar
            data={{
              labels: filteredWeekLabels,
              datasets: [{
                label: "지출",
                data: filteredWeekTotals,
                backgroundColor: cosmicColors.map((c) => c + "bb"),
                borderColor: cosmicColors,
                borderWidth: 1,
                borderRadius: 8,
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { ...tooltipStyle, callbacks: { label: moneyLabel } },
              },
              scales: scaleOptions,
            }}
          />
        </div>
      </div>
    </div>
  );
}
