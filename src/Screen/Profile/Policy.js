import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,Dimensions,ScrollView  } from 'react-native';
import { API_BASE_URL } from  '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import Icon_label from '../../components/Icon_label';
import Title_Subtitle from '../../components/Title_Subtitle';
import HeaderComponent from '../../components/HeaderComponent';


const { width,height } = Dimensions.get('window');


const Policy = ({ navigation }) => {


  return (
<SafeAreaView style={styles.safeArea}>

        <View style={styles.BigLogo}>
          {React.createElement(icons['BigLogo1'])}
        </View>
        <HeaderComponent title={"Politique de confidentialité"}></HeaderComponent>
    <ScrollView>
        <View style={styles.container}>
        <Title_Subtitle 
        title={"Politique 1"}
        subtitle={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat diam, sit amet posuere nibh. Phasellus rutrum metus nisl, nec gravida turpis ornare sit amet. Aliquam auctor, ipsum a consectetur congue, libero ipsum feugiat sem, at accumsan felis tellus sit amet sapien. Nulla dui ligula, ornare sed ipsum et, finibus lobortis turpis. In hac habitasse platea dictumst. Duis vel turpis ac justo rutrum tempor. Cras magna odio, sagittis vitae ipsum non, venenatis tempor turpis.`}/>

        <Title_Subtitle 
        title={"Politique 2"}
        subtitle={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat diam, sit amet posuere nibh. Phasellus rutrum metus nisl, nec gravida turpis ornare sit amet. Aliquam auctor, ipsum a consectetur congue, libero ipsum feugiat sem, at accumsan felis tellus sit amet sapien. Nulla dui ligula, ornare sed ipsum et, finibus lobortis turpis. In hac habitasse platea dictumst. Duis vel turpis ac justo rutrum tempor. Cras magna odio, sagittis vitae ipsum non, venenatis tempor turpis.`}/>

        <Title_Subtitle 
        title={"Politique 3"}
        subtitle={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat diam, sit amet posuere nibh. Phasellus rutrum metus nisl, nec gravida turpis ornare sit amet. Aliquam auctor, ipsum a consectetur congue, libero ipsum feugiat sem, at accumsan felis tellus sit amet sapien. Nulla dui ligula, ornare sed ipsum et, finibus lobortis turpis. In hac habitasse platea dictumst. Duis vel turpis ac justo rutrum tempor. Cras magna odio, sagittis vitae ipsum non, venenatis tempor turpis.`}/>
        

        <Title_Subtitle 
        title={"Politique 4"}
        subtitle={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat diam, sit amet posuere nibh. Phasellus rutrum metus nisl, nec gravida turpis ornare sit amet. Aliquam auctor, ipsum a consectetur congue, libero ipsum feugiat sem, at accumsan felis tellus sit amet sapien. Nulla dui ligula, ornare sed ipsum et, finibus lobortis turpis. In hac habitasse platea dictumst. Duis vel turpis ac justo rutrum tempor. Cras magna odio, sagittis vitae ipsum non, venenatis tempor turpis.`}/>
        
        </View>
    </ScrollView>

    </SafeAreaView>

  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position:'relative',
    backgroundColor: colors.white,
  },
  BigLogo: {
    position:'absolute',
    // top:-100,
    // left:-100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,  
  },

});

export default Policy;