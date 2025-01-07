import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';


const Localization_StoreScreen = ({navigation}) => {

  const navigationGoBack = useNavigation();
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const lastQuery = useRef('');
  const debounceTimeout = useRef(null);

  // Request permission and get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);





  // Debounced search handler
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    // Clear previous debounce timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new debounce timeout
    debounceTimeout.current = setTimeout(() => {
      if (text.length > 3 && text !== lastQuery.current) {
        fetchSearchResults(text);
        lastQuery.current = text;
      } else {
        setSearchResults([]);
      }
    }, 500); // 500ms delay for debounce
  };

  // Fetch results from the Nominatim API
  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      // const url = `http://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`;
      const url = `https://photon.komoot.io/api/?q=${query}&limit=5&lang=fr`;
      const response = await fetch(url);
      const data = await response.json();
      const results = data.features.map((feature) => {
        const { street, name, housenumber, postcode, city, state, country } = feature.properties;
        const display_name = [
          housenumber,
          street || name,
          city,
          state,
          postcode,
          country,
        ]
          .filter(Boolean)
          .join(', '); // Joins the parts with a comma if they exist
  
        return {
          place_id: feature.properties.osm_id,
          display_name: display_name || 'Unnamed Location',
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
        };
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  const onPlaceSelected = (place) => {
    const { lat, lon } = place;
    setRegion({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setSearchQuery('');
    setSearchResults([]);
  };


  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map...</Text>
      </View>
    );
  }


  const HandleConfimation = ()=>{
    navigation.navigate('StoreInfoPay',{
      region: region
    })
  }

  return (
    <SafeAreaView>
      <View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
              {React.createElement(icons['Backarrow'], { width: 20, height: 20 })}
    </TouchableOpacity>

    <View style={styles.header}>          
      <Text  style={[styles.sectionTitle,styles.topTitle]}>Localisation sur la Carte</Text>
    </View>
      </View>

    <View style={styles.container}>




    

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Your Location"
          />
        )}
      </MapView>

      <TextInput
        style={styles.searchInput}
        placeholder="Enter Address"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading && <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 10 }} />}

      {searchResults.length > 0 && (
        <FlatList
          style={styles.resultsList}
          data={searchResults}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPlaceSelected(item)}
              style={styles.resultItem}
            >
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

    <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={HandleConfimation} >
              <Text style={styles.actionButtonText}>Confirmer l'Adresse</Text>
            </TouchableOpacity>
    </View>

    </View>
    

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",  
  },
  container: {
  height: Dimensions.get('window').height,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    borderRadius:30,
    backgroundColor:'#fff',
    top: 20, 
    left: 13,
    zIndex: 1,
  },
  header:{
    backgroundColor:"#fff",
    // marginTop:30,
    paddingVertical:20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight :'semibold',
    color:colors.primary,
    marginBottom: 10,
  },

  topTitle:{
    margin :"auto",
    marginTop:5,
    fontSize:16,
    fontWeight:"bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    height: '80%',
  },
  searchInput: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  resultsList: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    zIndex: 2,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,

    backgroundColor: '#fff',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'white',
    fontWeight: 'regular',
  },

 

});

export default Localization_StoreScreen;

