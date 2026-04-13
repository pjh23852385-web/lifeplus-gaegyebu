"use client";

export default function Header() {
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-[var(--primary)] text-white sticky top-0 z-50">
      <div className="max-w-[960px] mx-auto flex items-center justify-between px-6 h-16">
        <div className="text-xl font-black tracking-widest">
          LIFE<span className="text-[var(--accent)]">+</span> 가계부
        </div>
        <nav className="flex gap-8">
          {[
            { label: "대시보드", target: ".summary-section" },
            { label: "내역 입력", target: ".form-section" },
            { label: "분석", target: ".chart-section" },
            { label: "내역 목록", target: ".list-section" },
          ].map(({ label, target }) => (
            <button
              key={label}
              onClick={() => scrollTo(target)}
              className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
