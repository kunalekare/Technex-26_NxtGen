'use client';

import React from 'react';
import type { CalculationRecord } from '@/types/calculation';
import { formatCurrency } from '@/utils/formatters';

interface CalculationHistoryProps {
  history: CalculationRecord[];
  isLoading: boolean;
  error: string | null;
  onLoad: (record: CalculationRecord) => void;
  onRefresh: () => void;
}

export default function CalculationHistory({
  history,
  isLoading,
  error,
  onLoad,
  onRefresh,
}: CalculationHistoryProps) {
  return (
    <section className="space-y-6" aria-labelledby="history-title">
      <div className="flex items-center justify-between">
        <h3 id="history-title" className="text-xl font-bold text-[#224c87]">
          Calculation History
        </h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest
                     bg-gray-50 text-[#224c87] rounded-xl border-2 border-gray-100
                     hover:border-[#224c87]/30 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {history.length === 0 && !isLoading && (
        <p className="text-[#919090] text-sm">
          No saved calculations yet. Use the form above and click &quot;Save&quot; to store a calculation.
        </p>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((record) => (
          <div
            key={record.id}
            className="p-4 bg-white border-2 border-gray-50 rounded-2xl shadow-sm
                       flex items-center justify-between gap-4
                       hover:border-[#224c87]/10 transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-[#224c87]/10 text-[#224c87]
                               text-[10px] font-bold uppercase rounded">
                  {record.goalType}
                </span>
                <span className="text-[10px] text-[#919090]">
                  {new Date(record.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-sm font-bold text-[#224c87] truncate">
                {formatCurrency(record.monthlySIP)}/mo for {record.years}yr
                {' → '}{formatCurrency(record.futureValue)}
              </p>
            </div>
            <button
              onClick={() => onLoad(record)}
              className="px-4 py-2 bg-[#224c87] text-white text-xs font-bold
                         rounded-xl hover:bg-[#224c87]/90 transition-all shrink-0"
            >
              Load
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
