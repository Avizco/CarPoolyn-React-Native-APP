import {isNull} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import EmptyList from '../components/EmptyList';
import Loader from '../components/Loader';
import {COLORS} from '../constants';
import NAMES from '../firebase/collections';
import {
  fetchCollection,
  fetchUserData,
  getCurrentUserId,
  insertIntoDocument,
} from '../firebase/firebase';

export default function Rides({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [ridesList, setRidesList] = useState([]);
  const [user, setUser] = useState(null);
  const passenger = route.params.passenger;

  const fetchRides = useCallback(
    async currentUser => {
      try {
        let response = await fetchCollection(NAMES.rides);
        if (passenger) {
          let sharedRides = response.filter(a => a.shared_ride);
          sharedRides = sharedRides.filter(a => a.user_id !== currentUser.id);
          setRidesList(sharedRides);
        } else {
          let rides = response.filter(a => a.user_id !== currentUser.id);
          setRidesList(rides);
        }

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    },
    [passenger],
  );

  const getUserData = useCallback(async () => {
    let user_id = getCurrentUserId();
    let {_data} = await fetchUserData(NAMES.users, user_id);
    setUser(_data);
    fetchRides(_data);
  }, [fetchRides]);

  const acceptARide = async item => {
    try {
      setLoading(true);
      let copyItem = JSON.parse(JSON.stringify(item));
      delete item.id;
      let data = {...item, driver_id: user.id, ride_id: copyItem.id};
      delete data.created_at;
      await insertIntoDocument(NAMES.acceptedRides, data, true);
      navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.rideButton}>
        <Text style={styles.boldTitle}>
          <Text style={styles.boldText}>Passenger name: </Text>
          {item.name}
        </Text>
        <Text style={styles.marginTopText}>
          <Text style={styles.boldText}>From: </Text>
          {item.from}
        </Text>
        <Text style={styles.marginTopText}>
          <Text style={styles.boldText}>To: </Text> {item.to}
        </Text>
        <View style={styles.seatsContainer}>
          <Text style={styles.marginTopText}>
            <Text style={styles.boldText}>Seats left: </Text>
            {`${3 - Number(item.no_of_seats)}`}
          </Text>
          <Text style={styles.boldTitle}>
            <Text style={styles.boldText}>Booked Seats: </Text>{' '}
            {item.no_of_seats}
          </Text>
        </View>
        <Text style={styles.boldTitle}>
          <Text style={styles.boldText}>Price: </Text> Rs {item.price}
        </Text>
        {!isNull(user) && user.driver && !passenger && (
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => acceptARide(item)}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        )}
        {passenger && (
          <TouchableOpacity
            style={styles.acceptButton}
            // onPress={() => acceptARide(item)}
          >
            <Text style={styles.acceptText}>Share Ride</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Text style={styles.title}>Rides List!!!</Text>
      <FlatList
        data={ridesList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyList title={'List is empty'} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: COLORS.black,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  rideButton: {
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#fbc312',
    marginTop: 20,
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  seatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  marginTopText: {
    color: '#2c3443',
    marginTop: 10,
  },
  boldTitle: {
    color: '#2c3443',
  },
  acceptText: {
    fontWeight: '500',
    fontSize: 16,
  },
  acceptButton: {
    backgroundColor: '#2c3443',
    borderRadius: 8,
    marginTop: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
