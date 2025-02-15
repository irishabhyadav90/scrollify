"use client";

import React, { useCallback } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { useInfiniteScroll } from '@scrollify/hooks';
import { fetchPosts } from '@scrollify/services';
import PostItem from './PostItem';

const InfiniteScrollList = () => {
    const { data, loading, hasMore, loadMore } = useInfiniteScroll(fetchPosts);

    const handleItemsRendered = useCallback(
        ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
            if (!loading && hasMore && visibleStopIndex >= data.length - 2) {
                loadMore();
            }
        },
        [loading, hasMore, data.length]
    );

    return (
        <div className="p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Infinite Scroll List</h2>
            <List
                height={600}
                width="100%"
                itemSize={60}
                itemCount={data.length}
                className="rounded-lg border border-gray-200 shadow-sm"
                onItemsRendered={handleItemsRendered}>
                {({ index, style }) => (
                    <PostItem
                        title={data[index]?.title}
                        style={style}
                    />
                )}
            </List>
            {loading && <p className="text-center text-gray-500 mt-4">Loading more items...</p>}
        </div>
    );
};

export default InfiniteScrollList;
