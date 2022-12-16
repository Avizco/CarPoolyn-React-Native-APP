import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  ALERT_Messages,
  ALERT_TITLES,
  AUTHENTICATION_ERRORS,
  COLORS,
  LABELS,
  REGISTRATION_LABELS,
} from '../constants';
import TextInputComponent from '../components/TextInputComponent';
import auth from '@react-native-firebase/auth';

import Loader from '../components/Loader';
import {isEmpty} from 'lodash';
import {showAlert} from '../utilz';
import {createNewUser} from '../firebase/firebase';

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const createAccount = () => {
    try {
      setLoading(true);
      if (isEmpty(name.trim())) {
        showAlert(ALERT_TITLES.authentication, ALERT_Messages.nameEmpty);
      } else if (isEmpty(username.trim()) || isEmpty(password.trim())) {
        showAlert(
          ALERT_TITLES.authentication,
          ALERT_Messages.emailAndPasswordEmpty,
        );
      } else {
        auth()
          .createUserWithEmailAndPassword(username, password)
          .then(response => {
            console.log(response);
            createDatabaseEntry(response.user._user);
          })
          .catch(error => {
            if (error.code === AUTHENTICATION_ERRORS.emailAlreadyExists) {
              showAlert(
                ALERT_TITLES.error,
                ALERT_Messages.emailAddressAlreadyUsed,
              );
            } else if (error.code === AUTHENTICATION_ERRORS.invalidEmail) {
              showAlert(ALERT_TITLES.error, ALERT_Messages.invalidEmail);
            } else {
              showAlert(ALERT_TITLES.error, error.code);
            }
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createDatabaseEntry = async user => {
    try {
      await createNewUser(user, name, mobile);
      navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCustomerDesign = () => {
    return (
      <View>
        <TextInputComponent
          value={name}
          onChangeText={setName}
          placeholder={REGISTRATION_LABELS.name}
        />
        <TextInputComponent
          value={username}
          onChangeText={setUsername}
          placeholder={REGISTRATION_LABELS.username}
        />
        <TextInputComponent
          value={password}
          onChangeText={setPassword}
          placeholder={REGISTRATION_LABELS.password}
          secureTextEntry={true}
        />
        <TextInputComponent
          value={mobile}
          onChangeText={setMobile}
          placeholder={REGISTRATION_LABELS.mobile}
        />
        <TouchableOpacity style={styles.registerButton} onPress={createAccount}>
          <Text style={styles.loginText}>{REGISTRATION_LABELS.register}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.registerView}>
        <Text style={styles.registerAsText}>{LABELS.registerAs}</Text>
      </View>
      <ScrollView>{renderCustomerDesign()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  registerButton: {
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
  registerView: {
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
  },
  registerAsText: {
    fontSize: 20,
    color: COLORS.black,
  },
});
