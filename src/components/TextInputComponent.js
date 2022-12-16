import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../constants';

const TextInputComponent = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={COLORS.gray}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 0.5,
    marginTop: 25,
    color: 'black',
  },
});

export default TextInputComponent;
