import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import CustomModal from '../../../components/CustomModal'


const { width } = Dimensions.get('window');

const RadioButton = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={() => onPress(value)}>
      <View style={[styles.radioCircle, selected && styles.selectedRadio]}>
        {selected && <View style={styles.selectedCircle} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};


const StoreCommand = ({navigation}) => {
 

  const navigationGoBack = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);


  const handlePress = (value) => {
    setSelectedValue(value);
  };

  const handleConfirm = () => {
    console.log('OK Pressed');
    setModalVisible(false);
  };

  return (

    <SafeAreaView style={styles.safeArea}>
    <ScrollView>
          <View style={styles.container}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                  {React.createElement(icons['Backarrow'], { width: 15, height: 15 })}
              </TouchableOpacity>

              <View style={styles.header}>          
                <Text  style={[styles.sectionTitle,styles.topTitle]}>Confirmer ma commande</Text>
              </View>

        <View style={styles.formContainner}>
        <Text style={styles.title}>CM0021</Text>
        <Text style={styles.label}>20/06/2024</Text>
        <View style={styles.textContainer}>
                <Text style={styles.label}>Nom et Prénom :</Text>
                <Text style={styles.label}>Eya Hatira</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.label}>E-mail :</Text>
                <Text style={styles.label}>eyahatira@gmail.com</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.label}>Télèphone :</Text>
                <Text style={styles.label}>56565656</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.label}>Adresse de livraison :</Text>
                <Text style={styles.label}>3 rue de Tunis, Tunisie</Text>
            </View>

        <View style={styles.horizontalLine} />
          <Text style={styles.title}>Mon panier</Text>
          <View >

            <View style={styles.textContainer}>
                <Text style={styles.label}>Lessive liquide pour machine automatique 3L</Text>
                <Text style={styles.label}>14,875 TND</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.label}>Lessive liquide </Text>
                <Text style={styles.label}>14,875 TND</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.textContainer}>
                <Text style={styles.label}>Frais de Livraison</Text>
                <Text style={styles.label}>7 TND</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.label}>Total à payer</Text>
                <Text style={styles.label}>30 TND</Text>
            </View>


          </View>
        </View>





        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.confirmButton}  >
              <Text style={styles.actionButtonText}>Confirmer ma commande</Text>
            </TouchableOpacity>
          </View>
        

        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
            style={[styles.actionButton,
            { backgroundColor: colors.background2,borderColor:colors.primary,borderWidth:1}]} 
            onPress={() => setModalVisible(true)}>
              <Text style={[styles.actionButtonText,{color:colors.primary}]}>Annuler</Text>
            </TouchableOpacity>
          </View>

          
      </View>


    </ScrollView>


      <CustomModal
        navigation={navigation}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setModalVisible={setModalVisible}
        title="Annuler la commande ?"
        description="Êtes-vous sûr de vouloir annuler cette commande ?"
        button2="Annuler"
        button1="Oui"
      />
      

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
    color:"#5549EF",
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
    backgroundColor:'#F7F6FF',
    borderRadius:14,
    marginBottom:10,
  },

  title:{
    fontSize:14,
    fontWeight:'bold',
    color:"#5549EF",
    marginBottom:10,
  },

  label: {
    fontSize: 12,
    fontWeight: 'medium',
    marginTop: 10,
    marginBottom:5,
  },
  
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#5549EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    borderColor: '#5549EF',
  },
  selectedCircle: {
    height: 13,
    width: 13,
    borderRadius: 6,
    backgroundColor: '#5549EF',
  },
  radioText: {
    fontSize: 12,
    fontWeight:'medium'
  },

  textContainer:{
    flexDirection:"row",
    alignContent:'center',
    alignItems:'center',
    justifyContent:'space-between',
    
  },
  horizontalLine: {
    height: 1, 
    backgroundColor: '#5549EF', 
    width: '100%', 
    marginVertical: 10,
  },

  codePromo:{
    fontSize:13,
    fontWeight:'bold',
  },
  input: {
    height: 40,
    width:width/5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:8,
    marginRight:10,
    paddingHorizontal: 10,
    backgroundColor:'#fff'
  },

  

  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    backgroundColor: '#fff',
  },

  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5549EF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
  },

  actionButton: {
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
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },



});

export default StoreCommand;