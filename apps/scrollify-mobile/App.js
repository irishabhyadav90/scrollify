import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFetchData } from '@scrollify/hooks';

const App = () => {
  const { counter, updateCounter } = useFetchData();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text onPress={() => updateCounter(prev => prev + 1)}>{counter}</Text>
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