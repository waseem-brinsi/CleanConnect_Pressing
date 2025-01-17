import React, { useContext, useState  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions,Image,TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import FormattedDate from '../../components/FormattedDate';
import HeaderComponent from '../../components/HeaderComponent';


const initialData_Vetements = [
  { id: '0' , state: 'Payée', code:'CM00121',date:'2025-01-04T08:25:30.000Z',montant:24},
  { id: '1' , state: 'NON Payée', code:'CM0021',date:'2025-01-04T08:25:30.000Z',montant:24},
  { id: '2' , state: 'Payée' ,code:'CM0021',date:'2025-01-04T08:25:30.000Z',montant:24,},
  { id: '3' , state: 'NON Payée' , code:'CM0021',date:'2025-01-04T08:25:30.000Z',montant:24},

  { id: '4' , state: 'NON Payée', code:'CM0021',date:'2025-01-03T08:25:30.000Z',montant:24},
  { id: '5' , state: 'Payée' , code:'CM0021',date:'2025-01-03T08:25:30.000Z',montant:24},
  { id: '6' , state: 'NON Payée' , code:'CM0021',date:'2025-01-03T08:25:30.000Z',montant:24},
  
  { id: '7' , state: 'NON Payée', code:'CM0021',date:'2025-01-02T08:25:30.000Z',montant:24},
  { id: '8' , state: 'Payée' , code:'CM0021',date:'2025-01-02T08:25:30.000Z',montant:24},
  { id: '9'  , state: 'Annulée', code:'CM0021',date:'2025-01-02T08:25:30.000Z',montant:24},

  { id: '10' , state: 'NON Payée', code:'CM0021',date:'2024-12-30T08:25:30.000Z',montant:24},
  { id: '11' , state: 'Payée' ,code:'CM0021',date:'2024-11-16T08:25:30.000Z',montant:24},
  { id: '12' , state: 'NON Payée' ,code:'CM0021',date:'2025-01-02T08:25:30.000Z',montant:24},
  { id: '13' , state: 'Payée' ,code:'CM0021',date:'2024-12-30T08:25:30.000Z',montant:24},
  { id: '14' , state: 'NON Payée' ,code:'CM0021',date:'2019-11-09T08:25:30.000Z',montant:24},
  { id: '15' , state: 'Payée' ,code:'CM0021',date:'2023-12-30T08:25:30.000Z',montant:24},
]




const { width,height } = Dimensions.get('window');

const PortfeuilScreen = ({navigation}) => {

  const navigationGoBack = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Nettoyage');
  const sortedData_Vetements = initialData_Vetements.sort((a, b) => new Date(b.date) - new Date(a.date));
  const [data_Vetements, setData_Vetements] = useState(sortedData_Vetements);
  const [filterNettoyage, setFilterNettoyage] = useState('All'); // 'All', 'Running', 'Pending'
  const [dropdownVisibleNettoyage, setDropdownVisibleNettoyage] = useState(false);
  const [filterDateNettoyage, setFilterDateNettoyage] = useState('All'); // 'All', 'Today', 'This Month', 'Last Month'
  const [dropdownVisibleDateNettoyage, setDropdownVisibleDateNettoyage] = useState(false);
 
  const filterData_Vetements =()=> filterNettoyage === 'All' ? data_Vetements : data_Vetements.filter(el => el.state === filterNettoyage);
 

  const renderIcon = (state) => {
    switch (state) {
      case 'Payée':
        return (
          <View style={[styles.encours,{backgroundColor:'#DAF7DF'}]}>
              <Text style={[styles.StateText , styles.StateText,{color:'#00BA1F'}]}>Payée</Text>
          </View>
      );
      case 'NON Payée':
        return (
          <View style={styles.encours}>
              <Text style={[styles.StateText]}>NON Payée</Text>
          </View>
      );  
      default:
        return React.createElement(icons['Encours'], { width:14 , height: 22,marginRight:5 });
    }
  };

  const renderCommandItemNettoyage = ({ item }) => (
    <View style={styles.card}>
        <View style={styles.actionButtonProduct}>
              <TouchableOpacity  onPress={()=>EncoursAttend(item)}> 
                <View  style={styles.tt} >
                    <View >
                      <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                      {/* <Text style={styles.cardText}>{FormattedDate(item.date)}</Text> */}
                      <FormattedDate style={[styles.cardText]} dateString={item.date}></FormattedDate>

                    </View>
                    {renderIcon(item.state)}
                    <View>
                      <Text style={[styles.cardText,{color:'#000'}]}>{item.montant} TND</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>     
    </View>
  ); 

  const toggleDropdownNettoyage = () => {
    setDropdownVisibleNettoyage(!dropdownVisibleNettoyage);
  };
  
  const selectFilterNettoyage = (option) => {
    setFilterNettoyage(option);
    setDropdownVisibleNettoyage(false);
  };

  const getDateRange = (filterDateNettoyage) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const startOfThisYear = new Date(today.getFullYear(), 0, 1);

    switch (filterDateNettoyage) {
      case 'Today':
        return (date) => new Date(date).setHours(0, 0, 0, 0) === startOfToday.getTime();
      case 'This Month':
        return (date) => new Date(date).getMonth() === startOfThisMonth.getMonth() &&
          new Date(date).getFullYear() === startOfThisMonth.getFullYear();
      case 'Last Month':
        return (date) => new Date(date).getMonth() === startOfLastMonth.getMonth() &&
          new Date(date).getFullYear() === startOfLastMonth.getFullYear();
      case 'Last Year':
        return (date) => new Date(date) < startOfThisYear;
      default:
        return () => true; // No filtering for 'All'
    }
  };

  const filteredNettoyageByDate = filterData_Vetements().filter(el => getDateRange(filterDateNettoyage)(el.date));

  const toggleDropdownDateNettoyage = () => {
    setDropdownVisibleDateNettoyage(!dropdownVisibleDateNettoyage);
  };

  const selectfilterDate = (option3) => {
    setFilterDateNettoyage(option3);
    setDropdownVisibleDateNettoyage(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>
      

      <View style={styles.header}>  
        <HeaderComponent title={"Historiques de paiements"}></HeaderComponent>

        <View style={styles.card2}>
          <Text style={styles.SoldText}>Mon Solde</Text>
          <Text style={[styles.SoldText,{fontSize:32,color:colors.primary}]}>460.0 TND</Text>
          <Text style={[styles.SoldText,,{fontSize:13}]}>12345 67891 23456789123</Text>
        </View>


        </View>

        <Text style={styles.title}>Historique de Paiement</Text>

          {selectedTab === 'Nettoyage' && (
            <View style={styles.filterContainer}>
                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdownDateNettoyage}>
                      <Text style={styles.dropdownButtonText}>{filterDateNettoyage}</Text>
                    </TouchableOpacity>



                    {dropdownVisibleDateNettoyage && (
                      <View style={styles.dropdown}>
                        {['All', 'Today', 'This Month', 'Last Month','Last Year'].map(option3 => (
                          <TouchableOpacity
                            key={option3}
                            style={styles.dropdownOption}
                            onPress={() => selectfilterDate(option3)}
                          >
                            <Text style={styles.dropdownOptionText}>{option3}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>

                    <View style={styles.dropdownContainer}>
                    <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdownNettoyage}>
                      <Text style={styles.dropdownButtonText}>{filterNettoyage} </Text>
                    </TouchableOpacity>
                    {dropdownVisibleNettoyage && (
                      <View style={styles.dropdown}>
                        {['All','Payée','NON Payée'].map(option => (
                          <TouchableOpacity
                            key={option}
                            style={styles.dropdownOption}
                            onPress={() => selectFilterNettoyage(option)}
                          >
                            <Text style={styles.dropdownOptionText}>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    </View>
            </View>
          )}

          {selectedTab === 'Nettoyage' && (
<View>
<View style={styles.cardLabel}>
                      <View  style={styles.tt1} >
                          <Text style={[styles.cardText1]}>Date/N°CM</Text>
                          <Text  style={[styles.cardText1]}>Statut</Text>
                          <Text style={[styles.cardText1]}>Montant</Text>
                      </View>
              </View>     
           

            <FlatList
              data={filteredNettoyageByDate}
              keyExtractor={(item) => item.id}
              renderItem={renderCommandItemNettoyage}
              // contentContainerStyle={styles.listContainer}
            />
</View>

          )}



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
    backgroundColor: "#fff",
  },
  header:{
    backgroundColor:colors.background,
    paddingBottom:20,
    marginBottom:20,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
  },
  top:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:10

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight :'semibold',
    color:colors.primary,
    marginBottom: 10,
  },

  topTitle:{
    margin :"auto",
    color:colors.primary,
    marginTop:5,
    fontSize:16,
    fontWeight:"bold",
  },

  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },


  categoryContainer: {

    // paddingBottom: 10,
  },
  tabButton: {
    height: height/20,
    width :width/2.2,
    paddingHorizontal:10,
    fontSize:12,
    fontWeight:"regular",
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 10,
    justifyContent:'center',
  },
  
  activeTab: {
    borderWidth: 1,
    backgroundColor:colors.primary,
    borderColor:colors.primary,
  },
  tabTextSelected: {
    color:'#fff',
    fontWeight:'bold',
  },
  tabText: {
    fontWeight:"bold",
    color:colors.primary,
    textAlign: 'center',
  },

actionButtonProduct: {
    padding: 10,
  },
  StateText:{
    fontWeight:"bold",
    color:"#8C8C8C",
  },
tt:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'space-between',
    alignItems:'center',
  },

card: {
  borderRadius: 8,
  flex:1,
  overflow: 'hidden',
  marginVertical: 10,
  marginHorizontal:5,
  // backgroundColor: colors.white, 
  // borderWidth:2,
  // borderColor:'#E6E5FD',
  position: 'relative',
},
cardLabel: {
  borderRadius: 8,
  // height:50,
  // width:width,
  padding:15,
  // overflow: 'hidden',
  marginVertical: 10,
  marginHorizontal:5,
  backgroundColor: colors.white, 
  // borderWidth:2,
  // borderColor:'#E6E5FD',
},
tt1:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignContent:'center',
  alignItems:'center',
},
card2:{
  // flex:1,
  justifyContent:"center",
  alignContent:"center",
  alignItems:"center",
  paddingVertical:10,
  backgroundColor:colors.background2,
  margin:20,
  borderRadius:20
},
title:{
  fontSize: 16,
  marginHorizontal:20,
  fontWeight: 'bold',
},
SoldText:{
  fontSize: 19,
  marginBottom:5,
  fontWeight: 'bold',
},
cardText: {
  fontSize: 12,
  marginBottom:5,
  fontWeight: 'bold',
  color: '#8C8C8C', 
},
cardText1: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#000', 
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
  backgroundColor:'#F1F1F1',
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




});


export default PortfeuilScreen;