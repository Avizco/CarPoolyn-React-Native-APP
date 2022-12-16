import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {isEmpty, isNull} from 'lodash';
import GoogleAutocomplete from '../components/GoogleAutocomplete';
import {COLORS} from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import CloseModalHeader from '../components/CloseHeaderModal';
import {
  fetchUserData,
  getCurrentUserId,
  insertIntoDocument,
} from '../firebase/firebase';
import NAMES from '../firebase/collections';
import Loader from '../components/Loader';

export default function StartARide({navigation}) {
  const [loading, setLoading] = useState(false);
  const [isRideSharingEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [selectFrom, setSelectFrom] = useState('');
  const [selectedFromLatLng, setSelectedFromlatlng] = useState(null);
  const [selectedToLatLng, setSelectedTolatlng] = useState(null);
  const [selectTo, setSelectTo] = useState('');
  const [fromModalVisible, setFromModalVisible] = useState(false);
  const [toModalVisible, setToModalVisible] = useState(false);
  const [noOfSeats, setNoOfSeats] = useState('1');
  const [averagePrice, setAveragePrice] = useState(0);

  const toggleFromModal = () => {
    setFromModalVisible(!fromModalVisible);
  };
  const toggleToModal = () => {
    setToModalVisible(!toModalVisible);
  };

  const fromWhere = (data, details) => {
    setSelectFrom(data.description);
    setSelectedFromlatlng(details.geometry.location);
    toggleFromModal();
  };

  const whereToGo = (data, details) => {
    setSelectTo(data.description);
    setSelectedTolatlng(details.geometry.location);
    !isNull(selectedFromLatLng) &&
      calculateAveragePrice(details.geometry.location);
    toggleToModal();
  };

  const calculateAveragePrice = selectToLocation => {
    let distance =
      calcDistance(
        selectedFromLatLng.lat,
        selectedFromLatLng.lng,
        selectToLocation.lat,
        selectToLocation.lng,
      ) + 0.5;
    let price = distance * 35;
    setAveragePrice(price);
  };

  const calcDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; //radius of earth in km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };

  // Converts numeric degrees to radians
  const toRad = Value => {
    return (Value * Math.PI) / 180;
  };

  const bookUserRide = async () => {
    try {
      setLoading(true);
      let user_id = getCurrentUserId();
      let {_data} = await fetchUserData(NAMES.users, user_id);
      let distance =
        calcDistance(
          selectedFromLatLng.lat,
          selectedFromLatLng.lng,
          selectedToLatLng.lat,
          selectedToLatLng.lng,
        ) + 0.5;
      let price = distance * 35;
      let data = {
        from: selectFrom,
        to: selectTo,
        from_coordinates: selectedFromLatLng,
        to_coordinates: selectedToLatLng,
        no_of_seats: noOfSeats,
        shared_ride: isRideSharingEnabled,
        distance: distance + 0.5,
        price: price.toFixed(0),
        name: isNull(_data) ? user_id : _data.name,
      };
      await insertIntoDocument(NAMES.rides, data);
      Alert.alert('Success', 'Ride booked successfully.');
      navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Text style={styles.title}>Book your Ride!!!</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.fromwhereButton}
        onPress={toggleFromModal}>
        <Entypo name="dot-single" size={30} color={COLORS.americanGreen} />
        <Text style={styles.dateTimeText(isEmpty(selectFrom))}>
          {isEmpty(selectFrom) ? 'From where?' : selectFrom}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isNull(selectedFromLatLng)}
        activeOpacity={0.6}
        style={styles.whereButton}
        onPress={toggleToModal}>
        <Entypo name="dot-single" size={30} color={COLORS.americanGreen} />
        <Text style={styles.dateTimeText(isEmpty(selectTo))}>
          {isEmpty(selectTo) ? 'Where to go?' : selectTo}
        </Text>
      </TouchableOpacity>
      <View style={styles.switchView}>
        <Text style={{color: COLORS.black}}>Number of seats to book?</Text>
        <Picker
          dropdownIconColor={COLORS.black}
          style={styles.pickerStyle}
          selectedValue={noOfSeats}
          onValueChange={(itemValue, itemIndex) => setNoOfSeats(itemValue)}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
      </View>
      <View style={styles.switchView}>
        <Text style={{color: COLORS.black}}>Shared Ride?</Text>
        <Switch
          trackColor={{false: '#767577', true: COLORS.skinToneYellow}}
          thumbColor={isRideSharingEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isRideSharingEnabled}
        />
      </View>
      {averagePrice !== 0 && (
        <Text style={styles.rupeesText}>
          Price: Rs {averagePrice.toFixed(0)}
        </Text>
      )}
      <TouchableOpacity
        onPress={bookUserRide}
        activeOpacity={styles.buttonOpacity}
        style={styles.searchRides}>
        <Text style={styles.triggerButtonText}>{'Book ride'}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={fromModalVisible}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}>
        <View style={styles.modalContainer}>
          <CloseModalHeader
            onPress={toggleFromModal}
            backgroundColor={COLORS.white}
            iconColor={COLORS.black}
            selectMediaTitle={'From'}
          />
          <GoogleAutocomplete onPress={fromWhere} />
        </View>
      </Modal>
      <Modal
        isVisible={toModalVisible}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}>
        <View style={styles.modalContainer}>
          <CloseModalHeader
            onPress={toggleToModal}
            backgroundColor={COLORS.white}
            iconColor={COLORS.black}
            selectMediaTitle={'Where to go?'}
          />
          <GoogleAutocomplete onPress={whereToGo} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  buttonOpacity: 0.6,
  searchRides: {
    height: 45,
    backgroundColor: COLORS.purpleHeart,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  triggerButtonText: {
    fontWeight: '400',
    color: COLORS.white,
  },
  dateTimeText: isDate => {
    return {
      width: '90%',
      color: isDate ? COLORS.gray : COLORS.black,
    };
  },
  fromwhereButton: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 50,
    backgroundColor: COLORS.white,
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: 'gray',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  whereButton: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: COLORS.white,
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: 'gray',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchView: {
    flexDirection: 'row',
    height: 60,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.black,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  pickerStyle: {
    width: 100,
    color: COLORS.black,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  rupeesText: {
    marginHorizontal: 20,
    marginVertical: 20,
    color: COLORS.black,
  },
});
