import React, { useContext, useState  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions,Image,TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import FormattedDate from '../../components/FormattedDate';


const initialData_Vetements = [
  { id: '0' , state: 'En Attente', code:'CM00121',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '1' , state: 'En cours', code:'CM0021',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'),adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '2' , state: 'Terminée' ,code:'CM0021',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z',},
  { id: '3' , state: 'Annulée' , code:'CM0021',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},

  { id: '4' , state: 'En cours', code:'CM0021',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '5' , state: 'Terminée' , code:'CM0021',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '6' , state: 'Annulée' , code:'CM0021',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  
  { id: '7' , state: 'En cours', code:'CM0021',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '8' , state: 'Terminée' , code:'CM0021',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '9'  , state: 'Annulée', code:'CM0021',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},

  { id: '10' , state: 'En cours', code:'CM0021',date:'2024-12-30T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '11' , state: 'Terminée' ,code:'CM0021',date:'2024-11-16T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '12' , state: 'Annulée' ,code:'CM0021',date:'2025-01-02T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '13' , state: 'Annulée' ,code:'CM0021',date:'2024-12-30T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '14' , state: 'Annulée' ,code:'CM0021',date:'2019-11-09T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'wassim', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
  { id: '15' , state: 'Annulée' ,code:'CM0021',date:'2023-12-30T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'wassim2', src: require('../../../assets/images/product/judy.png'), adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z', adresseR:'03 rue de Tunis , Tunisie' ,dateR:'2024-11-01T08:25:30.000Z'},
]

const initialData_Boutique = [
  { id: '0' , state: 'En cours', code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2025-01-5T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
      { name: "Lessive liquide", price: 15, quantity: 2 },
      { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},
  { id: '1' , state: 'Terminée', code:'CM00150',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2024-11-13T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},
  { id: '2' , state: 'Terminée' ,code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2025-01-5T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},
  { id: '3' , state: 'Annulée' , code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2025-01-5T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},

  { id: '4' , state: 'En cours', code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2025-01-04T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},
  { id: '5' , state: 'Terminée' , code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2025-01-04T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},
  { id: '6' , state: 'Annulée' , code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2025-01-04T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},
  
  { id: '7' , state: 'En cours', code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2024-11-17T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},
  { id: '8' , state: 'Terminée' , code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2024-11-15T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},
  { id: '9'  , state: 'Annulée', code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2024-11-14T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},

  { id: '10' , state: 'En cours', code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2024-11-26T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},
  { id: '11' , state: 'Terminée' ,code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2024-12-16T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},
  { id: '12' , state: 'Annulée' ,code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2025-01-04T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},
  { id: '13' , state: 'Annulée' ,code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2024-11-12T08:25:30.000Z', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},
  { id: '14' , state: 'Annulée' ,code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2020-11-09T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'wassim', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
    { name: "Lessive liquide pour machine automatique 3L", price: 10, quantity: 1 },
    { name: "Lessive liquide", price: 15, quantity: 2 },
    { name: "Lessive liquide", price: 15, quantity: 2 }
    ]},
  { id: '15' , state: 'Annulée' ,code:'CM0050',name:'Eya Hatira',email:'eyahatira@gmail.com',phone:'56565656',dateAnnulation:'2024-02-5T08:25:30.000Z',dateEstimation:'2025-02-5T08:25:30.000Z',date:'2019-11-11T08:25:30.000Z',pressing:'Laundry Pressing',livreur:'Mohamed mohamed',price:12,quantity:0, title: 'wassim2', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',products: [
      { name: 'Product A', price: 10, quantity: 1 },
      { name: 'Product B', price: 15, quantity: 2 }
    ]},
]


const { width,height } = Dimensions.get('window');

const HistoryScreen = ({navigation}) => {

  const navigationGoBack = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Nettoyage');

  const sortedData_Vetements = initialData_Vetements.sort((a, b) => new Date(b.date) - new Date(a.date));
  const sortedData_Boutique = initialData_Boutique.sort((a, b) => new Date(b.date) - new Date(a.date));
  const [data_Vetements, setData_Vetements] = useState(sortedData_Vetements);
  const [data_Boutique, setData__Boutique] = useState(sortedData_Boutique);
 

  const [filterNettoyage, setFilterNettoyage] = useState('All'); // 'All', 'Running', 'Pending'
  const [filterBoutique , setFilterBoutique ] = useState('All'); // 'All', 'Running', 'Pending'

  const [dropdownVisibleNettoyage, setDropdownVisibleNettoyage] = useState(false);
  const [dropdownVisibleBoutique, setDropdownVisibleBoutique] = useState(false);


  const [filterDateNettoyage, setFilterDateNettoyage] = useState('All'); // 'All', 'Today', 'This Month', 'Last Month'
  const [dropdownVisibleDateNettoyage, setDropdownVisibleDateNettoyage] = useState(false);

  const [filterDateBoutique, setFilterDateBoutique] = useState('All'); // 'All', 'Today', 'This Month', 'Last Month'
  const [dropdownVisibleDateBoutique, setDropdownVisibleDateBoutique] = useState(false);
 
  const filterData_Vetements =()=> filterNettoyage === 'All' ? data_Vetements : data_Vetements.filter(el => el.state === filterNettoyage);
  const filterData_Boutique =()=> filterBoutique === 'All' ? data_Boutique : data_Boutique.filter(el => el.state === filterBoutique);

  const HandleProductPress = (item) => {
    navigation.navigate('HistoryDetailScreen',{item:item})
  }

  const EncoursAttend  = (item) => {
    navigation.navigate('EncoursAttendScreen',{item:item})
  }

  const EncoursAttendBoutique = (item) => {
    navigation.navigate('EncoursAttendBoutique',{item:item})
  }


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
        {/* EncoursAttend(item) */}

        {item.state==="En Attente" && (
          <TouchableOpacity  onPress={()=>EncoursAttend(item)}>
              <View  style={styles.tt} >
                  <View >
                    <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                    <Text style={styles.cardText}>{item.date}</Text>
                  </View>
                    {renderIcon(item.state)}
              </View>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.cardText}>Nombre d’articles :</Text>
          <Text style={[styles.cardText,{color:'#000'}]}>{item.quantity}</Text>
        </View>
  

              <View style={{flexDirection:'column'}}>
              <Text style={styles.cardText}>Adresse et date  de livraison :</Text>
              <Text style={[styles.cardText,{color:'#000'}]}>{item.adresseL} le {item.dateL} </Text>
              </View>

              <View style={{flexDirection:'column'}}>
              <Text style={styles.cardText}>Adresse et date de récupération :</Text>
              <Text style={[styles.cardText,{color:'#000'}]}>{item.adresseR} le {item.dateR}</Text>
              </View>

                <View style={styles.horizontalLine} />
                <View style={styles.line}>
                  <Text style={styles.priceText}>Details de commande</Text>
                  <Text style={styles.priceText}>{item.price} DT</Text>
                </View>

                </TouchableOpacity>


        )}
          {item.state === "En cours"  && (
              <TouchableOpacity  onPress={()=>EncoursAttend(item)}> 
              <View  style={styles.tt} >
                  <View >
                    <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                    <Text style={styles.cardText}>{item.date}</Text>
                  </View>
                    {renderIcon(item.state)}
              </View>

        

            <View style={{flexDirection:'row'}}>
                      <Text style={styles.cardText}>Pressing :</Text>
                      <Text style={[styles.cardText,{color:'#000'}]}>{item.pressing}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.cardText}>Livreur :</Text>
                      <Text style={[styles.cardText,{color:'#000'}]}>{item.livreur}</Text>
                    </View>

                        <View style={styles.horizontalLine} />
                        <View style={styles.line}>
                          <Text style={styles.priceText}>Details de commande</Text>
                          <Text style={styles.priceText}>{item.price} DT</Text>
            </View>

            </TouchableOpacity>

        )}
        {item.state === "Terminée" && (
              <TouchableOpacity  onPress={()=>HandleProductPress(item,data_Vetements)}> 
              <View  style={styles.tt} >
                  <View >
                    <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                    <Text style={styles.cardText}>{item.date}</Text>
                  </View>
                    {renderIcon(item.state)}
              </View>

        

            <View style={{flexDirection:'row'}}>
                      <Text style={styles.cardText}>Pressing :</Text>
                      <Text style={[styles.cardText,{color:'#000'}]}>{item.pressing}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.cardText}>Livreur :</Text>
                      <Text style={[styles.cardText,{color:'#000'}]}>{item.livreur}</Text>
                    </View>

                        <View style={styles.horizontalLine} />
                        <View style={styles.line}>
                          <Text style={styles.priceText}>Details de commande</Text>
                          <Text style={styles.priceText}>{item.price} DT</Text>
            </View>

            </TouchableOpacity>

        )}
        {item.state==="Annulée"  && (
          <View>

<View  style={styles.tt} >
                <View >
                  <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                  <Text style={styles.cardText}>{item.date}</Text>
                </View>
                  {renderIcon(item.state)}
            </View>
          

          <View style={{flexDirection:'row'}}>
                    <Text style={styles.cardText}>Pressing : - </Text>
                
                  </View>

                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.cardText}>Livreur : - </Text>
                
                  </View>

                      <View style={styles.horizontalLine} />
                      <View style={styles.line}>
                        <Text style={styles.priceText}>Details de commande</Text>
                        <Text style={styles.priceText}>{item.price} DT</Text>
          </View>
        



          </View>
 
        )}

        </View>     
 
 
 </View>
  );
  

  const   renderCommandItemBoutique = ({ item }) => (
    <View style={styles.card}>
<View style={styles.actionButtonProduct}>

        {item.state==="En cours" &&(
          <TouchableOpacity  onPress={()=>EncoursAttendBoutique(item)}>
            
                <View  style={styles.tt} >
                    <View >
                      <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                      <View style={[{flexDirection:'row'}]}>
                        <Text style={styles.cardText}>Estimée le :</Text>
                        <FormattedDate style={styles.cardText} dateString={item.dateEstimation}></FormattedDate>
                      </View>
                      </View>
                      {renderIcon(item.state)}
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.cardText}>Nombre d’articles :</Text>
                  <Text style={[styles.cardText,{color:'#000'}]}>{item.quantity}7</Text>
                </View>
      
                <Text style={styles.cardText}>Products: </Text>
                {item.products.map((product, index) => (
                  <Text key={index} style={[styles.cardText,{color:'#000'}]}>
                    (X {product.quantity}) {product.name} 
                  </Text>))}

          </TouchableOpacity>
        
        )}
        {item.state==="Terminée" &&(

          <TouchableOpacity  onPress={()=>EncoursAttendBoutique(item)}>
                      
          <View  style={styles.tt} >
              <View >
                <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
                <View style={[{flexDirection:'row'}]}>
                        <Text style={styles.cardText}>Estimée le :</Text>
                        <FormattedDate style={styles.cardText} dateString={item.dateEstimation}></FormattedDate>
                      </View>
              </View>
                {renderIcon(item.state)}
          </View>

          <View style={{flexDirection:'row'}}>
            <Text style={styles.cardText}>Nombre d’articles :</Text>
            <Text style={[styles.cardText,{color:'#000'}]}>{item.quantity}5</Text>
          </View>

          <Text style={styles.cardText}>Products: </Text>
          {item.products.map((product, index) => (
            <Text key={index} style={[styles.cardText,{color:'#000'}]}>
              (X {product.quantity}) {product.name} 
            </Text>))}

          </TouchableOpacity>

      )}

{item.state==="Annulée" ?(
     <View>
                  
          <View  style={styles.tt} >
            <View >
              <Text style={[styles.cardText,{color:'#000'}]}>{item.code}</Text>
              <View style={[{flexDirection:'row'}]}>
                <Text style={styles.cardText}>Estimée le :</Text>
                <FormattedDate style={styles.cardText} dateString={item.dateEstimation}></FormattedDate>
              </View>
            </View>
              {renderIcon(item.state)}
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.cardText}>Nombre d’articles :</Text>
          <Text style={[styles.cardText,{color:'#000'}]}>{item.quantity}1</Text>
        </View>

        <Text style={styles.cardText}>Products: </Text>
        {item.products.map((product, index) => (
          <Text key={index} style={[styles.cardText,{color:'#000'}]}>
            (X {product.quantity}) {product.name} 
          </Text>))}
     </View>
):(
  <View></View>
)} 
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

  const toggleDropdownBoutique = () => {
    setDropdownVisibleBoutique(!dropdownVisibleBoutique);
  };

  const selectFilterBoutique = (option2) => {
    setFilterBoutique(option2);
    setDropdownVisibleBoutique(false);
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
  const filteredBoutiqueByDate = filterData_Boutique().filter(el => getDateRange(filterDateBoutique)(el.date));

  const toggleDropdownDateNettoyage = () => {
    setDropdownVisibleDateNettoyage(!dropdownVisibleDateNettoyage);
  };

  const toggleDropdownDateBoutique = () => {
    setDropdownVisibleDateBoutique(!dropdownVisibleDateBoutique);
  };

  const selectfilterDate = (option3) => {
    setFilterDateNettoyage(option3);
    setDropdownVisibleDateNettoyage(false);
  };

  const selectfilterDateBoutique = (option4) => {
    setFilterDateBoutique(option4);
    setDropdownVisibleDateBoutique(false);
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        <View style={styles.header}>  

          <View style={styles.top}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
              </TouchableOpacity>
              <Text  style={[styles.sectionTitle,styles.topTitle]}>Historiques</Text>  
          </View>     
          
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Nettoyage' && styles.activeTab]}
            onPress={() => setSelectedTab('Nettoyage')}
          >
            <Text 
            style={[styles.tabText, selectedTab === 'Nettoyage' && styles.tabTextSelected]}
            >
              Nettoyage vétements</Text>
          </TouchableOpacity> 

          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Boutique' && styles.activeTab]}
            onPress={() => setSelectedTab('Boutique')}
          >
            <Text
             style={[styles.tabText, selectedTab === 'Boutique' && styles.tabTextSelected]}
            >Boutique en ligne</Text>
          </TouchableOpacity>
        </View>

        </View>

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
                        {['All','En Attente','En cours', 'Terminée','Annulée'].map(option => (
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
            <FlatList
              data={filteredNettoyageByDate}
              keyExtractor={(item) => item.id}
              renderItem={renderCommandItemNettoyage}
              // contentContainerStyle={styles.listContainer}
            />
          )}

          {selectedTab === 'Boutique' && (
          <View  style={styles.filterContainer}>
                <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdownDateBoutique}>
                  <Text style={styles.dropdownButtonText}>{filterDateBoutique}</Text>
                </TouchableOpacity>
                {dropdownVisibleDateBoutique && (
                  <View style={styles.dropdown}>
                    {['All', 'Today', 'This Month', 'Last Month','Last Year'].map(option4 => (
                      <TouchableOpacity
                        key={option4}
                        style={styles.dropdownOption}
                        onPress={() => selectfilterDateBoutique(option4)}
                      >
                        <Text style={styles.dropdownOptionText}>{option4}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                </View>

                <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdownBoutique}>
                  <Text style={styles.dropdownButtonText}>{filterBoutique}</Text>
                </TouchableOpacity>
                {dropdownVisibleBoutique && (
                  <View style={styles.dropdown}>
                    {['All', 'En Attente','En cours', 'Terminée','Annulée'].map(option2 => (
                      <TouchableOpacity
                        key={option2}
                        style={styles.dropdownOption}
                        onPress={() => selectFilterBoutique(option2)}
                      >
                        <Text style={styles.dropdownOptionText}>{option2}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                </View>

          </View>

          )}
          {selectedTab === 'Boutique' && (
            <FlatList
              data={filteredBoutiqueByDate}
              keyExtractor={(item) => item.id}
              renderItem={renderCommandItemBoutique}
              // contentContainerStyle={styles.listContainer}
            />
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

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    alignContent:'center',
    backgroundColor: colors.background,
    paddingVertical: 10,
    marginVertical:20,
    paddingHorizontal: 10,

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
    color:colors.white,
  },
tt:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'space-between',
    alignItems:'center',
    
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




});


export default HistoryScreen;