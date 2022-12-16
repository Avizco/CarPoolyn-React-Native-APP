import React from 'react';
import {StyleSheet, ActivityIndicator, View, Dimensions} from 'react-native';
import {COLORS} from '../constants';

const Loader = ({loading}) => {
  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator
        color={COLORS.pinkesh}
        size={'large'}
        style={styles.loader}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    zIndex: 10,
  },
  loader: {
    marginBottom: 30,
  },
});

export default Loader;
