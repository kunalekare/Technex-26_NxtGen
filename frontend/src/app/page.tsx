import InvestmentForm from "@/components/InvestmentForm";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="py-6 sm:py-8 md:py-10 border-b border-[#919090]/30 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#224c87] dark:text-blue-300 font-[family-name:var(--font-montserrat)]">
                Goal-Based Investment Calculator
              </h1>
              <p className="text-[#919090] dark:text-gray-400 mt-2 text-sm sm:text-base max-w-2xl">
                A high-precision tool to estimate required monthly investments to achieve
                future financial goals, adjusted for inflation and market returns.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 sm:py-8 md:py-10">
        <InvestmentForm />
      </main>

      <footer className="py-4 sm:py-6 bg-[#919090]/10 dark:bg-gray-800/50 border-t border-[#919090]/30 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 text-xs sm:text-sm text-[#919090] dark:text-gray-500">
          WCAG 2.1 AA Compliant | Built with Next.js 15.5.9
        </div>
      </footer>
    </div>
  );
}
