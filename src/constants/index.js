export const NAVIGATION_SCREENS_TITLES = {
  signIn: 'Sign In',
  signUp: 'Sign Up',
  home: 'Dashboard',
  searchTrip: 'Search a Trip',
  startARide: 'Start Ride',
  ridesList: 'List of Rides',
  driverDetails: 'Driver details',
};

export const NAVIGATION_SCREEN_NAMES = {
  signIn: 'SignIn',
  signUp: 'SignUp',
  home: 'Home',
  searchTrip: 'Search',
  startARide: 'StartARide',
  ridesList: 'Rides',
  driverDetails: 'DriverDetails',
};

export const COLORS = {
  black: '#000',
  white: '#fff',
  gray: '#909090',
  purpleHeart: '#FEAC08',
  lightestGreen: '#3AC9B3',
  pinkesh: '#E86173',
  skinToneYellow: '#F49F2A',
  americanGreen: '#009881',
  lightGray: '#EFEFEF',
  fornFrond: '#421D56',
  vsCodeBlue: '#007ACC',
};

export const LABELS = {
  welcome: 'Welcome',
  signInToContinue: 'Sign in to continue',
  forgotPassword: 'Forgot Password',
  login: 'Login',
  signUpAs: 'Dont"t have an account? ',
  questionMark: '?',
  username: 'Username',
  password: 'Password',
  registerAs: 'Register to carpoolyn',
  forgotYourPassword: 'Forgot your password?',
  resetYourPassword: 'Reset your password?',
  back: 'Back',
  profile: 'Profile',
  signOut: 'Sign Out',
  create: 'Create',
  alert: 'Alert',
  accept: 'Accept',
  edit: 'Edit',
  no: 'NO',
  yes: 'YES',
  cancel: 'cancel',
};

export const REGISTRATION_LABELS = {
  username: 'Username (Email)',
  password: 'Password',
  mobile: 'Mobile',
  name: 'Name',
  register: 'Register',
  email: 'Email',
  carName: 'Car name',
  carModal: 'Car Modal',
  carColor: 'Car Color',
  plateNo: 'Plate Number',
  address: 'Address',
  registerAsDriver: 'Register as driver',
  cnic: 'Identification Number',
};

export const ALERT_TITLES = {
  usernameRequired: 'Username required!',
  passwordRequired: 'Password required!',
  authentication: 'Authentication',
  error: 'Error',
  carpoolyn: 'Carpoolyn',
};
export const ALERT_Messages = {
  emptyUserName: 'Username cannot be empty.',
  emptyPassword: 'Password cannot be empty.',
  nameEmpty: 'Name cannot be empty!',
  emailAndPasswordEmpty: 'Username or Password cannot be empty!',
  emailAddressAlreadyUsed: 'That email address is already in use!',
  invalidEmail: 'That email address is invalid!',
  somethingWentWrong: 'Something went wrong kindly try again later',
  passengerToDriver: 'Do you want to switch from Passenger to Driver?',
  driverToPassenger: 'Do you want to switch from Driver to Passenger?',
  carDetailsRequired: 'Car details required',
};

export const ICONS = {
  close: 'close',
  steering: 'steering',
  create: 'create',
  create_outline: 'create-outline',
  list: 'list',
  user: 'user',
  signOut: 'sign-out',
  checkmark: 'checkmark',
  email: 'email',
  phone: 'phone',
  location: 'location-sharp',
  tools: 'tools',
  license: 'drivers-license',
  title: 'font',
  money: 'money',
  work: 'work',
  edit: 'edit',
  checkmarkCircleOutline: 'checkmark-circle-outline',
  logout: 'logout',
  user_o: 'user-o',
  clock: 'clock',
};

export const ASYNCSTORAGE_KEYS = {
  userObject: 'User',
  acceptedRide: 'accepted_ride',
};

export const AUTHENTICATION_ERRORS = {
  emailAlreadyExists: 'auth/email-already-in-use',
  invalidEmail: 'auth/invalid-email',
};

export const CITIES = [
  {
    name: 'Peshawar',
    latitude: 33.977498,
    longitude: 71.425042,
    id: 1,
  },
  {
    name: 'Islamabad',
    latitude: 33.641479,
    longitude: 73.0390636,
    id: 2,
  },
  {
    name: 'karachi',
    latitude: 25.1264369,
    longitude: 67.0778305,
    id: 3,
  },
  {
    name: 'Lahore',
    latitude: 31.4972091,
    longitude: 74.2708652,
    id: 5,
  },
  {
    name: 'Faisalabad',
    latitude: 31.4185143,
    longitude: 72.9941911,
    id: 6,
  },
  {
    name: 'Rawalpindi',
    latitude: 33.5690758,
    longitude: 73.0004331,
    id: 7,
  },
  {
    name: 'Gujranwala',
    latitude: 32.1632379,
    longitude: 74.0742421,
    id: 8,
  },
  {
    name: 'Multan',
    latitude: 30.1814782,
    longitude: 71.3342298,
    id: 9,
  },
  {
    name: 'Hyderabad',
    latitude: 25.3837099,
    longitude: 68.3176369,
    id: 10,
  },
  {
    name: 'Quetta',
    latitude: 30.180052,
    longitude: 66.8782602,
    id: 11,
  },
];

export const IN_CITIES_TOWNS = [
  {
    id: 12,
    name: 'QASIM MARKET',
    latitude: 33.6003568,
    longitude: 73.0313292,
  },
  {
    id: 13,
    name: 'GPO SADDAR',
    latitude: 33.5948033,
    longitude: 73.0490274,
  },
  {
    id: 14,
    name: 'KACHERI',
    latitude: 33.5855807,
    longitude: 73.065297,
  },
  {
    id: 15,
    name: 'JINNAH PARK',
    latitude: 33.5859712,
    longitude: 73.0702843,
  },
  {
    id: 16,
    name: 'AMMAR CHOWK',
    latitude: 33.5912406,
    longitude: 73.0780258,
  },
  {
    id: 17,
    name: 'OLD AIRPORT',
    latitude: 33.6088534,
    longitude: 73.1025229,
  },
  {
    id: 18,
    name: 'GULZARE-E-QUAID',
    latitude: 33.5992109,
    longitude: 73.1258372,
  },
  {
    id: 19,
    name: 'KORAL CHOWK',
    latitude: 33.6047802,
    longitude: 73.1280971,
  },
  {
    id: 20,
    name: 'PWD',
    latitude: 33.5714842,
    longitude: 73.1415091,
  },
  {
    id: 21,
    name: 'SOAN GARDENS',
    latitude: 33.5619827,
    longitude: 73.1423004,
  },
  {
    id: 22,
    name: 'I 10',
    latitude: 33.648074,
    longitude: 73.0295044,
  },
  {
    id: 23,
    name: 'SUI GASE OFFICE',
    latitude: 33.653202,
    longitude: 73.0466111,
  },
  {
    id: 24,
    name: 'I 9 POLICE STATION',
    latitude: 33.6607215,
    longitude: 73.0616623,
  },
  {
    id: 25,
    name: 'I 8 MARKAZ',
    latitude: 33.6678458,
    longitude: 73.0723382,
  },
  {
    id: 26,
    name: 'FAIZABAD',
    latitude: 33.6639646,
    longitude: 73.0809623,
  },
  {
    id: 27,
    name: 'ESPRESSWAY',
    latitude: 33.5989881,
    longitude: 73.133864,
  },
  {
    id: 28,
    name: 'KHANNA PULL',
    latitude: 33.6291327,
    longitude: 73.1113668,
  },
  {
    id: 29,
    name: 'GANGAL',
    latitude: 33.4030465,
    longitude: 72.9889098,
  },
  {
    id: 30,
    name: 'CUST',
    latitude: 33.5467786,
    longitude: 73.1818092,
  },
  {
    id: 31,
    name: 'F-11 MARKAZ',
    latitude: 33.6845477,
    longitude: 72.9861383,
  },
  {
    id: 32,
    name: 'G-11 MARKAZ',
    latitude: 33.6689488,
    longitude: 72.9961771,
  },
  {
    id: 33,
    name: 'G-10',
    latitude: 33.6782688,
    longitude: 73.0070599,
  },
  {
    id: 34,
    name: 'G-9 MARKAZ',
    latitude: 33.6880807,
    longitude: 73.028584,
  },
  {
    id: 35,
    name: 'PIMS',
    latitude: 33.7039926,
    longitude: 73.0495542,
  },
  {
    id: 36,
    name: 'TNT MARKET',
    latitude: 33.6918803,
    longitude: 73.0542411,
  },
  {
    id: 37,
    name: 'ZERO POINT',
    latitude: 33.69188,
    longitude: 73.047675,
  },
  {
    id: 38,
    name: 'KAK PULL',
    latitude: 33.544031,
    longitude: 73.1761019,
  },
  {
    id: 39,
    name: 'DHA PHASE 2',
    latitude: 33.5276432,
    longitude: 73.1351744,
  },
];

export const HOME_SCREEN_LABELS = {
  startARide: 'START A RIDE',
  becomeADriver: 'BECOME A DRIVER',
  searchRides: 'SEARCH RIDES',
  ridesList: 'List of Rides',
};
