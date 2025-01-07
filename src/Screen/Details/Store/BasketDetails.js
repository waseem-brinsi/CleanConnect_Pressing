import React,{useState,useEffect,useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,FlatList,Dimensions,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import { BasketContext } from '../../../Context/BasketContext';

const { width,height } = Dimensions.get('window');
const BasketDetails = ({ navigation }) => {
  const navigationGoBack = useNavigation();
  const {basket,setBasket} = useContext(BasketContext);

    const increment = (item) => {
        console.log(item.id)
        console.log(basket)
        setBasket((prevBasket) =>
          prevBasket.map((it) =>
            it.id === item.id ? { ...it, quantity: item.quantity+1 } : it
          )
        );
      };
      
    
    
      const decrement = (item) => {
        if (item.quantity!==0) {
            setBasket((prevBasket) =>
                prevBasket.map((it) =>
                  it.id === item.id ? { ...it, quantity: item.quantity-1 } : it
                )
              );
        }
      };

      const Render_NumberProduct =({item}) =>{

        return(
            <View style={styles.ActionSheet_itemRow}>
                <View style={styles.ActionSheet_numberItem}>
                    <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={() => {decrement(item)}}>
                    <Text style={styles.ActionSheet_numberText}>-</Text>
                    </TouchableOpacity>     
                </View>
                
                <Text  style={styles.itemTextActionSheet}>{item.quantity}</Text>
            
                <View style={styles.ActionSheet_numberItem}>
                    <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={() => {increment(item)}}>
                        <Text style={styles.ActionSheet_numberText}>+</Text>
                    </TouchableOpacity>     
                </View>

            </View>
        )
    }

    const HandleConfimation = ()=>{
      navigation.navigate('InformationScreen')
    }

    const render_item = ({item}) =>{

      return(
        <View>
          <View style={styles.itemRow}>
          <View style={styles.productImageContainer}>
          <Image source={item.icon} resizeMode="contain" style={styles.productImage} />
        </View>
            <View>
                    <Text  style={styles.itemText}>{item.title}</Text>
                    <View style={styles.price_quantity}>
                        <Text  style={styles.itemPieceActionSheet}>{item.price}</Text>
                        <Render_NumberProduct item={item}/>
                    </View>
            </View>
          </View>
          <View style={styles.horizontalLine} />
        </View>

      );
    }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                {React.createElement(icons['Backarrow'], { width: 15, height: 15 ,stroke : colors.primary,strokewidth: 0.8 })}
            </TouchableOpacity>

            <View style={styles.header}>          
              <Text  style={[styles.sectionTitle,styles.topTitle]}>Détails Panier</Text>
            </View>


          <View style={styles.section1}>
            <FlatList
              data={basket}
              keyExtractor={(item) => item.id}
              renderItem={render_item}
              scrollEnabled
            />
            </View>
              
            <View style={[styles.section2,{paddingHorizontal:10}]}>
              
                <View style={[styles.itemRow,{justifyContent:'space-between'}]}>       
                      <Text  style={styles.itemText2}>Sous Total</Text>
                      <Text  style={[styles.itemText2,{color:colors.primary}]}>36 TND</Text>
                </View>

                <Text  style={[styles.itemText2,{color:"gray"}]}>
                        Frais de livraison non inclus à ce stade.
                </Text>
            </View>


      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={[styles.actionButton,
        {borderColor:colors.primary,borderWidth:1}]} 
        onPress={()=>navigation.navigate('StoreInfoPay')} >
           <Text style={styles.actionButtonText}> Commander </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
        style={[styles.actionButton,
        { backgroundColor: colors.background2,borderColor:colors.primary,borderWidth:1}]} 
        onPress={()=>navigation.navigate('StoreScreen')} >
           <Text style={[styles.actionButtonText,{color:colors.primary}]}> Continuer mes achats </Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical:20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight :'semibold',
    color:colors.primary,
  },
  topTitle:{
    margin :"auto",
    fontSize:16,
    fontWeight:"bold",
  },

  itemRow:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignContent:'center',
    alignItems:'center',
    marginBottom:10,
  },

  productImageContainer: {
    width: width/5,
    height : width/5,
    backgroundColor: '#FDFDFD', 
    borderWidth:2,
    borderColor:'#E6E5FD',
    borderRadius:8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  productImage: {
    width: width/4,
    height: width/5,
  },

  itemText: {
    width:width/2,
    fontSize: 14,
    fontWeight:'bold',  
    marginHorizontal:15,
  },

  itemText2: {
    fontSize: 14,
    fontWeight:'bold',  
    marginHorizontal:15,
  },

  price_quantity: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    marginVertical:10,
  },

  itemPieceActionSheet: {
    fontSize: 14,
    color:colors.primary,
    fontWeight:'bold',  
    marginHorizontal:15,
    marginVertical:1
  },



  ActionSheet_itemRow:{
    flexDirection:"row",
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    
  },
  ActionSheet_numberItem: {
    backgroundColor:colors.background,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    width:32,
    height:32,
    borderRadius:16
  },
  ActionSheet_numberText: {
    fontSize: 20,
    fontWeight:'medium',
    color:colors.primary,  
  },
  itemTextActionSheet: {
    marginHorizontal:10,
    fontSize: 12,
    fontWeight:'semibold',  
    marginHorizontal:15,
  },


  numberItem: {
    backgroundColor:colors.primary,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    width:32,
    height:32,
    borderRadius:16
  },

  numberItem_2: {
    backgroundColor:colors.background,
  },

  numberText: {
    fontSize: 16,
    fontWeight:'bold',
    color:'#fff', 
  },

  numberText_2: {
    fontSize: 20,
    fontWeight:'bold',
    color:colors.primary,  
  },
  horizontalLine: {
    height: 1, 
    backgroundColor: '#5549EF', 
    width: '100%', 
    marginVertical: 10,
  },
  section1:{
    height:height/2,
    marginHorizontal:20,
    paddingVertical:30,
    borderRadius:20,
    // marginVertical:20,
    backgroundColor:'#fff'
  },
  section2:{
    marginHorizontal:20,
    paddingVertical:10,
    borderRadius:16,
    marginVertical:20,
    backgroundColor:colors.background2
  },

  
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    backgroundColor: '#fff',
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

export default BasketDetails;
