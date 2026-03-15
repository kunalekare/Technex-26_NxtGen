'use client';

import { useState, useCallback } from 'react';
import type { CalculationPayload, CalculationRecord } from '@/types/calculation';

export function useCalculationHistory() {
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/calculations?limit=20');
      if (!res.ok) throw new Error('Failed to fetch history');
      const data = await res.json();
      setHistory(data.calculations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCalculation = useCallback(async (payload: CalculationPayload) => {
    setError(null);
    try {
      const res = await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save calculation');
      const data = await res.json();
      await fetchHistory();
      return data.id as number;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    }
  }, [fetchHistory]);

  return { history, isLoading, error, fetchHistory, saveCalculation };
}
