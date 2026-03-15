"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "./ui/Slider";
import { Input } from "./ui/Input";
import { useCalculator, GoalType } from "@/hooks/useCalculator";
import { useCalculationHistory } from "@/hooks/useCalculationHistory";
import CalculationHistory from "./CalculationHistory";
import type { CalculationRecord } from "@/types/calculation";
import { formatCurrency } from "@/utils/formatters";

export default function InvestmentForm() {
    // Input States
    const [presentCost, setPresentCost] = useState<number>(100000);
    const [years, setYears] = useState<number>(10);
    const [inflationRate, setInflationRate] = useState<number>(6);
    const [annualReturn, setAnnualReturn] = useState<number>(12);
    const [stepUpRate, setStepUpRate] = useState<number>(0);
    const [goalType, setGoalType] = useState<GoalType>('Custom');
    const [retirementYears, setRetirementYears] = useState<number>(20);
    const [postRetirementReturn, setPostRetirementReturn] = useState<number>(8);
    const [isTaxEnabled, setIsTaxEnabled] = useState<boolean>(false);

    // Smart Calculation Hook
    const results = useCalculator({
        presentCost,
        years,
        inflationRate,
        annualReturn,
        stepUpRate,
        goalType,
        retirementYears,
        postRetirementReturn,
        isTaxEnabled,
    });

    const principalPercent = Math.round((results.totalInvestment / results.futureValue) * 100);

    // Calculation History
    const { history, isLoading: historyLoading, error: historyError, fetchHistory, saveCalculation } = useCalculationHistory();

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleSave = async () => {
        await saveCalculation({
            presentCost,
            years,
            inflationRate,
            annualReturn,
            stepUpRate,
            goalType,
            retirementYears,
            postRetirementReturn,
            isTaxEnabled,
            ...results,
        });
    };

    const handleLoad = (record: CalculationRecord) => {
        setPresentCost(record.presentCost);
        setYears(record.years);
        setInflationRate(record.inflationRate);
        setAnnualReturn(record.annualReturn);
        setStepUpRate(record.stepUpRate);
        setGoalType(record.goalType);
        setRetirementYears(record.retirementYears);
        setPostRetirementReturn(record.postRetirementReturn);
        setIsTaxEnabled(record.isTaxEnabled);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Input Section (Left) */}
                <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-4">
                        <div className="inline-block px-3 py-1 bg-[#224c87]/10 text-[#224c87] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                            Personal Financial Planner
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#224c87] tracking-tight">Design Your Future.</h2>
                        <p className="text-[#919090] text-lg max-w-xl">Fine-tune your financial goals with precision. See the impact of inflation and market growth in real-time.</p>
                    </div>

                    {/* Goal Type Selection */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-px bg-gray-200"></div>
                            <span className="text-[10px] font-bold text-[#919090] uppercase tracking-[0.3em]">Select Goal Strategy</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {(['Custom', 'Education', 'Medical', 'Lifestyle', 'Retirement'] as GoalType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setGoalType(type)}
                                    className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 transform hover:-translate-y-0.5 ${goalType === type
                                        ? 'bg-[#224c87] text-white shadow-xl shadow-[#224c87]/20 scale-105'
                                        : 'bg-white border-2 border-gray-100 text-[#919090] hover:border-[#224c87]/30 hover:text-[#224c87]'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form Sections */}
                    <div className="space-y-12">
                        {/* Section 1: Goal Foundations */}
                        <section className="space-y-8">
                            <h3 className="text-lg font-bold text-[#224c87] flex items-center gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#224c87] text-white text-[10px]">1</span>
                                Goal Foundations
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="space-y-4">
                                    <Slider
                                        id="cost"
                                        label="Present Cost of Goal"
                                        min={10000}
                                        max={10000000}
                                        value={presentCost}
                                        unit="$"
                                        onChange={setPresentCost}
                                    />
                                    <Input
                                        id="cost-input"
                                        label=""
                                        value={presentCost}
                                        onChange={setPresentCost}
                                        suffix="$"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Slider
                                        id="years"
                                        label="Time Horizon"
                                        min={1}
                                        max={40}
                                        value={years}
                                        unit="Years"
                                        onChange={setYears}
                                    />
                                    <Input
                                        id="years-input"
                                        label=""
                                        value={years}
                                        onChange={setYears}
                                        suffix="Years"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Market Variables */}
                        <section className="space-y-8">
                            <h3 className="text-lg font-bold text-[#224c87] flex items-center gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#224c87] text-white text-[10px]">2</span>
                                Market Variables
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="space-y-4">
                                    <Slider
                                        id="inflation"
                                        label="Expected Inflation"
                                        min={0}
                                        max={15}
                                        value={results.adjustedInflation}
                                        unit="%"
                                        onChange={setInflationRate}
                                        disabled={goalType !== 'Custom'}
                                    />
                                    <Input
                                        id="inflation-input"
                                        label=""
                                        value={results.adjustedInflation}
                                        onChange={setInflationRate}
                                        suffix="%"
                                        disabled={goalType !== 'Custom'}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Slider
                                        id="returns"
                                        label="Portfolio Returns"
                                        min={1}
                                        max={30}
                                        value={annualReturn}
                                        unit="%"
                                        onChange={setAnnualReturn}
                                    />
                                    <Input
                                        id="returns-input"
                                        label=""
                                        value={annualReturn}
                                        onChange={setAnnualReturn}
                                        suffix="%"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Conditionals */}
                        {goalType === 'Retirement' && (
                            <div className="p-8 bg-gradient-to-br from-[#224c87]/5 to-transparent rounded-3xl border-2 border-[#224c87]/10 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#224c87]/10">
                                        <span className="text-2xl font-black text-[#224c87]">🌴</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#224c87]">Retirement Phase</h3>
                                        <p className="text-xs text-[#919090]">Define your post-retirement variables for precise decumulation.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <Slider
                                            id="ret-years"
                                            label="Withdrawal Period"
                                            min={5}
                                            max={40}
                                            value={retirementYears}
                                            unit="Years"
                                            onChange={setRetirementYears}
                                        />
                                        <Input
                                            id="ret-years-input"
                                            label=""
                                            value={retirementYears}
                                            onChange={setRetirementYears}
                                            suffix="Years"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Slider
                                            id="ret-return"
                                            label="Post-Ret Portfolio"
                                            min={1}
                                            max={15}
                                            value={postRetirementReturn}
                                            unit="%"
                                            onChange={setPostRetirementReturn}
                                        />
                                        <Input
                                            id="ret-return-input"
                                            label=""
                                            value={postRetirementReturn}
                                            onChange={setPostRetirementReturn}
                                            suffix="%"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Section 3: Savings Strategy */}
                        <section className="space-y-8">
                            <h3 className="text-lg font-bold text-[#224c87] flex items-center gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#224c87] text-white text-[10px]">3</span>
                                Savings Strategy
                            </h3>
                            <div className="p-8 bg-white border-2 border-gray-50 rounded-3xl shadow-sm space-y-8 transition-all hover:border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-md font-bold text-[#224c87]">Step-Up Acceleration</h4>
                                        <p className="text-xs text-[#919090]">Increase savings annually by this percentage.</p>
                                    </div>
                                    <div className="px-4 py-2 bg-gray-50 rounded-xl text-[#224c87] font-black text-sm">
                                        {stepUpRate}%
                                    </div>
                                </div>
                                <Slider
                                    id="stepup"
                                    label=""
                                    min={0}
                                    max={20}
                                    value={stepUpRate}
                                    unit="%"
                                    onChange={setStepUpRate}
                                />
                            </div>
                        </section>
                    </div>
                </div>

                {/* Results Section (Right) */}
                <div className="lg:col-span-5 relative">
                    <div className="lg:sticky lg:top-8 space-y-8">
                        {/* Highlights Card */}
                        <section className="bg-[#224c87] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-[#224c87]/30 relative overflow-hidden group">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl transition-all group-hover:bg-white/10"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-[#da3832]/20 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10 space-y-12">
                                <div>
                                    <h3 className="text-white/60 uppercase tracking-[0.3em] font-black text-[10px] mb-4">Required Monthly Investment</h3>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                                            {formatCurrency(results.monthlySIP)}
                                        </span>
                                        {stepUpRate > 0 && <span className="text-sm font-bold text-white/50 ml-1">starting monthly</span>}
                                    </div>
                                </div>

                                <div className="space-y-10 pt-10 border-t border-white/10">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h4 className="text-white/50 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Target Corpus</h4>
                                            <p className="text-3xl font-black">{formatCurrency(results.futureValue)}</p>
                                        </div>
                                        <div className="text-right">
                                            <h4 className="text-white/50 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Horizon</h4>
                                            <p className="text-2xl font-bold">{years} <span className="text-sm font-normal opacity-50">Years</span></p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                            <span className="text-white/50">Composition Breakdown</span>
                                            <span className="px-2 py-0.5 bg-white/10 rounded text-[9px]">{principalPercent}% Invested</span>
                                        </div>
                                        
                                        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden flex">
                                            <div className="h-full bg-white transition-all duration-1000" style={{ width: `${principalPercent}%` }}></div>
                                            <div className="h-full bg-[#da3832] transition-all duration-1000" style={{ width: `${100 - principalPercent}%` }}></div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-white/40 tracking-widest">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                    Principal
                                                </div>
                                                <p className="text-sm font-bold">{formatCurrency(results.totalInvestment)}</p>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <div className="flex items-center justify-end gap-1.5 text-[9px] font-black uppercase text-[#da3832] tracking-widest">
                                                    Earnings
                                                    <div className="w-1.5 h-1.5 bg-[#da3832] rounded-full"></div>
                                                </div>
                                                <p className="text-sm font-bold">{formatCurrency(results.totalEarnings)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="w-full mt-6 py-4 bg-white/10 border-2 border-white/20 text-white
                                               font-bold text-sm uppercase tracking-widest rounded-2xl
                                               hover:bg-white/20 transition-all"
                                >
                                    Save This Calculation
                                </button>
                            </div>
                        </section>

                        {/* Impact Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-6 bg-white border-2 border-gray-50 rounded-[2rem] shadow-sm flex items-center justify-between group transition-all hover:shadow-xl hover:border-[#224c87]/5">
                                <div className="flex items-center gap-5">
                                    <div className={`p-4 rounded-2xl transition-all ${isTaxEnabled ? 'bg-[#da3832] text-white' : 'bg-gray-50 text-[#919090]'}`}>
                                        <span className="font-black text-xs uppercase tracking-tighter">Tax</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#224c87] text-sm leading-tight">LTCG Tax Impact</h4>
                                        <p className="text-[10px] text-[#919090] font-medium">Adjusting target for 12.5% tax.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsTaxEnabled(!isTaxEnabled)}
                                    className={`w-14 h-7 rounded-full transition-all relative flex items-center px-1 ${isTaxEnabled ? 'bg-[#224c87]' : 'bg-gray-100'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all transform ${isTaxEnabled ? 'translate-x-7' : 'translate-x-0'}`}></div>
                                </button>
                            </div>

                            <div className="p-6 bg-gray-50 border-2 border-transparent rounded-[2rem] flex items-start gap-5">
                                <div className="p-4 bg-white rounded-2xl shadow-sm text-[#224c87] shrink-0">
                                    <span className="font-black text-xl">ℹ</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#224c87] text-sm mb-1 uppercase tracking-wider">Planner&apos;s Insight</h4>
                                    <p className="text-xs text-[#919090] leading-relaxed">
                                        Factoring in <strong>{results.adjustedInflation}%</strong> inflation, your goal of <strong>{formatCurrency(presentCost)}</strong> today will require <strong>{formatCurrency(results.futureValue)}</strong> in <strong>{years} years</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Methodology & Educational Intent */}
            <div className="lg:col-span-12 mt-8 lg:mt-12 border-t border-gray-100 pt-8 lg:pt-12 space-y-12">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-4">
                        <h3 className="text-xl lg:text-2xl font-bold text-[#224c87]">Mathematical Transparency</h3>
                        <p className="text-[#919090] text-sm leading-relaxed">
                            We use industry-standard financial formulas to provide accurate estimations. Transparency is key to financial literacy.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-xl space-y-4 text-xs md:text-sm font-mono text-[#224c87]">
                            <div className="space-y-2">
                                <p className="font-bold underline">Goal Inflation (Future Value):</p>
                                <p>FV = PV × (1 + i)ⁿ</p>
                            </div>
                            {goalType === 'Retirement' && (
                                <div className="space-y-2 pt-4 border-t border-gray-200">
                                    <p className="font-bold underline">Retirement Corpus (PVA):</p>
                                    <p>Corpus = WD × [(1 - (1 + rₚ)⁻ᵐ) / rₚ]</p>
                                    <p className="text-[10px] text-[#919090]">WD: Monthly Withdrawal, rₚ: Post-Ret Return, m: Months</p>
                                </div>
                            )}
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <p className="font-bold underline">Step-Up SIP (Annuity Due with g):</p>
                                <p>P = Target / Σ [ (1+g)ʸ × (1+r)ᵗ⁻ᵐ ]</p>
                                <p className="text-[10px] text-[#919090]">g: Annual Step-up, y: years, t: total months, m: current month</p>
                            </div>
                            {isTaxEnabled && (
                                <div className="space-y-2 pt-4 border-t border-gray-200">
                                    <p className="font-bold underline">Tax Adjustment (LTCG):</p>
                                    <p>Adjusted Target = Base Target × 1.125</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#224c87]">Educational Intent</h3>
                        <p className="text-[#919090] text-sm leading-relaxed">
                            This tool is designed to help you understand the dynamics of long-term wealth creation and the impact of inflation. It serves as an educational resource to model potential outcomes based on your inputs.
                        </p>
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <p className="text-red-800 text-xs font-bold uppercase tracking-widest mb-2">Notice</p>
                            <p className="text-red-700 text-sm leading-relaxed">
                                This calculator provides estimations for informational purposes only. It does not constitute financial advice, product recommendations, or a guarantee of future returns. Always consult with a certified financial professional before making investment decisions.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            {/* Calculation History */}
            <div className="lg:col-span-12 mt-8 lg:mt-12 border-t border-gray-100 pt-8 lg:pt-12">
                <CalculationHistory
                    history={history}
                    isLoading={historyLoading}
                    error={historyError}
                    onLoad={handleLoad}
                    onRefresh={fetchHistory}
                />
            </div>
        </div>
    );
}
