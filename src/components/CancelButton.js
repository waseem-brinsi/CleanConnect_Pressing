import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import colors from '../constants/colors';

const CancelButton = ({HandleCancel,CancelText,style }) => {



  return (
    <View style={[styles.actionButtonsContainer,style]}>
    
            <TouchableOpacity style={styles.actionButton} onPress={HandleCancel} >
                <Text style={styles.actionButtonText}>{CancelText}</Text>
            </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background2,
    borderColor:colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderWidth:1
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color:colors.primary,
    fontWeight: 'bold',
  },
});

export default CancelButton;
