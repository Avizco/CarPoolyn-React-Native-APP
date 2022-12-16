import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ICONS} from '../constants';

const CloseModalHeader = ({
  onPress,
  backgroundColor,
  iconColor,
  selectMediaTitle,
}) => {
  return (
    <View style={styles.headerView(backgroundColor)}>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.headerTitle(iconColor)}>
          {selectMediaTitle}
        </Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onPress}>
        <Icon name={ICONS.close} size={25} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: backgroundColor => {
    return {
      flexDirection: 'row',
      backgroundColor: backgroundColor,
      alignItems: 'space-between',
      borderBottomWidth: 0.5,
    };
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: iconColor => {
    return {
      color: iconColor,
      fontSize: 18,
    };
  },
  mainView: {
    width: '80%',
    justifyContent: 'center',
    flex: 1,
    height: 46,
    paddingLeft: 10,
  },
});
export default CloseModalHeader;
