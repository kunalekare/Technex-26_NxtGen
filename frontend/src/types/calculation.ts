import type { GoalType } from '@/hooks/useCalculator';

export interface CalculationPayload {
  presentCost: number;
  years: number;
  inflationRate: number;
  annualReturn: number;
  stepUpRate: number;
  goalType: GoalType;
  retirementYears: number;
  postRetirementReturn: number;
  isTaxEnabled: boolean;
  futureValue: number;
  monthlySIP: number;
  totalInvestment: number;
  totalEarnings: number;
  adjustedInflation: number;
}

export interface CalculationRecord extends CalculationPayload {
  id: number;
  createdAt: string;
}
