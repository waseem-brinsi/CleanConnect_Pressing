import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, Alert, Platform } from 'react-native';

const TrackingMap = () => {
  const callNumber = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;

    if (Platform.OS === 'android') {
      Linking.openURL(url).catch((err) => {
        console.error('Error making a phone call:', err);
        Alert.alert('Error', 'Unable to make a call. Please check your device settings.');
      });
    } else if (Platform.OS === 'ios') {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url);
          } else {
            Alert.alert('Error', 'Phone call is not supported on this device.');
          }
        })
        .catch((err) => {
          console.error('Error checking phone call support:', err);
        });
    } else {
      Alert.alert('Error', 'Phone call is not supported on this platform.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => callNumber('123456789')}
        >
          <Text style={styles.buttonText}>Call 123456789</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => callNumber('987654321')}
        >
          <Text style={styles.buttonText}>Call 987654321</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f8f9fa',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrackingMap;
