// CustomModal.js
import React from 'react';
import { View, StyleSheet} from 'react-native';
const HorizontalLine = ({style}) => {

  
  return (
          <View style={[styles.horizontalLine,style]}>          
          </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    height: 1, 
    width: '100%', 
    marginVertical: 10,
  },
});

export default HorizontalLine;
