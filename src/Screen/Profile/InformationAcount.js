import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import Icon_label from '../../components/Icon_label';
import ConfirmeButton from '../../components/ConfirmeButton';
import CancelButton from '../../components/CancelButton';

const InformationAcount = ({navigation}) => {


  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState('Nom');
  const [email, setEmail] = useState('E-mail');


  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const saveChanges = () => {
    // You can handle the save logic here
    console.log('Changes saved:', { name, email });
    setIsEditable(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

        <View style={styles.BigLogo}>
          {React.createElement(icons['BigLogo1'])}
        </View>

        <HeaderComponent title="Information personnelles"  />

          <View style={styles.container}>
                <View style={styles.text_button}>
                    <Text style={styles.label}> Informations Personnelles</Text>
                    <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
                      <Text style={styles.editButtonText}>{isEditable ? 'Cancel' : 'Modifier'}</Text>
                    </TouchableOpacity>
                </View>

                <Icon_label icon={"User"} title={"Nom et prénom"} />
                <TextInput
                  style={[styles.input, !isEditable && styles.disabledInput]}
                  value={name}
                  editable={isEditable}
                  onChangeText={setName}
                />

                <Icon_label icon={"Email"} title={"Email"} />
                <TextInput
                  style={[styles.input, !isEditable && styles.disabledInput]}
                  value={email}
                  editable={isEditable}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                {isEditable && (
                  <View>
                    <ConfirmeButton HandleConfimation={saveChanges} ConfirmeText={"save"}/>
                    <CancelButton HandleCancel={toggleEdit} CancelText={"Cancel"} />
                  </View>
                )}

              </View>
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
  },
  container: {
    flex: 1,
    padding: 20,
  },
  text_button:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:'center',
    alignItems:"center"
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: colors.background2,
    borderRadius: 50,
  },
  editButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },

});

export default InformationAcount;
