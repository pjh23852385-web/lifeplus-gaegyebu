"use client";

export default function Header() {
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[rgba(5,5,15,0.7)] border-b border-[rgba(123,47,247,0.2)]">
      <div className="max-w-[960px] mx-auto flex items-center justify-between px-6 h-16">
        <div className="text-xl font-black tracking-widest flex items-center gap-1">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--nebula-purple)] via-[var(--nebula-pink)] to-[var(--nebula-blue)]">
            COSMIC
          </span>
          <span className="text-white/80">WALLET</span>
          <span className="ml-1 text-xs animate-pulse">&#x2728;</span>
        </div>
        <nav className="flex gap-8">
          {[
            { label: "대시보드", target: ".summary-section" },
            { label: "기록", target: ".form-section" },
            { label: "분석", target: ".chart-section" },
            { label: "내역", target: ".list-section" },
          ].map(({ label, target }) => (
            <button
              key={label}
              onClick={() => scrollTo(target)}
              className="text-[var(--text-dim)] hover:text-[var(--nebula-blue)] text-sm transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
