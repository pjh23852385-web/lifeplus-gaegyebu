export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[#0a3d62] py-12 pb-14 text-center text-white">
      <div className="absolute -top-1/2 -right-1/5 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(233,69,96,0.15)_0%,transparent_70%)] rounded-full" />
      <h1 className="text-3xl font-black tracking-tight relative z-10">
        스마트한 자산 관리의 시작
      </h1>
      <p className="text-[15px] text-white/60 font-light mt-2 relative z-10">
        일상 속 수입과 지출을 한눈에 파악하세요
      </p>
    </section>
  );
}
