import React, { useCallback } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, SafeAreaView } from 'react-native';
import { useInfiniteScroll } from '@scrollify/hooks';
import { fetchPosts } from '@scrollify/services';
import PostItem from './PostItem';

const ITEM_HEIGHT = 50;

const InfiniteScrollNative = () => {

    const { data, loading, hasMore, loadMore } = useInfiniteScroll(fetchPosts);
    const { container } = styles;

    const renderItem = useCallback(({ item }) => <PostItem title={item.title} />, [])

    const listFooterComponent = useCallback(() => {
        if (!loading) return null;
        return <ActivityIndicator size="large" />;
    }, [loading])

    const getItemLayout = (_, index) => {
        return ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
        })
    }

    return (
        <SafeAreaView style={container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={renderItem}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                getItemLayout={getItemLayout}
                onEndReached={hasMore ? loadMore : null}
                onEndReachedThreshold={0.5}
                ListFooterComponent={listFooterComponent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        margin: 10,
    },
})
export default InfiniteScrollNative;
