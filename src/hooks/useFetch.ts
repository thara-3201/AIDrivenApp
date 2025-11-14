import { useState, useEffect } from 'react';
import { ApiError } from '../types/api.types';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * Custom hook for fetching data on component mount
 * @param apiFunction - The API function to call
 * @param dependencies - Dependencies array for re-fetching
 */
export function useFetch<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
): UseFetchState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await apiFunction();
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      const error = err as ApiError;
      setState({ data: null, loading: false, error });
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
}
