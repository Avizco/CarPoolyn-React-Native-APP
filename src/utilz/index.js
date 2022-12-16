import {COLORS, ASYNCSTORAGE_KEYS} from '../constants';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const navigationOptions = (title, show, color = COLORS.black) => {
  return {
    title: title,
    headerTintColor: color,
    headerShown: show,
  };
};

export const navigateToScreen = (navigation, screen, props) => {
  navigation.navigate(screen, props);
};

export const replaceToScreen = (navigation, screen, props) => {
  navigation.replace(screen, props);
};

export const navigationGoBack = navigation => {
  navigation.goBack();
};

export const popToTop = navigation => {
  navigation.popToTop();
};

export const showAlert = (title, message) => {
  Alert.alert(title, message);
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e.message);
  }
};

export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e.message);
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    await AsyncStorage.removeItem(ASYNCSTORAGE_KEYS.userObject);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
