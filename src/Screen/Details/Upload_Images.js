
import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,Alert,Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';





const Upload_Images = ({data,setData,selectedItem}) => {
  const [activeSection, setActiveSection] = useState(1);

  // const [data, setData] = useState([
  //   { id: '1', category: 'Hauts', title: 'T-Shirts' },
  //   { id: '2', category: 'Hauts', title: 'Chemise' },
  //   { id: '3', category: 'Hauts', title: 'Pull' },
  //   { id: '4', category: 'Hauts', title: 'Blouson' },
  // ]);

  console.log(selectedItem.id)
  const [images1, setImages1] = useState(data.find(item => item.id == selectedItem.id).images1);

  const [images2, setImages2] = useState(data.find(item => item.id == selectedItem.id).images2);
  const [images3, setImages3] = useState(data.find(item => item.id == selectedItem.id).images3);


  useEffect(() => {
    
    setData(prevData =>
      prevData.map(item =>
        item.id == selectedItem.id
          ? { 
              ...item, 
              images1: [...images1], 
              images2: [...images2], 
              images3: [...images3] 
            } 
          : item
      )
    );
  }, [images1, images2, images3]);

  const pickImages = async (setImages, useCamera = false) => {
    const permissionResult = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need permissions to make this work!');
      return;
    }

    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          quality: 1,
        });

    if (!result.canceled) {
      const uris = useCamera ? [result.assets[0].uri] : result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...uris]);
    }
  };

  const handleImageSelection = (setImages) => {
    Alert.alert('Select Option', 'Choose an action', [
      { text: 'Take Photo', onPress: () => pickImages(setImages, true) },
      { text: 'Choose from Gallery', onPress: () => pickImages(setImages) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleRemoveImage = (setImages, index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 1:
        return (
      <View style={styles.section}>
            <TouchableOpacity   onPress={() => handleImageSelection(setImages1)}>
                {React.createElement(icons['UploadImage'], { width: 100, height: 100  })}
            </TouchableOpacity>
            
            <ScrollView horizontal>
              {images1.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveImage(setImages1, index)}
                  >
                    <Text style={styles.removeText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>  
    </View>
        )
      case 2:
        return ( 
        <View style={styles.section}>

            <TouchableOpacity   onPress={() => handleImageSelection(setImages2)}>
                {React.createElement(icons['UploadImage'], { width: 100, height: 100 })}
            </TouchableOpacity>
            <ScrollView horizontal>
              {images2.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveImage(setImages2, index)}
                  >
                    <Text style={styles.removeText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
      </View>
      )
      case 3:
        return (
        <View style={styles.section}>

            <TouchableOpacity   onPress={() => handleImageSelection(setImages3)}>
                {React.createElement(icons['UploadImage'], { width: 100, height: 100 })}
            </TouchableOpacity>
        <ScrollView horizontal>
          {images3.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveImage(setImages3, index)}
              >
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      );
      default:
        return <Text style={styles.sectionText}>This is Section 1</Text>;
    }
  };

  console.log(data)
  return (
    <View >

      <View style={styles.sectionButtons}>
        <TouchableOpacity onPress={() => setActiveSection(1)} style={styles.button}>
          <Text style={[styles.buttonText, activeSection === 1 && styles.activeButtonText]}>Lavage/Repassage</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveSection(2)} style={styles.button}>
          <Text style={[styles.buttonText, activeSection === 2 && styles.activeButtonText]}>Lavage à sec</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveSection(3)} style={styles.button}>
          <Text style={[styles.buttonText, activeSection === 3 && styles.activeButtonText]}>Repassage</Text>
        </TouchableOpacity>
      </View>

      {/* Display the active section */}
      <View style={styles.sectionContainer}>

 

        {renderSection()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
  },
  activeButtonText: {
    color:colors.primary,
  },
  buttonText: {
    fontSize: 12,
    fontWeight:'medium',
    color:"#8C8C8C"
  },
  sectionContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  section: { 
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 5,
    marginVertical: 10,
    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default Upload_Images;