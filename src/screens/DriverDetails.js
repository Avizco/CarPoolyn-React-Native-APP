import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  ALERT_Messages,
  ALERT_TITLES,
  ASYNCSTORAGE_KEYS,
  COLORS,
  LABELS,
  REGISTRATION_LABELS,
} from '../constants';
import TextInputComponent from '../components/TextInputComponent';
import Loader from '../components/Loader';
import {isEmpty} from 'lodash';
import {showAlert, storeData} from '../utilz';
import {
  fetchUserData,
  getCurrentUserId,
  updateDocument,
} from '../firebase/firebase';
import NAMES from '../firebase/collections';

export default function DriverDetails({navigation}) {
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('');
  const [cnic, setCnic] = useState('');
  const [modal, setModal] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const registerADriver = () => {
    try {
      setLoading(true);
      if (isEmpty(cnic.trim())) {
        showAlert(ALERT_TITLES.authentication, 'CNIC required');
      } else if (isEmpty(address.trim())) {
        showAlert(ALERT_TITLES.authentication, 'Address required!!');
      } else if (
        isEmpty(carName.trim()) ||
        isEmpty(modal.trim()) ||
        isEmpty(plateNumber.trim()) ||
        isEmpty(carColor.trim())
      ) {
        showAlert(
          ALERT_TITLES.authentication,
          ALERT_Messages.carDetailsRequired,
        );
      } else {
        updateUserDetails();
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const updateUserDetails = async () => {
    try {
      let user_id = getCurrentUserId();
      let data = {
        car_name: carName,
        car_modal: modal,
        car_color: carColor,
        plate_number: plateNumber,
        address,
        cnic,
        driver: true,
      };
      await updateDocument(NAMES.users, user_id, data);
      Alert.alert(
        'Congratulations!',
        'You have successfully became a driver for carpoolyn',
      );
      let {_data} = await fetchUserData(NAMES.users, user_id);
      storeData(ASYNCSTORAGE_KEYS.userObject, _data);
      navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCustomerDesign = () => {
    return (
      <View>
        <TextInputComponent
          value={carName}
          onChangeText={setCarName}
          placeholder={REGISTRATION_LABELS.carName}
        />
        <TextInputComponent
          value={carColor}
          onChangeText={setCarColor}
          placeholder={REGISTRATION_LABELS.carColor}
        />
        <TextInputComponent
          value={modal}
          onChangeText={setModal}
          placeholder={REGISTRATION_LABELS.carModal}
        />
        <TextInputComponent
          value={plateNumber}
          onChangeText={setPlateNumber}
          placeholder={REGISTRATION_LABELS.plateNo}
        />
        <TextInputComponent
          value={address}
          onChangeText={setAddress}
          placeholder={REGISTRATION_LABELS.address}
        />
        <TextInputComponent
          value={cnic}
          onChangeText={setCnic}
          placeholder={REGISTRATION_LABELS.cnic}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={registerADriver}>
          <Text style={styles.loginText}>
            {REGISTRATION_LABELS.registerAsDriver}
          </Text>
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
