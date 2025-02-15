import { useEffect } from 'react';
import { useFetchDataWithPagination } from './useFetchDataWithPagination';
import { fetchPosts } from '../services/api';

export const useInfiniteScroll = () => {
    const { data, loading, hasMore, fetchData } = useFetchDataWithPagination(fetchPosts);

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, hasMore, loadMore: fetchData };
};
