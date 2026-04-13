export default function Footer() {
  return (
    <footer className="text-center py-10 px-6 mt-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-[var(--nebula-purple)] to-transparent opacity-30" />
      <div className="flex justify-center gap-6 mb-4 text-xs">
        <span className="text-[var(--text-dim)] hover:text-[var(--nebula-purple)] transition-colors cursor-pointer">&#x1F30D; 이용약관</span>
        <span className="text-[var(--text-dim)] hover:text-[var(--nebula-pink)] transition-colors cursor-pointer">&#x1F512; 개인정보</span>
        <span className="text-[var(--text-dim)] hover:text-[var(--nebula-blue)] transition-colors cursor-pointer">&#x1F4E1; 고객센터</span>
      </div>
      <p className="text-[var(--text-dim)] text-[11px] tracking-widest">
        &copy; 2026 COSMIC WALLET &mdash; EXPLORING THE UNIVERSE OF FINANCE
      </p>
    </footer>
  );
}
