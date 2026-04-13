export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 text-center">
      {/* 배경 네뷸라 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0020] via-[#05050f] to-[#05050f]" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(123,47,247,0.25)_0%,rgba(255,45,149,0.1)_30%,transparent_70%)] rounded-full" />
      <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,212,255,0.15)_0%,transparent_60%)] rounded-full animate-pulse" />
      <div className="absolute top-[50px] left-[-50px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,107,53,0.12)_0%,transparent_60%)] rounded-full" />

      {/* 행성 충돌 이펙트 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--nebula-purple)] to-[var(--nebula-pink)] opacity-60 blur-sm" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[var(--nebula-pink)] to-[var(--nebula-orange)] opacity-80" />
        <div className="absolute -inset-4 rounded-full border border-[rgba(123,47,247,0.3)] animate-[pulseRing_2s_ease-out_infinite]" />
        <div className="absolute -inset-4 rounded-full border border-[rgba(255,45,149,0.2)] animate-[pulseRing_2s_ease-out_infinite_0.5s]" />
        <div className="absolute -inset-4 rounded-full border border-[rgba(0,212,255,0.15)] animate-[pulseRing_2s_ease-out_infinite_1s]" />
      </div>

      {/* 유성 */}
      <div className="absolute top-[30px] right-[10%] w-[2px] h-[80px] bg-gradient-to-b from-transparent via-white to-transparent opacity-40 rotate-[-45deg] animate-[meteorShoot_3s_ease-in_infinite_1s]" />
      <div className="absolute top-[80px] right-[30%] w-[1px] h-[50px] bg-gradient-to-b from-transparent via-[var(--nebula-blue)] to-transparent opacity-30 rotate-[-45deg] animate-[meteorShoot_4s_ease-in_infinite_2.5s]" />

      <div className="relative z-10 mt-32">
        <h1 className="text-5xl font-black tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--nebula-blue)] via-[var(--nebula-purple)] to-[var(--nebula-pink)]">
            COSMIC WALLET
          </span>
        </h1>
        <p className="text-lg text-[var(--text-dim)] font-light tracking-wide">
          우주에서 관리하는 나의 자산
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <span className="px-3 py-1 text-xs rounded-full border border-[var(--nebula-purple)]/30 text-[var(--nebula-purple)] bg-[var(--nebula-purple)]/5">
            &#x1F30C; NEBULA POWERED
          </span>
          <span className="px-3 py-1 text-xs rounded-full border border-[var(--nebula-blue)]/30 text-[var(--nebula-blue)] bg-[var(--nebula-blue)]/5">
            &#x2604;&#xFE0F; REAL-TIME TRACKING
          </span>
        </div>
      </div>
    </section>
  );
}
