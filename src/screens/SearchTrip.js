import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function SearchTrip({navigation}) {
  return (
    <View style={styles.container}>
      <Text>No rides found!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
