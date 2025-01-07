import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,FlatList,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';

const { width,height } = Dimensions.get('window');

const ClothesConfirmationScreen = ({ route,navigation }) => {

  const navigationGoBack = useNavigation();

    const {data1,numberArticale,totalPrice} = route.params;



    const [data, setData] = useState([]);

    useEffect(() => {
      const initialData  = data1
      // const initialData = [
      //   { id: '1' , category: 'Hauts' , title: 'T-Shirts', icon: 'TShirtsIcon', lavage_repassageNBR : 2 ,  lavage_SecNBR : 4, repassageNBR : 5 ,totalitem:10 ,totalitemPrice:0  , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '2' , category: 'Hauts' , title: 'Chemise', icon: 'ChemiseIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:10 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '3' , category: 'Hauts' , title: 'Pull', icon: 'PullIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '4' , category: 'Hauts' , title: 'Blouson', icon: 'BlousonIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      
      
      //   { id: '5' , category: 'Bas' , title: 'Jean', icon: 'JeanIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:20 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
      //   { id: '6' , category: 'Bas' , title: 'Short', icon: 'ShortIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
      //   { id: '7' , category: 'Bas' , title: 'Pantalon', icon: 'PantalonIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
      //   { id: '8' , category: 'Bas' , title: 'Jupe', icon: 'JupeIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
      
      //   { id: '9'  , category: 'Robes et Tenues', title: 'Robe', icon: 'RobeIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
      //   { id: '10' , category: 'Robes et Tenues', title: 'Pyjama', icon: 'PyjamaIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
      //   { id: '11' , category: 'Robes et Tenues', title: 'Maillot de bain', icon: 'Maillot_bainIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
      
      //   { id: '12' , category: 'Accessoires' , title: 'Echarpe', icon: 'EcharpeIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '13' , category: 'Accessoires' , title: 'Gants', icon: 'GantsIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '14' , category: 'Accessoires' , title: 'Chapeau', icon: 'ChapeauIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '15' , category: 'Accessoires' , title: 'Cravate', icon: 'CravateIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      
      //   { id: '16', category: 'Sous-vêtements' , title: 'Chaussettes', icon: 'ChaussettesIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '17', category: 'Sous-vêtements' , title: 'Sous-vêtements', icon: 'Sous_vetementsIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      
      //   { id: '18', category: 'Extérieur', title: 'Manteaux', icon: 'ManteauxIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      //   { id: '19', category: 'Extérieur', title: 'Veste', icon: 'VesteIcon', lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:10 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
      
      // ];
  
      // Filter the data where totalitem !== 0
      const filtered = initialData.filter(item => item.totalitem !== 0);
  
      // Store it in the state
      setData(filtered);
    }, []);

    const HandleConfimation = ()=>{
      navigation.navigate('InformationScreen',{
        dataConfirmation : data,
        numberArticale:numberArticale,
        totalPrice:totalPrice
  
      })
    }

    const render_item = ({item}) =>{

      return(
        <View>

          <View style={styles.itemRow}>


          {React.createElement(icons[item.icon], { width: 40, height: 40,stroke : colors.primary,strokewidth: 0.8 })}           


          <View>
            <Text  style={styles.itemText}>{item.title}</Text>
            {<Text  style={styles.itemPieceActionSheet}> Lavage / Repassage : {item.lavage_repassageNBR}</Text>}
            {<Text  style={styles.itemPieceActionSheet}> Lavage à sec : {item.lavage_SecNBR} </Text>}
            {<Text  style={styles.itemPieceActionSheet}> Repassage : {item.repassageNBR} </Text>}
          </View>

          <View style={styles.numberItem}>

              <View style={[styles.numberItem,item.totalitem === 0 && styles.numberItem_2]}>
                <Text style={[styles.numberText,item.totalitem === 0 && styles.numberText_2]}>
                {item.totalitem === 0 ? "+" : item.totalitem}
                </Text>

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
              <Text  style={[styles.sectionTitle,styles.topTitle]}>Confirmation des détails</Text>
            </View>

          <View style={styles.section1}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={render_item}
              scrollEnabled
            />
            </View>
              
            <View style={[styles.section2,{paddingHorizontal:10}]}>

                <View style={[styles.itemRow,{justifyContent:'space-between'}]}>
                        <Text  style={styles.itemText}>Livraison</Text>
                        <Text  style={styles.itemText}>7 DT</Text>
                        
                </View>
              
                <View style={styles.horizontalLine} />


                <View style={[styles.itemRow,{justifyContent:'space-between'}]}>       
                      <Text  style={styles.itemText}>Total à payer</Text>
                      <Text  style={[styles.itemText,{color:colors.primary}]}>{totalPrice} DT</Text>
                </View>


                <View style={[styles.itemRow,{justifyContent:'space-between'}]}>
                        <Text  style={styles.itemText}>Nombre d’articles</Text>
                        <Text  style={[styles.itemText,{color:colors.primary}]}>{numberArticale} </Text>
                </View>

            </View>


        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.actionButton,
          {borderColor:colors.primary,borderWidth:1}]} 
          onPress={HandleConfimation} >
            <Text style={styles.actionButtonText}>Confirmer ma commande</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
          style={[styles.actionButton,
          { backgroundColor: colors.background2,borderColor:colors.primary,borderWidth:1}]} 
          onPress={HandleConfimation} >
            <Text style={[styles.actionButtonText,{color:colors.primary}]}>Continuer mon panier</Text>
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
    // marginTop:30,
    paddingVertical:20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight :'semibold',
    color:colors.primary,
    // marginBottom: 10,
  },
  topTitle:{
    margin :"auto",
    // marginTop:5,
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
  itemText: {
    fontSize: 14,
    fontWeight:'bold',  
    marginHorizontal:15,
  },
  itemPieceActionSheet: {
    fontSize: 12,
    color:'#8C8C8C',
    fontWeight:'semibold',  
    marginHorizontal:15,
    marginVertical:1
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
    paddingVertical:30,
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
export default ClothesConfirmationScreen;