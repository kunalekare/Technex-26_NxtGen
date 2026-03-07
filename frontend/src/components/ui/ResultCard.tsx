import React from 'react';

interface ResultCardProps {
    monthlySIP: number;
    futureValue: number;
    inflation: number;
    returns: number;
}

export const ResultCard = ({ monthlySIP, futureValue, inflation, returns }: ResultCardProps) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0,
    });

    return (
        <section
            aria-labelledby="result-title"
            className="bg-[#224c87] p-8 rounded-lg shadow-lg flex flex-col justify-between h-full min-h-[400px]"
        >
            <div aria-live="polite" className="space-y-8">
                <div>
                    <h2 id="result-title" className="text-white/80 uppercase tracking-widest font-bold text-sm mb-2">
                        Required Monthly Investment
                    </h2>
                    <p className="text-white text-6xl md:text-7xl font-bold font-[family-name:var(--font-montserrat)]">
                        {formatter.format(monthlySIP)}
                    </p>
                </div>

                <div className="border-t border-white/20 pt-6">
                    <h3 className="text-white/80 uppercase tracking-widest font-bold text-xs mb-1">
                        Inflated Future Goal Value
                    </h3>
                    <p className="text-white text-3xl font-bold">
                        {formatter.format(futureValue)}
                    </p>
                </div>
            </div>

            <div className="mt-8 p-4 bg-black/10 rounded border-l-4 border-[#da3832]">
                <p className="text-white text-sm leading-relaxed">
                    Based on <span className="font-bold">{inflation}%</span> inflation and an assumed annual return of <span className="font-bold">{returns}%</span>.
                </p>
            </div>
        </section>
    );
};