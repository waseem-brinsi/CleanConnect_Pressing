import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,Alert,Modal,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';


const InformationScreen = ({navigation,route}) => {
  const {region} = route.params;

  const navigationGoBack = useNavigation();

  const [address, setAddress] = useState(null);
  const [addressR, setAddressR] = useState(false);
  const [addressL, setAddressL] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressR: '',
    addressL: '',
    dateR: new Date(),
    timeR: '',
    dateL: new Date(),
    timeL: '',
  });
 

  const [modalVisible, setModalVisible] = useState(false);

  const [showDatePicker_R, setShowDatePicker_R] = useState(false);
  const [showTimePicker_R, setShowTimePicker_R] = useState(false);

  const [showDatePicker_L, setShowDatePicker_L] = useState(false);
  const [showTimePicker_L, setShowTimePicker_L] = useState(false);
  
  useEffect(() => {
    const fetchAddress = async () => {
      if (region) {
        try {
          const url = `https://photon.komoot.io/reverse?lon=${region.longitude}&lat=${region.latitude}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          const data = await response.json();
     
          console.log("data")
          console.log(data)
          const results = data.features.map((feature) => {
            const { street, name, housenumber, postcode, city, state, country } = feature.properties;
            const display_name = [
              housenumber,
              street || name,
              city,
              state,
              postcode,
              country,
            ]
              .filter(Boolean)
              .join(', '); // Joins the parts with a comma if they exist
      
            return {
              place_id: feature.properties.osm_id,
              display_name: display_name || 'Unnamed Location',
            };
          });


          console.log(results[0].display_name)

          if (results[0] && results[0].display_name && addressL==true && addressR == false ) {
            setFormData(pre => ({...pre,addressL:results[0].display_name}))
            setAddressL(false)
          }else if(results && results[0].display_name && addressL==false && addressR == true){
            setFormData(pre => ({...pre,addressR:results[0].display_name}))
            setAddressR(false)

          } 
          else {
            setAddress('Address not found');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setAddress('Unable to fetch address');
        }
      }
    };
  
    fetchAddress(); 
  
  }, [region]); 




  // Define blocked times
  const blockedTimes = ['14:00', '15:00'];

  // Available times (in 24-hour format)
  const times = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Handle time selection
  const handleTimePress = (time) => {
    if (blockedTimes.includes(time)) {
      Alert.alert('Time Blocked', 'This time slot is unavailable. Please choose another time.');
    } else {
      if(showTimePicker_R && !showTimePicker_L ){
        setFormData(pre => ({...pre,timeR:time}))
        setShowTimePicker_R(false)
      }else{
        setFormData(pre => ({...pre,timeL:time}))
        setShowTimePicker_L(false)

      }
      
      setModalVisible(false);
    }
  };




  const handleDateRChange = (event, selectedDate) => {
    setShowDatePicker_R(false);
    if (selectedDate) {

      setFormData(pre => ({...pre,dateR:selectedDate}))
    }
  };

  const handleDateChange = (event, selectedDate) => {

        if (selectedDate && showDatePicker_L && !showDatePicker_R) {
          setShowDatePicker_L(false);
          const day = selectedDate.getDay(); // 0 is Sunday, 6 is Saturday
          if (day === 0 || day === 6) {
            // Block Saturday and Sunday
            Alert.alert("Blocked", "You cannot select Saturday or Sunday.");
            
          }
          else {
            
            setFormData(pre => ({...pre,dateL:selectedDate}))
          }

        }
        else if(selectedDate && !showDatePicker_L && showDatePicker_R){
          setShowDatePicker_R(false);
          const day = selectedDate.getDay(); // 0 is Sunday, 6 is Saturday
          if (day === 0 || day === 6) {
            // Block Saturday and Sunday
            Alert.alert("Blocked", "You cannot select Saturday or Sunday.");
          }
          else {
          setFormData(pre => ({...pre,dateR:selectedDate}))
          }
        }
  };


  const HandleConfimation = ()=>{
    navigation.navigate('InfoPaymentScreen',{
      // dataConfirmation : data,
      // numberArticale:numberArticale,
      // totalPrice:totalPrice

    })
  }

  console.log(formData)
  console.log('-------------')
  console.log(JSON.stringify(region))
  // console.log(region)
  // console.log(address)
  // console.log(addressL)

  console.log(showDatePicker_L)
  console.log(showDatePicker_R)


  // console.log(latitude)
  // console.log(longitude)


  const LocalizationRecuperation =()=>{
    setAddressR(true);
    navigation.navigate('LocalizationScreen',{
      // dataConfirmation : data,
      // numberArticale:numberArticale,
      // totalPrice:totalPrice
    })
  }


  const LocalizationLaivrison =()=>{
    setAddressL(true);
    navigation.navigate('LocalizationScreen',{
    })
  }




  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
      <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
              {React.createElement(icons['Backarrow'], { width: 20, height: 20 })}
          </TouchableOpacity>

          <View style={styles.header}>          
            <Text  style={[styles.sectionTitle,styles.topTitle]}>Information et paiements</Text>
          </View>

    <View style={styles.formContainner}>


      <Text style={styles.title}>Informations Personnel</Text>

      <Text style={styles.label}>Nom et Prénom</Text>

      <View style={styles.inputContainner}>

      <TextInput
        style={styles.input_Icon}
        // placeholder="Enter your name"
        value={formData.name}
        onChangeText={(value)=>setFormData(pre =>({...pre,name:value}))}
      />
      {React.createElement(icons['Pen'], { width: 40, height: 40 })}


      </View>

      
      <Text style={styles.label}>E-mail</Text>

      <View style={styles.inputContainner}>
          <TextInput
            style={styles.input_Icon}
            // placeholder="Enter your email"
            value={formData.email}
            keyboardType="email-address"
            onChangeText={(value)=>setFormData(pre =>({...pre,email:value}))}
          />
          {React.createElement(icons['Pen'], { width: 40, height: 40 })}
      </View>

      <Text style={styles.label}>Télèphone</Text>
      <View style={styles.inputContainner}>
      <TextInput
        style={styles.input_Icon}
        // placeholder="Enter your phone number"
        value={formData.phone}
        keyboardType="phone-pad"
        onChangeText={(value)=>setFormData(pre =>({...pre,phone:value}))}
      />
      {React.createElement(icons['Pen'], { width: 40, height: 40 })}
      </View>
    </View>



    <View style={styles.formContainner}>
    <Text style={styles.title}>Informations sur la livraison</Text>

    <View style={styles.addressContainner}>

        <Text style={styles.label}>Adresse de Récupération</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputWithIcon}
            value={formData.addressR}
            // value={region} 
            onChangeText={(value) => setFormData(pre => ({ ...pre, addressR: value }))}
          />
          
          <View style={styles.iconStyle}>
          <TouchableOpacity style={styles.numberItem} onPress={()=>{LocalizationRecuperation()}}>

          {React.createElement(icons['Map'], { width: 24, height: 24 })}
          </TouchableOpacity>
        </View>
      
        </View>


        <View style={styles.Date_Time_Containner}>
          <View>
          <Text style={styles.label}>Date ( optionnel ) </Text>
        <TouchableOpacity style={styles.actionButton}  onPress={() => setShowDatePicker_R(true)} >
              <Text>{formData.dateR.toDateString()}</Text>
              {showDatePicker_R && (
                      <DateTimePicker
                        value={formData.dateR}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        minimumDate={new Date()} 
                      />
                    )}
        </TouchableOpacity>
          </View>


        <View>
        <Text style={styles.label}>Heure ( optionnel ) </Text>

            <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {setModalVisible(true);setShowTimePicker_R(true)}}
                  >
                    <Text style={styles.buttonText}>
                      {formData.timeR ? `${formData.timeR}` : 'Select a time'}
                    </Text>
            </TouchableOpacity>

        </View>

        </View>


    </View>


    <View style={styles.addressContainner}>

<Text style={styles.label}>Adresse de livraison</Text>

<View style={styles.inputWrapper}>
  <TextInput
    style={styles.inputWithIcon}
    value={formData.addressL}
    // value={address}
    onChangeText={(value) => setFormData(pre => ({ ...pre, addressL: value }))}
  />

  <View style={styles.iconStyle}>
  <TouchableOpacity style={styles.numberItem} onPress={()=>{LocalizationLaivrison()}}>
  {React.createElement(icons['Map'], { width: 24, height: 24 })}
        </TouchableOpacity>

</View>

</View>


<View style={styles.Date_Time_Containner}>
  <View>
  <Text style={styles.label}>Date ( optionnel ) </Text>
<TouchableOpacity style={styles.actionButton}  onPress={() => setShowDatePicker_L(true)} >
      <Text>{formData.dateL.toDateString()}</Text>
      {showDatePicker_L && (
              <DateTimePicker
                value={formData.dateL}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()} 
              />
            )}
</TouchableOpacity>
  </View>
<View>


<Text style={styles.label}>Heure ( optionnel ) </Text>
<TouchableOpacity
        style={styles.actionButton}
        onPress={() => {setModalVisible(true);setShowTimePicker_L(true)}}
      >
        <Text style={styles.buttonText}>
          {formData.timeL ? `${formData.timeL}` : 'Select a time'}
        </Text>
</TouchableOpacity>

</View>

</View>


    </View>




    </View>
    <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={HandleConfimation} >
           <Text style={styles.actionButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>


    

  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Choose a Time</Text>

      {/* List of times */}
      <FlatList
        data={times}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.timeItem}
            onPress={() => handleTimePress(item)}
            disabled={blockedTimes.includes(item)}  // Disable blocked times
          >
            <Text
              style={[
                styles.timeText,
                blockedTimes.includes(item) && styles.blockedTime  // Apply gray color for blocked times
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Close button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      </ScrollView>

    </SafeAreaView>
  );
};



const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#fff",  
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  backButton: {
    padding: 10,
    position: 'absolute',
    borderRadius:30,
    backgroundColor:'#fff',
    top: 20, 
    left: 13,
    zIndex: 1,
  },

  header:{
    backgroundColor:"#fff",
    // marginTop:30,
    paddingVertical:20,
  },


  sectionTitle: {
    fontSize: 16,
    fontWeight :'semibold',
    color:colors.primary,
    marginBottom: 10,
  },

  topTitle:{
    margin :"auto",
    marginTop:5,
    fontSize:16,
    fontWeight:"bold",
  },

  formContainner:{
    marginHorizontal:20,
    padding:20,
    backgroundColor:colors.background2,
    borderRadius:14,
    marginBottom:10,
  },

  title:{
    margin:'auto',
    fontSize:14,
    fontWeight:'medium',
    color:colors.primary,
  },

  label: {
    fontSize: 12,
    fontWeight: 'medium',
    marginTop: 10,
    marginBottom:5,
  },
  inputContainner:{
    flexDirection:'row',
  },
  input_Icon: {
    flex:1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:8,
    marginRight:10,
    paddingHorizontal: 10,
    backgroundColor:'#fff'
  },

  actionButton:{
    height:40,
    padding:5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:8,
  },
  Date_Time_Containner:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputWithIcon: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 40, // Add padding to leave space for the icon
    backgroundColor: '#fff',
  },
  iconStyle: {
    position: 'absolute',
    right: 10, // Adjust this value to position the icon inside the input
    top: '50%',
    transform: [{ translateY: -12 }], // To center the icon vertically
  },
  addressContainner:{

  },
  
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,

    backgroundColor: '#fff',
  },

  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
  },

  actionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'white',
    fontWeight: 'regular',
  },
  


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
  },
  blockedTime: {
    color: 'gray',  // Grayed-out color for blocked times
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

export default InformationScreen;