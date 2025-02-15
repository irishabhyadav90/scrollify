
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ITEM_HEIGHT = 50;

const PostItem = ({ title }: { title: string }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        height: ITEM_HEIGHT,
        justifyContent: "center",
        paddingHorizontal: 16,
        marginVertical: 4,
        borderRadius: 8,
        backgroundColor: "#F9FAFB",
        marginTop: 5
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    }
});

export default PostItem;