import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../constants';

const EmptyList = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 250,
    fontSize: 20,
    color: COLORS.black,
  },
});
export default EmptyList;
