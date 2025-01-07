import React,{useContext} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import { BasketContext } from '../../Context/BasketContext';
import FormattedDate from '../../components/FormattedDate';


const { width } = Dimensions.get('window');
splitScreen = 1.9;

const boutiqueData = [
  { id: '1', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'), navigateTo: 'ClothesDetail' },
  { id: '2', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'),  navigateTo: 'ClothesDetail' },
  { id: '3', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'),  navigateTo: 'ClothesDetail' },
  { id: '4', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'),  navigateTo: 'ClothesDetail' }
];
const EncoursAttendBoutique = ({navigation,route}) => {

  const {item} = route.params;
  const navigationGoBack = useNavigation();
 const {basket,setBasket} = useContext(BasketContext);
  const renderIcon = (state) => {
    switch (state) {
      case 'Terminée':
        return (
          <View style={[styles.encours,{backgroundColor:'#14DA32'}]}>
              {React.createElement(icons['Terminee'], { width:14 , height: 22,marginRight:5 })}
              <Text style={[styles.StateText , styles.StateText]}>Terminée</Text>
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


  const addToBasket = (item) => {
    const itemExists = basket.some(it => it.id === item.id);
  
    if (itemExists) {
      // If the item already exists in the basket, increment its quantity
      setBasket(prevBasket =>
        prevBasket.map(it =>
          it.id === item.id
            ? { ...it, quantity: it.quantity + 1 }
            : it
        )
      );
    } else {
      // If the item doesn't exist in the basket, add it with a quantity of 1
      setBasket([...basket, { ...item, quantity: 1 }]);
    }
  

  };


    const renderProductItem = ({ item }) => (
      <View style={styles.cardProduct}>
        <TouchableOpacity style={styles.actionButtonProduct} onPress={() => navigation.navigate('ProductDetailScreen',{item:item})}>
          <Image source={item.src} style={styles.productImage} />
          <Text style={styles.productText}>{item.title}</Text>
  
          <View style={styles.price_plus}>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity  onPress={() =>  addToBasket(item)}>
              {React.createElement(icons['Plus'], { width:28 , height: 28, marginRight:5 })}
              </TouchableOpacity>
          </View>
        </TouchableOpacity>
    </View>
  
  
    );

    const sections = [
      { id: '1', type: 'section1',data: item },
      { id: '2', type: 'section2',data: boutiqueData},
    ];

  const renderSectionSwitch = ({ item }) => {
    switch (item.type) {
      case 'section1':
        return (
          <View style={styles.section}>
            {console.log(item.data)}
          <View style={styles.card}>
                      <View  style={styles.tt} >
                          <View >
                            <Text style={[styles.cardText,{color:'#000'}]}>{item.data.code}</Text>
                            <View style={[{flexDirection:'row'}]}>
                                <Text style={styles.cardText}>Passée le : </Text>
                                <FormattedDate style={[styles.cardText,{color:'#000',marginBottom:2}]} dateString={item.data.date}></FormattedDate>
                            </View>
                          </View>
                            {renderIcon(item.data.state)}
                      </View>

                      <Text style={[styles.cardText,{color:'#000',marginBottom:20}]}>Détails</Text>
                      <View style={[{flexDirection:'row'}]}>
                        <Text style={styles.cardText}>Nom et Prénom : </Text>
                        <Text style={[styles.cardText,{color:'#000',marginBottom:2}]}>{item.data.name}</Text>
                      </View>

                      <View style={[{flexDirection:'row'}]}>
                        <Text style={styles.cardText}>E-mail : </Text>
                        <Text style={[styles.cardText,{color:'#000',marginBottom:2}]}>{item.data.email}</Text>
                      </View>

                      <View style={[{flexDirection:'row'}]}>
                        <Text style={styles.cardText}>Télèphone : </Text>
                        <Text style={[styles.cardText,{color:'#000',marginBottom:2}]}>{item.data.phone}</Text>
                      </View>

                      <View style={[{flexDirection:'row'}]}>
                        <Text style={styles.cardText}>Adresse de livraison : </Text>
                        <Text style={[styles.cardText,{color:'#000',marginBottom:2}]}>{item.data.adresseL}</Text>
                      </View>

                      <View style={[{flexDirection:'row'}]}>
                        <View style={[{flexDirection:'row'}]}>
                            <Text style={styles.cardText}>Livraison estimée : </Text>
                            <FormattedDate style={[styles.cardText,{color:'#000',marginBottom:2}]} dateString={item.data.dateEstimation}></FormattedDate>
                        </View>
                      </View>
                      <Text style={[{color:colors.primary}]}>
                      Le livreur vous contacterez avant la livraison pour que vous soyez disponible.
                      </Text>

                      <View style={styles.horizontalLine} />
                      <Text style={[styles.cardText,{color:'#000',marginBottom:10}]}>Mon panier</Text>

                      {item.data.products.map((product, index) => (
                        <View key={index} style={[styles.product]}>
                          <Text  style={[styles.cardTextProducts,{color:'#000'}]}>
                          (X {product.quantity})
                        </Text>

                        <Text  style={[styles.Productsname,{color:'#000'}]}>
                           {product.name} 
                        </Text>

                        <Text  style={[styles.cardTextProducts,{color:'#000'}]}>
                            {product.quantity*product.price} TND
                        </Text>

                        </View>
                      
                      ))}

                      <View style={styles.horizontalLine} />

                      <Text style={[styles.cardText,{color:'#000'}]}>Détails de paiement</Text>
                      <Text style={[styles.cardText,{marginBottom:20}]}>Payer plus tard à la livraison en espéces</Text>
                        
                        <View style={[{flexDirection:'row',justifyContent:'space-between'}]}>
                          <Text style={styles.cardText}>Total des articles : </Text>
                          <Text style={[styles.cardText,{color:'#000',marginBottom:2}]}>44,625 TND</Text>
                        </View>

                        <View style={[{flexDirection:'row',justifyContent:'space-between'}]}>
                          <Text style={styles.cardText}>Frais de Livraison : </Text>
                          <Text style={[styles.cardText,{color:'#000',marginBottom:2}]}>7 TND</Text>
                        </View>

                        <View style={[{flexDirection:'row',justifyContent:'space-between'}]}>
                          <Text style={styles.cardText}>Total à payer : </Text>
                          <Text style={[styles.cardText,{color:colors.primary,marginBottom:2}]}>51,625 TND</Text>
                        </View> 
          </View>
            </View>
      );
      case 'section2':
        return (
          <View style={styles.section2}>
            {console.log(item.data.data)}


          <View style={styles.sectionHeader}>

              <Text style={styles.sectionTitle}>Suggestions de Produits </Text>
              <TouchableOpacity  onPress={() => navigation.navigate('StoreScreen')}>

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.more}>Tous les produits </Text>
              {React.createElement(icons['Arrowright'], { width:26 , height: 16, })}
              </View>
              </TouchableOpacity>

          </View>




          <FlatList
            data={item.data}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />

        </View>
      ); 
      default:
        return null;
    }
  };

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
              
                    <FlatList
                          data={sections}
                          renderItem={renderSectionSwitch}
                          keyExtractor={(item) => item.id}
                        />
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
    alignItems:'center',
    marginBottom:10
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
  fontSize: 13,
  marginBottom:5,
  fontWeight: 'bold',
  color: '#8C8C8C', 
},
product:{
  // width:width/1.5,
  flexDirection:'row',
  justifyContent:"space-between",
  alignContent:'center',
  alignItems:"center"
},
cardTextProducts: {
  // width:width/2,
  fontSize: 13,
  marginBottom:5,
  fontWeight: 'bold',
  color: '#8C8C8C', 
},
Productsname: {
  width:width/2,
  fontSize: 13,
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
section2: {
  paddingTop :20,
  paddingLeft :20
},
sectionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
sectionTitle: {
  fontSize: 16,
  fontWeight :'semibold',
  marginBottom: 10,
},
more: {
  fontSize: 16,
  color:'#5549EF',
  fontWeight :'semibold',
},
actionButtonProduct: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
},
cardProduct: {
  width: width/2.3, 
  height: width/2.1,
  borderRadius: 8,
  overflow: 'hidden',
  marginVertical: 10,
  marginHorizontal:5,
  backgroundColor: '#FDFDFD', 
  borderWidth:2,
  borderColor:'#E6E5FD',
  position: 'relative',
},
productImage: {
  width: 60, 
  height: 70, 
  marginVertical: 20,
},
productText: {
  fontSize: 10,
  marginBottom:5,
  fontWeight: 'bold',
  color: '#000', // Text color
},
price_plus:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  alignContent:'center',
},
});

export default EncoursAttendBoutique;