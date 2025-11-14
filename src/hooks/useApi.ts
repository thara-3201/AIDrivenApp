import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../types/api.types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
}

/**
 * Custom hook for handling API calls with loading and error states
 * @param apiFunction - The API function to call
 * @param options - Configuration options
 */
export function useApi<T, Args extends any[]>(
  apiFunction: (...args: Args) => Promise<T>,
  options: UseApiOptions = { immediate: false }
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: options.immediate || false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err as ApiError;
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
