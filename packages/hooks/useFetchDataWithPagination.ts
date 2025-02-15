import { useCallback } from 'react';
import { usePagination } from './usePagination';

export const useFetchDataWithPagination = <T>(fetchFunction: (page: number, limit: number) => Promise<T[]>) => {
    const { data, page, loading, hasMore, updateData, setLoading, setError } = usePagination();

    const fetchData = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading();

        try {
            const newData = await fetchFunction(page, 10);
            updateData(newData);
        } catch (error) {
            setError();
        }
    }, [fetchFunction, page, hasMore, loading]);

    return { data, loading, hasMore, fetchData };
};
