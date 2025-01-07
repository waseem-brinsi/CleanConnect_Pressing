import React, { useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import ConfirmeButton from '../../components/ConfirmeButton';
import CancelButton from '../../components/CancelButton';


const { width } = Dimensions.get('window');
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




const EncoursAttendScreen = ({navigation,route}) => {

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
              <Text style={[styles.StateText ,,{color:'#B80101'}]}>En Attente</Text>
          </View>
      );
      case 'En cours':
        return (
          <View style={[styles.encours,{backgroundColor:'#FFBA1A'}]}>
              {React.createElement(icons['Encours'], { width:14 , height: 22,marginRight:5 })}
              <Text style={[styles.StateText]}>En cours</Text>
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
      </View>);

  console.log(item)

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
              <View style={styles.header}>  
                  <View style={styles.top}>
                      <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                          {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
                      </TouchableOpacity>
                      <Text  style={[styles.sectionTitle,styles.topTitle]}>Détails Commande</Text> 
                  </View> 
              </View>
              <View style={styles.section}>
              <View style={styles.card}>
                        {item.state ==='En cours' &&(
                            <View>
                                <View style={styles.containerLogo}>
                                        <Image
                                            source={require('../../../assets/images/CompanyLogo.png')}
                                            style={styles.logo}
                                        />
                                        <View>
                                        <Text style={styles.cardText}>Commande Confirmée par</Text>
                                        <Text style={styles.companyName}>LAUNDRY</Text>
                                        <Text style={styles.rating}>★ 4.5</Text>
                                        </View>
                                </View>
                                <View style={styles.horizontalLine} />
                            </View>
                        )}

                        {item.state ==='En cours' ?(
                                <View >
                                <Text style={[styles.cardText,{fontSize:14,color:'#000'}]}>Bonjour EYA HATIRA</Text>
                                <Text style={[{fontSize:12}]}>
                                Votre commande sera effectuée dans les plus brefs délais. 
                                Nous assurons une qualité excellente de notre service. Au revoir.
                                </Text>
                            </View>
                        ):(
                        <View >
                            <Text style={[styles.cardText,{fontSize:14,color:'#000'}]}>{item.code}, EYA HATIRA</Text>
                            <Text style={[{fontSize:12,color:colors.primary,textDecorationLine:'underline',paddingBottom:10}]}>
                            Paiement à la livraison
                            </Text>
                        </View>

                        )}



                    <View style={styles.horizontalLine} />
                    <View style={styles.line}>
                        <View>
                        <Text style={[styles.cardText,{color:"#8C8C8C"}]}>Nombre d'articles</Text>
                        <Text style={[styles.priceText,{color:"#000"}]}>{item.price} Piéces</Text>
                        </View>

                        <TouchableOpacity  onPress={showActionSheet}>
                            <Text style={[styles.priceText,{color:colors.primary,textDecorationLine:'underline'}]}>Voir panier</Text>
                        </TouchableOpacity>

                    </View>
                          <View style={styles.horizontalLine} />
                          <Text style={styles.cardText}>Adresse et date de récupération</Text>
                          <Text style={[styles.cardText,{color:'#000',marginBottom:20}]}>03 rue de Tunis   Le 12/02/2024</Text>

                          <Text style={styles.cardText}>Adresse et date  de livraison</Text>
                          <Text style={[styles.cardText,{color:'#000'}]}>03 rue de Tunis   Le 12/02/2024</Text>


                          <View style={styles.horizontalLine} />
                          
                          <View style={styles.line}>
                          <Text style={[styles.cardText,{color:'#000',fontSize:16}]}>Statut</Text>
                          
                            <View style={[styles.encours]}>
                            {renderIcon(item.state)}
                            </View>
                            
                          </View>

                         


                          <View style={styles.horizontalLine} />
                          
                          <View style={styles.line}>
                          <Text style={[styles.cardText,{color:'#000',fontSize:16}]}>Totale</Text>
                          
                            <View style={[styles.encours,{backgroundColor:colors.primary}]}>
                              <Text style={[styles.categoryText , styles.categoryTextselected]}>{item.price} DT</Text>
                            </View>
                          </View>
              </View>
                </View>
                {item.state ==='En cours' &&(
                    <View style={{ paddingHorizontal:16}}>
                    <ConfirmeButton ConfirmeText={'Suivre ma commande'} HandleConfimation={()=>  { navigation.navigate('TrackingMap')} }></ConfirmeButton>
                    <CancelButton CancelText={"Annuler la commande"}></CancelButton>
                    </View>
                )}
                {item.state ==='En Attente' &&(
                    <View style={{ paddingHorizontal:16}}>
                    <CancelButton CancelText={"Annuler la commande"}></CancelButton>
                    <ConfirmeButton ConfirmeText={'Retour à l’acceuil'}></ConfirmeButton>
                    
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
    backgroundColor: "#F3F4F6",
   
  },
  
  header:{
   
    paddingVertical:20,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
  },
  top:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:10

  },


  topTitle:{
    margin :"auto",
    color:colors.primary,
    marginTop:5,
    fontSize:16,
    fontWeight:"bold",
  },


  section:{
    paddingHorizontal:20,
  },



  
  tt:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'space-between',
    alignItems:'center'
  },

card: {
  // width: width/2.3, 
  padding:10,
  // height: width/2.1,
  borderRadius: 8,
  overflow: 'hidden',
  marginVertical: 10,
  marginHorizontal:5,
  backgroundColor: colors.background2, 
  borderWidth:2,
  borderColor:'#E6E5FD',
  position: 'relative',
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

containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
    paddingHorizontal:10,
    resizeMode: 'contain',
    marginRight: 16,
  },
  companyName: {
    // flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    fontSize: 16,
    color: colors.primary,
  },



cardText: {
  fontSize: 12,
  marginBottom:5,
  fontWeight: 'bold',
  color: '#8C8C8C', 
},
sheetcardText: {
    fontSize: 16,
    marginTop:20,
    fontWeight: 'bold',
    color: '#8C8C8C', 
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
  width :width/4,
  height: 40,
  paddingHorizontal:10,
  fontSize:12,
  fontWeight:"regular",
  borderRadius: 22,
  marginRight: 10,
  justifyContent:'center',
  alignItems:'center',
//   backgroundColor:'#FFBA1A',
},
StateText:{
    fontWeight:"bold",
    color:colors.white,
  },
categoryTextselected: {
  color:'#fff',
  fontWeight:'bold',
 
},
categoryText: {
  fontWeight:"bold",
  color:colors.primary,
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
  alignItems:'center'
},

groupContainer: {
      marginVertical: 16,
    },
    groupTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 10,
    },
  

});

export default EncoursAttendScreen;