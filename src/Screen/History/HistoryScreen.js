import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import HeaderComponent from '../../components/HeaderComponent';


const products = [
  { id: '0' , state: 'Terminée', code:'CM013',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '1' , state: 'En cours', code:'CM013',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '2' , state: 'Terminée' ,code:'CM013',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '3' , state: 'Annulée' , code:'CM013',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },

  { id: '4' , state: 'En cours', code:'CM013',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '5' , state: 'Terminée' , code:'CM013',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '6' , state: 'Annulée' , code:'CM013',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  
  { id: '7' , state: 'En cours', code:'CM013',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '8' , state: 'Terminée' , code:'CM013',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '9'  , state: 'Annulée', code:'CM013',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },

  { id: '10' , state: 'En cours', code:'CM013',date:'2024-12-30T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '11' , state: 'Terminée' ,code:'CM013',date:'2024-11-16T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '12' , state: 'Annulée' ,code:'CM013',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '13' , state: 'Annulée' ,code:'CM013',date:'2024-12-30T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '14' , state: 'Annulée' ,code:'CM013',date:'2019-11-09T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'wassim', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '15' , state: 'Annulée' ,code:'CM013',date:'2023-12-30T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'wassim2', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
];


const { width,height } = Dimensions.get('window');


const HistoryScreen = ({navigation}) =>{
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filterDateNettoyage, setFilterDateNettoyage] = useState('All'); // 'All', 'Today', 'This Month', 'Last Month'
    const [dropdownVisibleDateNettoyage, setDropdownVisibleDateNettoyage] = useState(false);

  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.state))];

  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.state === selectedCategory);

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

    const filteredNettoyageByDate = filteredProducts.filter(el => getDateRange(filterDateNettoyage)(el.date));

    const toggleDropdownDateNettoyage = () => {
      setDropdownVisibleDateNettoyage(!dropdownVisibleDateNettoyage);
    };
  
    const selectfilterDate = (option3) => {
      setFilterDateNettoyage(option3);
      setDropdownVisibleDateNettoyage(false);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
          style={[styles.categoryButton,item === selectedCategory && styles.selectedCategory]}
          onPress={() => setSelectedCategory(item)}
        >

        <Text style={[styles.categoryText,item === selectedCategory && styles.categoryTextselected]}>{item}</Text>
        </TouchableOpacity>
      );
    
    
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

  const renderCommandItemNettoyage = ({ item }) => (
    <View style={styles.card}>
        <View style={styles.actionButtonProduct}>

            <TouchableOpacity onPress={()=>{navigation.navigate('HistoryDetailScreen',{item:item})}} >   

<View style={styles.actionButtonProduct}>
      <View  style={styles.tt} >
      <Text style={[styles.cardText,{color:colors.primary}]}>★ --</Text>
      {/* <Text style={[styles.cardText,{color:'#000',marginRight:20}]}>36 TND</Text> */}
      <TouchableOpacity onPress={ ()=>{navigation.navigate("HistoryDetailScreen",{item:item})} }>
        {renderIcon(item.state)}
      </TouchableOpacity>


        </View>

        <View style={styles.row}>
                  <Text style={[styles.cardText,{color:'#000'}]}>Trajet de Livraison / CM012</Text>
        </View>

        
        <View style={styles.row}>
                {React.createElement(icons['Laundry'],{width:15,height:15})}
                <Text style={[styles.cardText]}> Pressing :</Text>
                <Text style={[styles.cardText,{color:'#000'}]}>LAUNDRY</Text>
        </View>      

        <View style={styles.row}>
                  {React.createElement(icons['Map2'],{width:15,height:15})}
                  <Text style={[styles.cardText]}>Adresse du Pressing :</Text>
                  <Text style={[styles.cardText,{color:'#000'}]}> {item.adresseL}</Text>
        </View>
       
        <View style={styles.row}>
                  {React.createElement(icons['User'],{width:15,height:15})}
                  <Text style={[styles.cardText]}> Nom du client :</Text>
                  <Text style={[styles.cardText,{color:'#000'}]}> le :{item.dateL}</Text>
        </View>

        <View style={styles.row}>
                  {React.createElement(icons['Map2'],{width:15,height:15})}
                  <Text style={[styles.cardText]}>Adresse du Pressing :</Text>
                  <Text style={[styles.cardText,{color:'#000'}]}> {item.adresseL}</Text>
        </View>
        
        
        <View style={styles.row}>
                {React.createElement(icons['Clock'],{width:15,height:15})}
                <Text style={[styles.cardText]}>Date et Durée de trajet :</Text>
                <Text style={[styles.cardText,{color:'#000'}]}> 12/02/2024 ,</Text>
                <Text style={[styles.cardText,{color:'green'}]}>25 Minutes</Text>
        </View>
        

        </View>
            </TouchableOpacity>


        </View>     
 </View>
  );


  console.log(filteredProducts)
  return (
  <SafeAreaView style={styles.safeArea}>

  <View style={styles.container}>
    <HeaderComponent title={'Historiques'} style={{backgroundColor:colors.background}}></HeaderComponent>

      <View style={styles.header}>  

              <View style={styles.top}>

                <FlatList
                  horizontal
                  data={categories}
                  keyExtractor={(item) => item}
                  renderItem={renderCategoryItem}
                  showsHorizontalScrollIndicator={false}
                />
                
              </View>   
      </View>

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

      
      </View>


          <FlatList
              data={filteredNettoyageByDate}
              keyExtractor={(item) => item.id}
              renderItem={renderCommandItemNettoyage}
              // contentContainerStyle={styles.listContainer}
            />



    </View>


  </SafeAreaView>

  );
}

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
      backgroundColor:colors.background,
      paddingBottom:20,
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
  categoryButton: {
    height: 30,
    width :'auto',
    paddingHorizontal:10,
    fontSize:12,
    fontWeight:"regular",
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 10,
    justifyContent:'center',
  },
  selectedCategory: {
        borderWidth: 1,
        backgroundColor:colors.primary,
        borderColor:colors.primary,
  },
  categoryText: {
    fontWeight:"bold",
    color:colors.primary,
  },
  categoryTextselected: {
    color:'#fff',
    fontWeight:'bold',
  },
  productList: {
    paddingTop: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    color: '#333',
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
  StateText:{
    fontWeight:"bold",
    color:colors.white,
  },
  tt:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'space-between',
    alignItems:'center',
    marginBottom:20
  },

card: {
  // width: width/2.3, 
  // height: width/2.1,
  borderRadius: 8,
  flex:1,
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
  marginBottom:5,
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
  alignItems:'center'
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
  backgroundColor:'#FFBA1A',
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
actionButtonProduct: {
  padding: 10,
},
});


export default HistoryScreen;