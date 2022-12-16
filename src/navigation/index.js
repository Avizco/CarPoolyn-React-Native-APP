import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ASYNCSTORAGE_KEYS,
  NAVIGATION_SCREENS_TITLES,
  NAVIGATION_SCREEN_NAMES,
} from '../constants';
import {getData, navigationOptions} from '../utilz';
import {
  HomeScreen,
  SearchTripScreen,
  SignInScreen,
  SignUpScreen,
  StartARideScreen,
  RidesScreen,
  DriverDetailsScreen,
} from '../screens';
import {isNull} from 'lodash';

const Stack = createNativeStackNavigator();

export default function App() {
  const [startRoute, setStartRoute] = useState(false);
  const [routeName, setInitialRoute] = useState(NAVIGATION_SCREEN_NAMES.signIn);

  useEffect(() => {
    async function checkInitialRoute() {
      let user = await getData(ASYNCSTORAGE_KEYS.userObject);
      if (isNull(user)) {
        setInitialRoute(NAVIGATION_SCREEN_NAMES.signIn);
      } else {
        setInitialRoute(NAVIGATION_SCREEN_NAMES.home);
      }
      setStartRoute(true);
    }

    checkInitialRoute();
  }, []);

  return (
    <>
      {startRoute ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
              name={NAVIGATION_SCREEN_NAMES.signIn}
              component={SignInScreen}
              options={navigationOptions(
                NAVIGATION_SCREENS_TITLES.signIn,
                false,
              )}
            />
            <Stack.Screen
              name={NAVIGATION_SCREEN_NAMES.signUp}
              component={SignUpScreen}
              options={navigationOptions(
                NAVIGATION_SCREENS_TITLES.register,
                true,
              )}
            />
            <Stack.Screen
              name={NAVIGATION_SCREEN_NAMES.home}
              component={HomeScreen}
              options={navigationOptions(NAVIGATION_SCREENS_TITLES.home, true)}
            />
            <Stack.Screen
              name={NAVIGATION_SCREEN_NAMES.searchTrip}
              component={SearchTripScreen}
              options={navigationOptions(
                NAVIGATION_SCREENS_TITLES.searchTrip,
                true,
              )}
            />
            <Stack.Screen
              name={NAVIGATION_SCREEN_NAMES.startARide}
              component={StartARideScreen}
              options={navigationOptions(
                NAVIGATION_SCREENS_TITLES.startARide,
                true,
              )}
            />
            <Stack.Screen
              name={NAVIGATION_SCREEN_NAMES.ridesList}
              component={RidesScreen}
              options={navigationOptions(
                NAVIGATION_SCREENS_TITLES.ridesList,
                true,
              )}
            />
            <Stack.Screen
              name={NAVIGATION_SCREEN_NAMES.driverDetails}
              component={DriverDetailsScreen}
              options={navigationOptions(
                NAVIGATION_SCREENS_TITLES.driverDetails,
                true,
              )}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : null}
    </>
  );
}
