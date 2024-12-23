import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { handleDatabaseError } from '../utils/errorHandler';

interface QueryOptions<T> {
  query: string;
  params?: any[];
  transform?: (data: any) => T;
}

export function useSupabaseQuery<T>({ query, params, transform }: QueryOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: result, error: queryError } = await supabase
          .rpc('execute_query', { query_text: query, query_params: params });

        if (queryError) {
          handleDatabaseError(queryError, 'useSupabaseQuery');
        }

        setData(transform ? transform(result) : result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}