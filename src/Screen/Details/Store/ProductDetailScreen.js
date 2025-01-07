import React, { useState ,useEffect,useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions,Image,Animated} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import { BasketContext } from '../../../Context/BasketContext';


const { width } = Dimensions.get('window');




const ProductDetailScreen = ({navigation,route}) => {

  const {item,similarProducts} = route.params;
  const navigationGoBack = useNavigation();
  const {basket,setBasket} = useContext(BasketContext);

  const [opacity] = useState(new Animated.Value(0)); 
  


  const startTransition = () => {

    opacity.setValue(0);

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500, 
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {

    startTransition();
  }, []);

  const handlePress = (item,similarProducts) => {

    startTransition();
    navigation.navigate('ProductDetailScreen',{item,similarProducts})
  };

  const getElementById = (id) => {
    const element = basket.find((item) => item.id === id);
    return element;
  };

  const quantity = getElementById(item.id)?.quantity || 0;  
  const addToBasket = () => {
    const itemExists = basket.some(it => it.id === item.id);
  
    if (itemExists) {
      
      setBasket(prevBasket =>
        prevBasket.map(it =>
          it.id === item.id
            ? { ...it, quantity: it.quantity + 1 }
            : it
        )
      );
    } else {
     
      setBasket([...basket, { ...item, quantity: 1 }]);
    }
  

  };

 

  const renderSimilarProduct = ({ item }) => (

    <View style={styles.cardProduct}>
    <TouchableOpacity style={styles.actionButtonProduct} onPress={()=>handlePress(item,similarProducts)}>
    <Image source={item.src} style={styles.productImage2} />
    <Text style={styles.productText}>{item.title}</Text>
    <View style={styles.price_plus}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity  onPress={() => handle_PlusPress(item)}>
        {React.createElement(icons['Plus'], { width:28 , height: 28, marginRight:5 })}
        </TouchableOpacity>
    </View>
    </TouchableOpacity>
    </View>

  );
 
 

  const increment = (item) => {
    setBasket((prevBasket) =>
      prevBasket.map((it) =>
        it.id === item.id ? { ...it, quantity: quantity +1 } : it
      )
    );
  };
  


  const decrement = (item) => {
    setBasket((prevBasket) =>
      prevBasket.map((it) =>
        it.id === item.id ? { ...it, quantity: quantity-1 } : it
      )
    );
  };

const Render_NumberProduct =() =>{
    return(
        <View style={styles.ActionSheet_itemRow}>
        <View style={styles.ActionSheet_numberItem}>
    
            <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={() => {decrement(item)}}>
              <Text style={styles.ActionSheet_numberText}>-</Text>
            </TouchableOpacity>     
    
          </View>
    
        <Text  style={styles.itemTextActionSheet}>{quantity}</Text>
    
        <View style={styles.ActionSheet_numberItem}>
    
          <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={() => {increment(item)}}>
            <Text style={styles.ActionSheet_numberText}>+</Text>
          </TouchableOpacity>     
    
        </View>
    </View>

    )
}




  return (
    <SafeAreaView style={styles.safeArea}>
       

        <View style={styles.container}>

            <View style={styles.header}>  
              <View style={styles.top}>
                  <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                      {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
                  </TouchableOpacity>
                  <Text  style={[styles.sectionTitle,styles.topTitle]}>Détails Produit</Text> 

                  <TouchableOpacity onPress={() => navigation.navigate('BasketDetails')}>
                  {React.createElement(icons['Basket'], { width: 40,height: 40 })}
                      {basket.length > 0 && (
                      <View style={styles.badge}>
                          <Text style={styles.badgeText}>{basket.length}</Text>
                      </View>
                      )}
                  </TouchableOpacity>
              </View>     
            </View>

            <Animated.View style={[styles.container, { opacity }]}>
                <View style={styles.section}>
                    <View style={styles.productImageContainer}>
                    <Image source={item.src} resizeMode="contain" style={styles.productImage} />
                    </View>
                    <Text style={[styles.productTitle,{color:colors.primary}]}>{item.price} TND</Text>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>

                    {quantity ===0 ? (                
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={()=>addToBasket()}>
                          <Text style={styles.actionButtonText}>Ajouter au Panier</Text>
                        </TouchableOpacity>
                    </View>):

                    <Render_NumberProduct/>
                    }

                    <View style={styles.sectionHeader}>

                            <Text style={styles.sectionTitle}>Similar Products</Text>
                            <TouchableOpacity  onPress={() => navigation.navigate('StoreScreen')}>

                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.more}>Tous les produits </Text>
                            {React.createElement(icons['Arrowright'], { width:26 , height: 16, })}
                            </View>
                            </TouchableOpacity>

                    </View>

                    <FlatList
                        data={similarProducts}
                        renderItem={renderSimilarProduct}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.similarProductsList}
                    />

                </View>
            </Animated.View>
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

  section:{
    paddingHorizontal:20,
  },
  productImageContainer: {
    marginBottom: 16,
    backgroundColor: '#FDFDFD', 
    borderWidth:2,
    borderColor:'#E6E5FD',
    borderRadius:8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  productImage: {
    
    width: width/1.7,
    height: width/2,

  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    color:'#8C8C8C',
    fontSize: 16,
    marginBottom: 16,
  },

  

  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'white',
    fontWeight: 'regular',
  },

  
  ActionSheet_itemRow:{
    flexDirection:"row",
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginBottom:10,
  },
  ActionSheet_numberItem: {
    backgroundColor:colors.primary,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    width:32,
    height:32,
    borderRadius:16
  },
  ActionSheet_numberText: {
    fontSize: 16,
    fontWeight:'medium',
    color:'#fff',  
  },

  itemTextActionSheet: {
    marginHorizontal:10,
    fontSize: 12,
    fontWeight:'semibold',  
    marginHorizontal:15,
  },

  actionSheetButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  similarProductsList: {
    paddingVertical: 8,
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
  actionButtonProduct: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  productImage2: {
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
  productPrice: {
    fontSize: 14,
    marginRight:50,
    fontWeight: 'bold',
    color:'#5549EF'
  },


  

});



export default ProductDetailScreen;

