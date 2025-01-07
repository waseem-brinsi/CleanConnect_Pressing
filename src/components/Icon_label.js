// CustomModal.js
import React from 'react';
import { View, StyleSheet,Text} from 'react-native';
import icons from '../svg/svgLoader';
import colors from '../constants/colors';

const Icon_label = ({icon,title,style}) => {

  
  return (
    <View style={[styles.row,style]}>
    {React.createElement(icons[icon],{width:20,height:20})}
    <Text style={styles.label}>{title}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: 'medium',
        marginLeft  :10,
        color: colors.text
      },
    
      row: {
        flexDirection:"row",
        marginBottom:15,
    
        alignContent:"center",
        alignItems:"center"
      },
});

export default Icon_label;
