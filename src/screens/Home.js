import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ALERT_Messages,
  ALERT_TITLES,
  ASYNCSTORAGE_KEYS,
  COLORS,
  HOME_SCREEN_LABELS,
  ICONS,
  LABELS,
  NAVIGATION_SCREEN_NAMES,
} from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData, showAlert, signOut} from '../utilz';
import Loader from '../components/Loader';
import MapView, {Marker} from 'react-native-maps';
import {isNull, isUndefined} from 'lodash';
import {
  deleteDocument,
  fetchUserData,
  getCurrentUserId,
} from '../firebase/firebase';
import NAMES from '../firebase/collections';
import {useIsFocused} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [loading, setLoading] = useState(false);
  const [driverMode, setDriverMode] = useState(false);
  const [user, setUser] = useState(null);
  const mapView = useRef();
  const isFocused = useIsFocused();
  const [acceptedRide, setAcceptedRide] = useState(null);
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  const changeUserType = useCallback(() => {
    !driverMode
      ? Alert.alert(ALERT_TITLES.carpoolyn, ALERT_Messages.passengerToDriver, [
          {
            text: LABELS.no,
            onPress: () => console.log(LABELS.cancel),
            style: LABELS.cancel,
          },
          {
            text: LABELS.yes,
            onPress: () => {
              if (!user.driver) {
                navigation.navigate(NAVIGATION_SCREEN_NAMES.driverDetails);
              } else {
                checkStartedRide();
                setDriverMode(true);
              }
            },
          },
        ])
      : Alert.alert(ALERT_TITLES.carpoolyn, ALERT_Messages.driverToPassenger, [
          {
            text: LABELS.no,
            onPress: () => console.log(LABELS.cancel),
            style: LABELS.cancel,
          },
          {text: LABELS.yes, onPress: () => setDriverMode(false)},
        ]);
  }, [driverMode, navigation, user]);

  const logoutUser = useCallback(() => {
    setLoading(true);
    let isSignOut = signOut();
    if (isSignOut) {
      navigation.replace(NAVIGATION_SCREEN_NAMES.signIn);
    } else {
      showAlert(ALERT_TITLES.error, ALERT_Messages.somethingWentWrong);
      setLoading(false);
    }
  }, [navigation]);

  const getUserData = async () => {
    let user_id = getCurrentUserId();
    let {_data} = await fetchUserData(NAMES.users, user_id);
    setUser(_data);
  };

  const checkStartedRide = async () => {
    let startedRide = await getData(ASYNCSTORAGE_KEYS.acceptedRide);
    let startPoint = {
      latitude: startedRide.from_coordinates.lat,
      longitude: startedRide.from_coordinates.lng,
    };
    let endPoint = {
      latitude: startedRide.to_coordinates.lat,
      longitude: startedRide.to_coordinates.lng,
    };
    let bothPoints = [startPoint, endPoint];
    setTimeout(() => {
      !isUndefined(mapView.current) &&
        mapView.current.fitToCoordinates(bothPoints, {
          edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
          animated: true,
        });
    }, 100);
    setOrigin(startPoint);
    setDestination(endPoint);
    setAcceptedRide(startedRide);
  };

  const finishRide = async () => {
    try {
      setLoading(true);
      await deleteDocument(NAMES.rides, acceptedRide.ride_id);
      setLoading(false);
      AsyncStorage.removeItem(ASYNCSTORAGE_KEYS.acceptedRide);
      setAcceptedRide(null);
      let region = {
        latitude: 33.6365843,
        longitude: 73.0657196,
        latitudeDelta: 0.4292,
        longitudeDelta: 0.4242,
      };
      mapView.current.animateToRegion(region, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    checkStartedRide();
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: driverMode ? 'Driver' : 'Passenger',
      headerTintColor: COLORS.purpleHeart,
      headerRight: () => (
        <>
          <TouchableOpacity
            style={styles.driverPassengerIcon}
            onPress={changeUserType}>
            {driverMode ? (
              <MaterialCommunityIcons
                name={ICONS.steering}
                size={styles.iconSize}
                color={COLORS.purpleHeart}
              />
            ) : (
              <FontAwesome
                name={ICONS.user_o}
                size={styles.iconSize}
                color={COLORS.purpleHeart}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logout}
            onPress={() => {
              Alert.alert('Are you sure', 'You want to logout?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => logoutUser()},
              ]);
            }}>
            <MaterialIcons
              name={ICONS.logout}
              size={styles.iconSize}
              color={COLORS.purpleHeart}
            />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation, logoutUser, driverMode, changeUserType]);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      {!isNull(user) && (
        <>
          <MapView
            ref={mapView}
            style={styles.map}
            initialRegion={{
              latitude: 33.6365843,
              longitude: 73.0657196,
              latitudeDelta: 0.4292,
              longitudeDelta: 0.4242,
            }}>
            {!isNull(acceptedRide) && driverMode && (
              <>
                <Marker coordinate={origin} />
                <Marker coordinate={destination} />
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  strokeWidth={4}
                  strokeColor={'#00B0FF'}
                  apikey={'AIzaSyBpe3EQHVfwa1b0-sU-eJMKGwizjaqWtfo'}
                />
              </>
            )}
          </MapView>
          <View style={styles.absoluteViewContainer}>
            {!driverMode ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NAVIGATION_SCREEN_NAMES.startARide)
                  }
                  activeOpacity={styles.buttonOpacity}
                  style={styles.searchRides}>
                  <Text style={styles.triggerButtonText}>
                    {HOME_SCREEN_LABELS.startARide}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NAVIGATION_SCREEN_NAMES.ridesList, {
                      passenger: !driverMode,
                    })
                  }
                  activeOpacity={styles.buttonOpacity}
                  style={styles.becomeDriver}>
                  <Text style={styles.triggerButtonText}>
                    {HOME_SCREEN_LABELS.ridesList}
                  </Text>
                </TouchableOpacity>
                {!user.driver && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(NAVIGATION_SCREEN_NAMES.driverDetails)
                    }
                    activeOpacity={styles.buttonOpacity}
                    style={styles.becomeDriver}>
                    <Text style={styles.triggerButtonText}>
                      {HOME_SCREEN_LABELS.becomeADriver}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                {isNull(acceptedRide) ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(NAVIGATION_SCREEN_NAMES.ridesList, {
                        passenger: !driverMode,
                      })
                    }
                    activeOpacity={styles.buttonOpacity}
                    style={styles.searchRides}>
                    <Text style={styles.triggerButtonText}>
                      {HOME_SCREEN_LABELS.searchRides}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={finishRide}
                    activeOpacity={styles.buttonOpacity}
                    style={styles.searchRides}>
                    <Text style={styles.triggerButtonText}>Finish Ride</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  citiesPicker: {
    width: '70%',
  },
  fromText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  textAndPickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  modalInnerView: {
    height: 220,
  },
  iconSize: 25,
  map: {
    flex: 1,
  },
  tabStyle: {
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  logout: {
    padding: 5,
    marginLeft: 5,
  },
  driverPassengerIcon: {
    padding: 5,
  },
  tabTextStyle: {
    fontSize: 16,
    color: COLORS.black,
  },
  activeTabStyle: {
    backgroundColor: COLORS.purpleHeart,
  },
  activeTabTextStyle: {
    fontSize: 16,
    color: '#fff',
  },
  tabsContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  absoluteViewContainer: {
    position: 'absolute',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
  },
  fromwhereButton: {
    marginHorizontal: 20,
    height: 35,
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
    height: 35,
    backgroundColor: COLORS.white,
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: 'gray',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectDateTime: {
    marginHorizontal: 20,
    height: 35,
    marginTop: 6,
    backgroundColor: COLORS.white,
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: 'gray',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchRides: {
    height: 45,
    backgroundColor: COLORS.purpleHeart,
    marginHorizontal: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  becomeDriver: {
    height: 45,
    backgroundColor: COLORS.purpleHeart,
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  triggerButtonText: {
    fontWeight: '400',
    color: COLORS.white,
  },
  rightAlignIcon: {
    marginLeft: '40%',
  },
  rightAlignClockIcon: {
    marginLeft: '40%',
  },
  dateTimeText: isDate => {
    return {
      width: '40%',
      color: isDate ? COLORS.gray : COLORS.black,
    };
  },
  bottomCarCategory: {
    flex: 1,
    marginTop: 70,
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carButton: {
    width: '30%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 80,
    width: 120,
  },
  rideText: {
    color: COLORS.black,
    fontWeight: '500',
  },
  buttonOpacity: 0.6,
});
