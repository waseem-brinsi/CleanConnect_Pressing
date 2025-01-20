import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView,StyleSheet,Dimensions,FlatList,Image,Linking,Alert,Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import HeaderComponent from '../../components/HeaderComponent';

import ConfirmeButton from '../../components/ConfirmeButton';



const { width,height } = Dimensions.get('window');
const groupedData = [
  {
    title: 'Lavage / Repassage',
    data: [
      { id: '1', url: require('../../../assets/images/history/maryoul.jpg')},
      { id: '2', url: require('../../../assets/images/history/maryoul2.jpg') },
      { id: '3', url: require('../../../assets/images/history/maryoul.jpg') },
      { id: '4', url: require('../../../assets/images/history/maryoul2.jpg') },
    ],
  },
  {
    title: 'Lavage à sec',
    data: [
      { id: '1', url: require('../../../assets/images/history/maryoul.jpg') },
      { id: '2', url: require('../../../assets/images/history/maryoul2.jpg') },
    ],
  },
  {
    title: 'Repassage',
    data: [
      { id: '1', url: require('../../../assets/images/history/maryoul.jpg') },
      { id: '2', url: require('../../../assets/images/history/maryoul2.jpg') },
      { id: '3', url: require('../../../assets/images/history/maryoul.jpg') },
    ],
  },
];

const HistoryDetailScreen = ({navigation,route}) => {
  const {item} = route.params;
  const actionSheetRef = useRef();
  const navigationGoBack = useNavigation();

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const renderIcon = (state) => {
    switch (state) {
      case 'En Attente':
        return (
          <View style={[styles.encours,{backgroundColor:'#FFB8B8'}]}>
              {React.createElement(icons['EncoursRed'], { width:14 , height: 22,marginRight:5 })}
              <Text style={[styles.StateText , styles.StateText,{color:'#B80101'}]}>En Attente</Text>
          </View>
      );
      case 'En cours':
        return (
          <View style={styles.encours}>
              {React.createElement(icons['Encours'], { width:14 , height: 22,marginRight:5 })}
              <Text style={[styles.StateText , styles.StateText]}>En cours</Text>
          </View>
      );
      case 'Terminée':
        return (
          <View style={[styles.encours,{backgroundColor:'#14DA32'}]}>
              {React.createElement(icons['Terminee'], { width:14 , height: 22,marginRight:5 })}
              <Text style={[styles.StateText , styles.StateText]}>Terminée</Text>
          </View>
      );
      case 'Annulée':
        return (
          <View style={[styles.encours,{backgroundColor:'#CCCCCC'}]}>
              {React.createElement(icons['Annulee'], { width:14 , height: 22,marginRight:5 })}
              <Text style={[styles.StateText , styles.StateText]}>Annulée</Text>
          </View>
      );    
      default:
        return React.createElement(icons['Encours'], { width:14 , height: 22,marginRight:5 });
    }
  };

  const renderGroup = ({ item }) => (
      <View style={styles.groupContainer}>
        <Text style={styles.priceText}>{item.title} (4)</Text>
        <Text style={{ marginBottom:20 ,color:"#8C8C8C"}}>(2x) T-shirt / (2x) Pantalon</Text>
        
        <FlatList
          data={item.data}
          horizontal
          keyExtractor={(imageItem) => imageItem.id}
          renderItem={({ item }) => (
            <Image source={item.url } style={styles.image} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      );
  const callNumber = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
    
        if (Platform.OS === 'android') {
          Linking.openURL(url).catch((err) => {
            console.error('Error making a phone call:', err);
            Alert.alert('Error', 'Unable to make a call. Please check your device settings.');
          });
        } else if (Platform.OS === 'ios') {
          Linking.canOpenURL(url)
            .then((supported) => {
              if (supported) {
                return Linking.openURL(url);
              } else {
                Alert.alert('Error', 'Phone call is not supported on this device.');
              }
            })
            .catch((err) => {
              console.error('Error checking phone call support:', err);
            });
        } else {
          Alert.alert('Error', 'Phone call is not supported on this platform.');
        }
      };
  return (
    <SafeAreaView style={styles.safeArea}>
                  <HeaderComponent title={'Historiques'}></HeaderComponent>
       <ScrollView>

            <View style={styles.container}>



            <Text style={styles.title}>Statut Actuel</Text>
            {renderIcon(item.state)}
            <Text style={styles.title}>Détails</Text>

              {item.state === "En cours" &&(
                <View>
                  <View style={styles.card}>
                  <View style={styles.actionButtonProduct}>
                  <View  >  
                  
                  <Text style={[styles.title]}>Paiement</Text>
                  <View style={styles.row}>
                        {React.createElement(icons['Pig'],{width:15,height:15})}
                        <Text style={styles.cardText}> Total payé :</Text>
                        <Text style={[styles.cardText,{color:'#000'}]}>36 TND</Text>
                  </View>
                        <View  style={styles.tt} >
                              <Text style={[styles.cardText,{color:'#000'}]}>Informations de la commande</Text>
                                  <TouchableOpacity  onPress={showActionSheet}>
                                      <Text style={[styles.priceText,{color:colors.primary,textDecorationLine:'underline'}]}>Voir panier</Text>
                                  </TouchableOpacity>
                        </View>


                            <View style={styles.row}>
                                      {React.createElement(icons['User'],{width:15,height:15})}
                                      <Text style={styles.cardText}> Nom du client</Text>
                                      <Text style={[styles.cardText,{color:'#000'}]}> : {item.firstName} {item.lastName} </Text>
                            </View>


                            <View style={styles.row}>
                                    {React.createElement(icons['articale'],{width:15,height:15})}
                                    <Text style={styles.cardText}> Nombre d’articles : </Text>
                                    <Text style={[styles.cardText,{color:'#000'}]}>{item.nbrArticale} pièces</Text>
                            </View>

                            <View style={[styles.row,{justifyContent:'space-between',marginVertical:10}]}>
                                    <View style={styles.row}>
                                          <View style={styles.cercle}>
                                            {React.createElement(icons['Lavagerepassage'],{width:25,height:25})}
                                            </View>
                                          <Text style={styles.cardText2}> Lavage/repassage</Text>
                                    </View>

                                    <View style={styles.row}>
                                      <View style={styles.cercle}>
                                      {React.createElement(icons['lavageSec'],{width:25,height:25})}
                                      </View>
                                          <Text style={styles.cardText2}> Lavage à sec </Text>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.cercle}>
                                          {React.createElement(icons['lavageSec'],{width:25,height:25})}
                                          </View>
                                          <Text style={styles.cardText2}> repassage</Text>
                                    </View>
                            </View>

                            <View  style={styles.tt} >
                              <Text style={[styles.cardText,{color:'#000',fontSize: 14,marginRight:30}]}>Informations sur le Client</Text>
                              
                            <ConfirmeButton ConfirmeText={`📞 ${item.firstName} `} HandleConfimation={() => callNumber('123456789')} style={{flex:1}} style2={{backgroundColor:'#14DA32'}}></ConfirmeButton>

                            </View>


                            <View style={styles.row}>
                                      {React.createElement(icons['User'],{width:15,height:15})}
                                      <Text style={styles.cardText}> Nom du client</Text>
                                      <Text style={[styles.cardText,{color:'#000'}]}> : {item.firstName} {item.lastName} </Text>
                            </View>

                                    
                            <View style={styles.row}>
                                      {React.createElement(icons['Map2'],{width:15,height:15})}
                                      <Text style={styles.cardText}>Adresse du client : </Text>
                                      <Text style={[styles.cardText,{color:'#000'}]}>{item.dateL}</Text>
                            </View>

                            <View  style={styles.tt} >
                                <Text style={[styles.cardText,{color:'#000'}]}>Informations de Livraison </Text>
                            </View>


                            <View style={styles.row}>
                                      {React.createElement(icons['Calender'],{width:15,height:15})}
                                      <Text style={styles.cardText}> Livrée le : </Text>
                                      <Text style={[styles.cardText,{color:'#000'}]}>{item.dateL}</Text>
                            </View>

                            <View  style={styles.tt} >
                                <Text style={[styles.cardText,{color:'#000'}]}>Évaluation : --</Text>
                            </View>

                      </View>

                  </View>
                  </View>
                  <ConfirmeButton ConfirmeText={'Lavage terminer'}></ConfirmeButton>
                </View>
              )}
              {item.state === "Terminée" &&(
                <View>
                    <View style={styles.card}>
                    <View style={styles.actionButtonProduct}>
                    <View  >  
                    <Text style={[styles.title]}>Paiement</Text>
                          <View style={styles.row}>
                                {React.createElement(icons['Pig'],{width:15,height:15})}
                                <Text style={styles.cardText}> Total payé :</Text>
                                <Text style={[styles.cardText,{color:'#000'}]}>36 TND</Text>
                          </View>
                          <View  style={styles.tt} >
                                <Text style={[styles.title]}>Informations de la commande</Text>
                                    <TouchableOpacity  onPress={showActionSheet}>
                                        <Text style={[styles.priceText,{color:colors.primary,textDecorationLine:'underline'}]}>Voir panier</Text>
                                    </TouchableOpacity>
                          </View>


                              <View style={styles.row}>
                                        {React.createElement(icons['Calender'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Numéro de Commande : </Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                              </View>


                              <View style={styles.row}>
                                      {React.createElement(icons['articale'],{width:15,height:15})}
                                      <Text style={styles.cardText}> Nombre d’articles : </Text>
                                      <Text style={[styles.cardText,{color:'#000'}]}>{item.nbrArticale} pièces</Text>
                              </View>

                              <View style={[styles.row,{justifyContent:'space-between',marginVertical:10}]}>
                                      <View style={styles.row}>
                                            <View style={styles.cercle}>
                                              {React.createElement(icons['Lavagerepassage'],{width:25,height:25})}
                                              </View>
                                            <Text style={styles.cardText2}> Lavage/repassage</Text>
                                      </View>

                                      <View style={styles.row}>
                                        <View style={styles.cercle}>
                                        {React.createElement(icons['lavageSec'],{width:25,height:25})}
                                        </View>
                                            <Text style={styles.cardText2}> Lavage à sec </Text>
                                      </View>

                                      <View style={styles.row}>
                                          <View style={styles.cercle}>
                                            {React.createElement(icons['lavageSec'],{width:25,height:25})}
                                            </View>
                                            <Text style={styles.cardText2}> repassage</Text>
                                      </View>
                              </View>

                              <View  style={styles.tt} >
                                <Text style={[styles.title]}>Informations de la commande</Text>
                              </View>


                              <View style={styles.row}>
                                        {React.createElement(icons['User'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Nom du client</Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}> : {item.firstName} {item.lastName} </Text>
                              </View>

                                      
                              <View style={styles.row}>
                                        {React.createElement(icons['Map2'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Adresse du client : </Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}>{item.adresseL}</Text>
                              </View>

                              <View  style={styles.tt} >
                                  <Text style={[styles.cardText,{color:'#000'}]}>Informations de Livraison </Text>
                              </View>


                              <View style={styles.row}>
                                        {React.createElement(icons['Calender'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Date et heure de livraison : </Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}>{item.dateL}</Text>
                              </View>

                              <View  style={styles.tt} >
                                  <Text style={[styles.title]}>Évaluation</Text>
                              </View>

                        </View>

                    </View>
                    </View>
                <ConfirmeButton ConfirmeText={'Moyenne ★4.0'}></ConfirmeButton>
                </View>
              )}
              {item.state === "Annulée" &&(
                <View>
                    <View style={styles.card}>
                    <View style={styles.actionButtonProduct}>
                    <View  >  
                    <Text style={[styles.title]}>Paiement :--</Text>
                          <View  style={styles.tt} >
                                <Text style={[styles.title]}>Informations de la commande</Text>
                          </View>


                              <View style={styles.row}>
                                        {React.createElement(icons['Calender'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Numéro de Commande : </Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                              </View>


                              <View style={styles.row}>
                                      {React.createElement(icons['articale'],{width:15,height:15})}
                                      <Text style={styles.cardText}> Nombre d’articles : </Text>
                                      <Text style={[styles.cardText,{color:'#000'}]}>{item.nbrArticale} pièces</Text>
                              </View>


                              <View  style={styles.tt} >
                                <Text style={[styles.title]}>Informations sur le Client</Text>
                              </View>


                              <View style={styles.row}>
                                        {React.createElement(icons['User'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Nom du client</Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}> : {item.firstName} {item.lastName} </Text>
                              </View>

                                      
                              <View style={styles.row}>
                                        {React.createElement(icons['Map2'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Adresse du client : </Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}>{item.adresseL}</Text>
                              </View>

                              <View  style={styles.tt} >
                                  <Text style={[styles.cardText,{color:'#000'}]}>Informations de Livraison </Text>
                              </View>


                              <View style={styles.row}>
                                        {React.createElement(icons['Calender'],{width:15,height:15})}
                                        <Text style={styles.cardText}> Date et heure de livraison : </Text>
                                        <Text style={[styles.cardText,{color:'#000'}]}>{item.dateL}</Text>
                              </View>

                              <View  style={styles.tt} >
                                  <Text style={[styles.title]}>Évaluation :--</Text>
                              </View>

                        </View>

                    </View>
                    </View>

                </View>
                
              )}
          

            <ActionSheet ref={actionSheetRef}>
            <View style={styles.sheetContent}>    
                            <Text style={[styles.sheetcardText,{color:'#000'}]}>Mon Panier (10 Piéces)</Text>
                            <FlatList
                              data={groupedData}
                              keyExtractor={(group) => group.title}
                              renderItem={renderGroup}
                            />     
            </View>
          </ActionSheet>
          </View>

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
   padding:10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  
    StateText:{
      fontWeight:"bold",
      color:colors.white,
    },
  tt:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'space-between',
      alignItems:'center',
      marginVertical:20
    },
  
  card: {
    // width: width/2.3, 
    // height: width/2.1,
    borderRadius: 8,
    // flex:1,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal:5,
    backgroundColor: colors.background2, 
    borderWidth:2,
    borderColor:'#E6E5FD',
    position: 'relative',
  },
  
  cardText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8C8C8C', 
  },
  cardText2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary, 
  },
  row:{
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    marginVertical:5
  },
  cercle:{
    width:width*0.1,
    height:width*0.1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:colors.background,
  },
  priceText: {
    fontSize: 14,
    marginBottom:5,
    fontWeight: 'bold',
    color: colors.primary
  },
  price_plus:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignContent:'center',
  },
  productPrice: {
    fontSize: 14,
    marginRight:50,
    fontWeight: 'bold',
    color:'#5549EF'
  },
  
  
  encours: {
    flexDirection:'row',
    // width :width/4,
    height: 40,
    paddingHorizontal:10,
    fontSize:12,
    fontWeight:"regular",
    borderRadius: 22,
    marginRight: 10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFBA1A',
  },
  horizontalLine: {
    height: 1, 
    backgroundColor: '#5549EF', 
    width: '100%', 
    marginVertical: 10,
  },
  line:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  dropdownContainer: {
    marginLeft:5,
    marginVertical:5,
  },
  filterContainer: {
    flexDirection:'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  dropdownButton: {
    width:width/3,
    height:height/25,
    paddingVertical: 5,
    // paddingHorizontal: 20,
    backgroundColor: colors.white ,
    borderWidth:1,
    borderColor:colors.primary,
    borderRadius: 5,
  },
  dropdownButtonText: {
    color:colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  dropdownOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#007bff',
  },
  actionButtonProduct: {
    padding: 10,
  },
  StateText:{
    fontWeight:"bold",
    color:colors.white,
  },
  sheetContent: {
    // width: width/2.3, 
    padding:10,
    // height: width/2.1,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal:5,
    position: 'relative',
  },

 

});

export default HistoryDetailScreen;