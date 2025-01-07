// CustomModal.js
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import colors from '../constants/colors';
import icons from '../svg/svgLoader';

import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const HeaderComponent = ({title,style }) => {
  const navigationGoBack = useNavigation();
  
  return (
    <View style={[styles.containnerHeader,style]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
            {React.createElement(icons['Backarrow'], { width: 15, height: 15 })}
          </TouchableOpacity>

          <View style={styles.header}>          
            <Text  style={[styles.sectionTitle,styles.topTitle]}>{title}</Text>
          </View>

    </View>

  );
};

const styles = StyleSheet.create({
  containnerHeader:{

  },
  backButton: {
    padding: 10,
    position: 'absolute',
    borderRadius:30,

    top: 20, 
    left: 13,
    zIndex: 1,
  },
  header:{

    paddingVertical:20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight :'semibold',
    color:"#5549EF",
    marginBottom: 10,
  },
  topTitle:{
    margin :"auto",
    marginTop:5,
    fontSize:16,
    fontWeight:"bold",
  },
});

export default HeaderComponent;
