import firestore from '@react-native-firebase/firestore';
import {isNil, isNull} from 'lodash';
import moment from 'moment';
import NAMES from './collections';
import auth from '@react-native-firebase/auth';
import {storeData} from '../utilz';
import {ASYNCSTORAGE_KEYS} from '../constants';

export const createNewUser = async (user, name, mobile = '') => {
  const firebaseUser = await findExistingUser(user.uid);
  if (isNil(firebaseUser._data)) {
    await firestore()
      .collection(NAMES.users)
      .doc(user.uid)
      .set({
        id: user.uid,
        name,
        mobile,
        passenger: true,
        driver: false,
        created_at: moment().unix(),
        fcm_token: null,
        email: !isNull(user.email) ? user.email : null,
      });
  }
  return user;
};

export const findExistingUser = async userId => {
  return await firestore().collection(NAMES.users).doc(userId).get();
};

export const getCurrentUserId = () => {
  try {
    return auth().currentUser.uid;
  } catch (error) {
    return null;
  }
};

export const insertIntoDocument = (
  collection,
  values,
  acceptRide = false,
  created_at = moment().unix(),
) => {
  const id = getNewUniqueId(collection);
  const user_id = getCurrentUserId();
  if (acceptRide) {
    let acceptedRideData = {...values, id: id};
    storeData(ASYNCSTORAGE_KEYS.acceptedRide, acceptedRideData);
  }
  return firestore()
    .collection(collection)
    .doc(id)
    .set({
      id,
      user_id,
      created_at,
      ...values,
    });
};

export const getNewUniqueId = collection =>
  firestore().collection(collection).doc().id;

export const fetchCollection = async collection => {
  let response = await firestore().collection(collection).get();
  return response.docs.map(doc => doc.data());
};

export const fetchCollectionByCondition = async (collection, query) => {
  let response = await firestore()
    .collection(collection)
    .where(...query)
    .get();
  return response.docs.map(doc => doc.data());
};

export const getCurrentUser = () => {
  try {
    return auth().currentUser;
  } catch (error) {
    return null;
  }
};

export const fetchDocument = (collection, query) => {
  return firestore()
    .collection(collection)
    .where(...query)
    .get();
};

export const fetchUserData = (collection, id) => {
  return firestore().collection(collection).doc(id).get();
};

export const updateDocument = async (collection, docId, values) => {
  await firestore()
    .collection(collection)
    .doc(docId)
    .update({
      ...values,
    });
};

export const deleteDocument = async (collection, docId) => {
  await firestore().collection(collection).doc(docId).delete();
};
