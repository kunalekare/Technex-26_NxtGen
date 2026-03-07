import { useMemo } from 'react';

export type GoalType = 'Education' | 'Medical' | 'Lifestyle' | 'Retirement' | 'Custom';

interface CalculatorInputs {
    presentCost: number;
    years: number;
    inflationRate: number;
    annualReturn: number;
    stepUpRate?: number; // Annual increase in SIP (g)
    goalType: GoalType;
    retirementYears?: number;
    postRetirementReturn?: number;
    isTaxEnabled?: boolean;
}

interface CalculatorResults {
    futureValue: number;
    monthlySIP: number;
    totalInvestment: number;
    totalEarnings: number;
    adjustedInflation: number;
}

/**
 * Advanced Investment Calculation Hook
 * Supports Inflation-buckets, Retirement Decumulation, Tax Impact, and Step-up (g).
 */
export const useCalculator = ({
    presentCost,
    years,
    inflationRate,
    annualReturn,
    stepUpRate = 0,
    goalType,
    retirementYears = 0,
    postRetirementReturn = 0,
    isTaxEnabled = false,
}: CalculatorInputs): CalculatorResults => {
    return useMemo(() => {
        // 1. Determine Effective Inflation Rate (Buckets)
        let effectiveInflation = inflationRate;
        switch (goalType) {
            case 'Education': effectiveInflation = 10; break;
            case 'Medical': effectiveInflation = 12; break;
            case 'Lifestyle': effectiveInflation = 6; break;
            case 'Retirement': effectiveInflation = 6; break; // Standard for retirement planning
            default: effectiveInflation = inflationRate;
        }

        const i = effectiveInflation / 100;
        let baseFutureValue = presentCost * Math.pow(1 + i, years);

        // 2. Accumulation vs Decumulation (Retirement)
        // If retirement, the "goal" isn't just the inflated cost, but a corpus that funds withdrawals
        if (goalType === 'Retirement' && retirementYears > 0) {
            const rPost = (postRetirementReturn / 100) / 12;
            const nWithdraw = retirementYears * 12;
            
            // Monthly withdrawal needed (inflated present cost)
            const monthlyWithdrawal = (presentCost * Math.pow(1 + i, years)) / 12;
            
            // Present Value of Annuity (Corpus needed at start of retirement)
            if (rPost > 0) {
                baseFutureValue = monthlyWithdrawal * ((1 - Math.pow(1 + rPost, -nWithdraw)) / rPost);
            } else {
                baseFutureValue = monthlyWithdrawal * nWithdraw;
            }
        }

        // 3. Tax Impact (LTCG 12.5%)
        // To ensure the NET amount meets the goal, we increase the target corpus
        const finalTargetValue = isTaxEnabled ? baseFutureValue * 1.125 : baseFutureValue;

        // 4. Calculate Required Monthly SIP (with Step-up g)
        const r = (annualReturn / 100) / 12;
        const n = years * 12;
        const g = stepUpRate / 100;

        let monthlySIP = 0;
        let totalInvestment = 0;

        if (stepUpRate === 0) {
            if (r > 0) {
                const numerator = finalTargetValue * r;
                const denominator = (Math.pow(1 + r, n) - 1) * (1 + r);
                monthlySIP = numerator / denominator;
            } else {
                monthlySIP = finalTargetValue / n;
            }
            totalInvestment = monthlySIP * n;
        } else {
            // Numerical approach for Step-up SIP (g)
            let fvOfOneUnit = 0;
            for (let y = 0; y < years; y++) {
                const stepMultiplier = Math.pow(1 + g, y);
                for (let m = 1; m <= 12; m++) {
                    const monthsRemaining = n - (12 * y + m) + 1;
                    fvOfOneUnit += stepMultiplier * Math.pow(1 + r, monthsRemaining);
                }
            }
            monthlySIP = finalTargetValue / fvOfOneUnit;

            for (let y = 0; y < years; y++) {
                totalInvestment += (monthlySIP * Math.pow(1 + g, y)) * 12;
            }
        }

        return {
            futureValue: Math.round(finalTargetValue),
            monthlySIP: Math.round(monthlySIP),
            totalInvestment: Math.round(totalInvestment),
            totalEarnings: Math.round(finalTargetValue - totalInvestment),
            adjustedInflation: effectiveInflation,
        };
    }, [presentCost, years, inflationRate, annualReturn, stepUpRate, goalType, retirementYears, postRetirementReturn, isTaxEnabled]);
};