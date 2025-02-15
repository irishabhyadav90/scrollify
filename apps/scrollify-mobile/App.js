import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InfiniteScrollNative from './components/InfiniteScrollList';

const App = () => {

  return (
    <View style={styles.container}>
      <InfiniteScrollNative />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;