import { useEffect } from 'react';
import { useFetchDataWithPagination } from './useFetchDataWithPagination';

export const useInfiniteScroll = <T>(fetchFunction: (page: number, limit: number) => Promise<T[]>) => {
    const { data, loading, hasMore, fetchData } = useFetchDataWithPagination(fetchFunction);

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, hasMore, loadMore: fetchData };
};
