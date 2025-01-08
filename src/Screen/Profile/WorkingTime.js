import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const WorkTimeScreen = () => {
  const [workTimes, setWorkTimes] = useState(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => ({
      day,
      startTime: null,
      endTime: null,
    }))
  );

  const [pickerData, setPickerData] = useState({
    visible: false,
    type: 'start',
    dayIndex: null,
  });

  const showPicker = (dayIndex, type) => {
    setPickerData({ visible: true, type, dayIndex });
  };

  const onTimeChange = (event, selectedTime) => {
    if (pickerData.dayIndex !== null) {
      const newWorkTimes = [...workTimes];
      if (pickerData.type === 'start') {
        newWorkTimes[pickerData.dayIndex].startTime = selectedTime || newWorkTimes[pickerData.dayIndex].startTime;
      } else {
        newWorkTimes[pickerData.dayIndex].endTime = selectedTime || newWorkTimes[pickerData.dayIndex].endTime;
      }
      setWorkTimes(newWorkTimes);
    }
    setPickerData({ ...pickerData, visible: false });
  };

  const formatTime = time => {
    if (!time) return 'Select Time';
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.day}>{item.day}</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => showPicker(index, 'start')}
      >
        <Text style={styles.timeText}>{formatTime(item.startTime)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => showPicker(index, 'end')}
      >
        <Text style={styles.timeText}>{formatTime(item.endTime)}</Text>
      </TouchableOpacity>
    </View>
  );


  console.log(workTimes)

  return (
    <View style={styles.container}>
      <FlatList
        data={workTimes}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.day}-${index}`}
      />
      {pickerData.visible && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  timeButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
});

export default WorkTimeScreen;
