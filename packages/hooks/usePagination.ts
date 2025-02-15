import { useReducer, useCallback } from 'react';

interface PaginationState<T> {
    data: T[];
    page: number;
    loading: boolean;
    hasMore: boolean;
}

type PaginationAction<T> =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: T[] }
    | { type: 'FETCH_ERROR' };


const PAGE_SIZE = 10;

const initialState: PaginationState<any> = {
    data: [],
    page: 1,
    loading: false,
    hasMore: true,
};

const paginationReducer = (state: PaginationState<any>, action: PaginationAction<any>) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.payload],
                hasMore: action.payload.length === PAGE_SIZE,
                loading: false,
                page: state.page + 1,
            };
        case 'FETCH_ERROR':
            return { ...state, loading: false };
        default:
            return state;
    }
};


export const usePagination = () => {
    const [state, dispatch] = useReducer(paginationReducer, initialState);

    const updateData = useCallback((newData: any[]) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: newData });
    }, []);

    const setLoading = useCallback(() => {
        dispatch({ type: 'FETCH_START' });
    }, []);

    const setError = useCallback(() => {
        dispatch({ type: 'FETCH_ERROR' });
    }, []);

    return { ...state, updateData, setLoading, setError };
};
