// CustomModal.js
import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import colors from '../constants/colors';


const { width } = Dimensions.get('window');
const CustomModal = ({ visible, onClose, title, description,button1,button2,HandleConfimation  }) => {


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonContainer}>

            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={HandleConfimation} >
                  <Text style={[styles.actionButtonText,{color:'#fff'}]}>{button1}</Text>
                </TouchableOpacity>
            </View>
            

            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity 
                style={[styles.actionButton,
                { backgroundColor: colors.background2,borderColor:colors.primary,borderWidth:1}]} 
                onPress={onClose}>
                  <Text style={styles.actionButtonText}>{button2}</Text>
                </TouchableOpacity> 
            </View>

        </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    width: width/1.1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height:35,
  },

  actionButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5549EF',
    borderRadius: 20,
    // paddingHorizontal: 50,
    width:width/3,
    flex: 1,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    // paddingHorizontal: 50,
    width:width/3,
    flex: 1,
  },

  actionButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default CustomModal;
