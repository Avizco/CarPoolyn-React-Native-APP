import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import Loader from '../components/Loader';
import TextInputComponent from '../components/TextInputComponent';
import {
  ALERT_Messages,
  ALERT_TITLES,
  ASYNCSTORAGE_KEYS,
  COLORS,
  LABELS,
  NAVIGATION_SCREENS_TITLES,
  NAVIGATION_SCREEN_NAMES,
} from '../constants';
import {navigateToScreen, showAlert, storeData} from '../utilz';
import auth from '@react-native-firebase/auth';
import {isEmpty} from 'lodash';

export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInUser = () => {
    try {
      setLoading(true);
      if (isEmpty(username.trim()) || isEmpty(password.trim())) {
        showAlert(
          ALERT_TITLES.authentication,
          ALERT_Messages.emailAndPasswordEmpty,
        );
      } else {
        auth()
          .signInWithEmailAndPassword(username, password)
          .then(response => {
            storeData(ASYNCSTORAGE_KEYS.userObject, response.user._user);
            navigation.replace('Home');
          })
          .catch(err => {
            let message = err.message.split(']')[1].trim();
            showAlert(ALERT_TITLES.error, message);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.imageContainer}>
        <Image source={require('../images/Logo.jpg')} style={styles.logo} />
      </View>

      <Text style={styles.title}>{LABELS.welcome}</Text>
      <Text style={styles.subTitles}>{LABELS.signInToContinue}</Text>

      <TextInputComponent
        value={username}
        onChangeText={setUsername}
        placeholder={LABELS.username}
      />
      <TextInputComponent
        value={password}
        onChangeText={setPassword}
        placeholder={LABELS.password}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.login} onPress={signInUser}>
        <Text style={styles.loginText}>{LABELS.login}</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.forgotPasswordText}>{`${LABELS.signUpAs}`}</Text>
        <TouchableOpacity
          onPress={() =>
            navigateToScreen(navigation, NAVIGATION_SCREEN_NAMES.signUp)
          }>
          <Text style={styles.customerLabourText}>
            {NAVIGATION_SCREENS_TITLES.signUp}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: COLORS.purpleHeart,
  },
  subTitles: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: 'bold',
    marginTop: 5,
  },
  imageContainer: {
    height: 140,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 100,
    width: 100,
  },
  forgotPasswordView: {
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  forgotPasswordButton: {
    padding: 5,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  login: {
    backgroundColor: COLORS.purpleHeart,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
  },
  signUpContainer: {
    height: 60,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  customerLabourText: {
    fontSize: 16,
    color: COLORS.purpleHeart,
    fontWeight: 'bold',
  },
  dividerStyle: {
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
});
