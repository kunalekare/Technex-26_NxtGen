import InvestmentForm from "@/components/InvestmentForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-10 border-b border-[#919090]">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#224c87] font-[family-name:var(--font-montserrat)]">
            Goal-Based Investment Calculator
          </h1>
          <p className="text-[#919090] mt-2 max-w-2xl">
            A high-precision tool to estimate required monthly investments to achieve
            future financial goals, adjusted for inflation and market returns.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-10">
        <InvestmentForm />
      </main>

      <footer className="py-6 bg-[#919090]/10 border-t border-[#919090]">
        <div className="container mx-auto px-6 text-sm text-[#919090]">
          WCAG 2.1 AA Compliant | Built with Next.js 15.5.9
        </div>
      </footer>
    </div>
  );
}