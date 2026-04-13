export default function Footer() {
  return (
    <footer className="text-center py-8 px-6 text-[var(--text-light)] text-xs tracking-wide mt-auto">
      <div className="flex justify-center gap-6 mb-3">
        <span className="hover:text-[var(--accent)] transition-colors cursor-pointer">이용약관</span>
        <span className="hover:text-[var(--accent)] transition-colors cursor-pointer">개인정보처리방침</span>
        <span className="hover:text-[var(--accent)] transition-colors cursor-pointer">고객센터</span>
      </div>
      <div className="w-10 h-px bg-gray-300 mx-auto mb-3" />
      &copy; 2026 LIFE+ 가계부. All rights reserved.
    </footer>
  );
}
