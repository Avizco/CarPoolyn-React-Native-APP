import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLORS} from '../constants';

const GoogleAutocomplete = ({onPress}) => {
  return (
    <GooglePlacesAutocomplete
      autoFocus={true}
      placeholder="Search"
      fetchDetails={true}
      onPress={(data, details = null) => onPress(data, details)}
      query={{
        key: 'AIzaSyAMPepkiWkVAjBJ7eCDMOCfR462gXCgNeo',
        language: 'en',
        components: 'country:pk',
      }}
      textInputProps={{
        placeholderTextColor: COLORS.black,
        returnKeyType: 'search',
      }}
      minLength={2}
      styles={{
        description: {color: 'black'},
        textInput: {
          height: 44,
          color: COLORS.black,
          fontSize: 16,
          borderWidth: 0.5,
          margin: 5,
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
        },
        predefinedPlacesDescription: {
          color: COLORS.black,
        },
        listView: {color: 'black', zIndex: 100000}, // doesnt work, text is still white?
      }}
    />
  );
};

export default GoogleAutocomplete;
