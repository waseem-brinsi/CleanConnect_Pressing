import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Dimensions,Modal, StyleSheet } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../constants/colors';
import ConfirmeButton from '../../components/ConfirmeButton';
import ConfirmationModal from '../../components/ConfirmationModal';

const {width,height} = Dimensions.get('window')

const WorkTimeScreen = ({navigation}) => {
  const [days, setDays] = useState([
    { name: 'Lundi', checked: false, startTime: '', endTime: '' },
    { name: 'Mardi', checked: false, startTime: '', endTime: '' },
    { name: 'Mercredi ', checked: false, startTime: '', endTime: '' },
    { name: 'Jeudi', checked: false, startTime: '', endTime: '' },
    { name: 'Vendredi', checked: false, startTime: '', endTime: '' },
    { name: 'Samedi', checked: false, startTime: '', endTime: '' },
    { name: 'Dimanche', checked: false, startTime: '', endTime: '' },
  ]);


    const [modalVisible, setModalVisible] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeType, setTimeType] = useState('');

  const toggleCheckbox = (index) => {
    const updatedDays = [...days];
    updatedDays[index].checked = !updatedDays[index].checked;
    setDays(updatedDays);
  };

  const updateTime = (index, type, value) => {
    const updatedDays = [...days];
    updatedDays[index][type] = value;
    setDays(updatedDays);
  };

  const showPicker = (dayIndex, type) => {
    setSelectedDay(dayIndex);
    setTimeType(type);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentTime = selectedDate || new Date();
    setShowTimePicker(false);
    if (selectedDay !== null) {
      const timeString = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
      updateTime(selectedDay, timeType, timeString);
    }
  };
  console.log(days)

  return (
     <SafeAreaView style={styles.safeArea}>
<HeaderComponent title="Horaires et Jours de Travail"/>
<View style={styles.container}>
  <Text style={styles.label}>Jours et Plages Horaires de Travail</Text>
      {days.map((day, index) => (
        <View key={day.name} style={styles.dayRow}>

          <View  style={styles.dayCheckBox}>
              <Text style={styles.dayText}>{day.name}</Text>
              <TouchableOpacity  style={[styles.checkbox,day.checked && {backgroundColor:colors.primary}]} onPress={() => toggleCheckbox(index)}>
                {day.checked && <Text style={styles.checkIcon}>✔</Text>}
              </TouchableOpacity>
          </View>

          <Text style={styles.timeText}>De</Text>
          <TouchableOpacity
            style={[styles.timeButton, !day.checked && styles.disabledButton]}
            onPress={() => day.checked && showPicker(index, 'startTime')}
            disabled={!day.checked}>

          <Text style={styles.timeText}>{day.startTime || 'Start'}</Text>
          </TouchableOpacity>

          <Text style={styles.timeText}>  à</Text>
          <TouchableOpacity
            style={[styles.timeButton, !day.checked && styles.disabledButton]}
            onPress={() => day.checked && showPicker(index, 'endTime')}
            disabled={!day.checked}>

            <Text style={styles.timeText}>{day.endTime || 'End'}</Text>
          </TouchableOpacity>
        </View>
      ))}
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          // display="default"
           display="spinner"
          onChange={handleTimeChange}
        />
      )}

       <ConfirmeButton HandleConfimation={() => setModalVisible(true)} ConfirmeText={"Enregistrer les Horaires"} style={{marginTop:15}}></ConfirmeButton>
   



       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <ConfirmationModal 
      navigation={navigation}
      title="Modifiction enregistrée"
      description="Votre mot de passe a été enregistrée avec succés!"
      buttonText="OK"
      IconName="Calender"
      to="Profile"
      ></ConfirmationModal>
      </Modal>
   
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
  container: {
      flex: 1,
      padding: 20,
    },
  label: {
      fontSize: 16,
      marginBottom:20,
      fontWeight:"bold"
    },
  dayRow: {
    height:height*0.07,
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems: 'center',
    // marginBottom: 10,
    // flex:1
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius:6,
    justifyContent: "center",
    alignItems: "center",
    alignContent:"center",
    marginRight: 8,
  },
  checkIcon: {
    color: "#fff",
    fontSize: 14  ,
  },
  dayText: {
    paddingLeft:5,
    fontSize: 16,
  },
  dayCheckBox:{
    width:width*0.3,
    height:height/27,
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"center",
    alignItems:"center",
    borderWidth: 1,
    borderColor: colors.background,
    borderRadius: 5,
    marginHorizontal:10,
    backgroundColor:colors.background2,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: colors.background,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 80,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
  disabledButton: {
    backgroundColor:colors.background2,
  },
});

export default WorkTimeScreen;