import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/connection';
import type { CalculationPayload } from '@/types/calculation';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const body: CalculationPayload = await request.json();

    if (!body.presentCost || !body.years || !body.annualReturn) {
      return NextResponse.json(
        { error: 'Missing required fields: presentCost, years, annualReturn' },
        { status: 400 },
      );
    }

    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO calculations
        (present_cost, years, inflation_rate, annual_return, step_up_rate,
         goal_type, retirement_years, post_retirement_return, is_tax_enabled,
         future_value, monthly_sip, total_investment, total_earnings, adjusted_inflation)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.presentCost,
        body.years,
        body.inflationRate,
        body.annualReturn,
        body.stepUpRate ?? 0,
        body.goalType ?? 'Custom',
        body.retirementYears ?? 0,
        body.postRetirementReturn ?? 0,
        body.isTaxEnabled ? 1 : 0,
        body.futureValue,
        body.monthlySIP,
        body.totalInvestment,
        body.totalEarnings,
        body.adjustedInflation,
      ],
    );

    return NextResponse.json(
      { id: result.insertId, message: 'Calculation saved' },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/calculations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get('limit')) || 20, 100);
    const offset = Number(searchParams.get('offset')) || 0;

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, present_cost, years, inflation_rate, annual_return,
              step_up_rate, goal_type, retirement_years, post_retirement_return,
              is_tax_enabled, future_value, monthly_sip, total_investment,
              total_earnings, adjusted_inflation, created_at
       FROM calculations
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [String(limit), String(offset)],
    );

    const calculations = rows.map((row) => ({
      id: row.id,
      presentCost: Number(row.present_cost),
      years: row.years,
      inflationRate: Number(row.inflation_rate),
      annualReturn: Number(row.annual_return),
      stepUpRate: Number(row.step_up_rate),
      goalType: row.goal_type,
      retirementYears: row.retirement_years,
      postRetirementReturn: Number(row.post_retirement_return),
      isTaxEnabled: Boolean(row.is_tax_enabled),
      futureValue: Number(row.future_value),
      monthlySIP: Number(row.monthly_sip),
      totalInvestment: Number(row.total_investment),
      totalEarnings: Number(row.total_earnings),
      adjustedInflation: Number(row.adjusted_inflation),
      createdAt: row.created_at,
    }));

    return NextResponse.json({ calculations });
  } catch (error) {
    console.error('GET /api/calculations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
