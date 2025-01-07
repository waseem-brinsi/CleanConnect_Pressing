import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';


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




const HistoryDetailScreen = ({navigation,route}) => {

  const {item,similarProducts} = route.params;
  const navigationGoBack = useNavigation();
  



  


  const handlePress = (item,similarProducts) => {


    navigation.navigate('ProductDetailScreen',{item,similarProducts})
  };




  const renderGroup = ({ item }) => (
    <View style={styles.groupContainer}>
      <Text style={styles.priceText}>{item.title}</Text>
      <Text style={{ marginBottom:5 ,color:"#8C8C8C"}}>(2x) T-shirt / (2x) Pantalon</Text>
      
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

  const sections = [
    { id: '1', type: 'section1',data: item },
    { id: '2', type: 'section2',data: groupedData},
  ];


    
  const renderSectionSwitch = ({ item }) => {
    switch (item.type) {
      case 'section1':
        return (
          <View style={styles.section}>
              <View style={styles.card}>
                    
                      <View  style={styles.tt} >
                          <View >
                            <Text style={[styles.cardText,{color:'#000'}]}>{item.data.code}</Text>
                            <Text style={styles.cardText}>{item.data.date}</Text>
                          </View>
                            {console.log(item.data)}

                            <View style={[styles.encours,{backgroundColor:'#14DA32'}]}>
                                {React.createElement(icons['Terminee'], { width:14 , height: 22,marginRight:5 })}
                                <Text style={[styles.categoryText , styles.categoryTextselected]}>Terminée</Text>
                            </View>
                      </View>


                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.cardText}>Pressing : </Text>
                        <Text style={[styles.cardText,{color:'#000'}]}>{item.data.pressing}</Text>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.cardText}>Livreur : </Text>
                        <Text style={[styles.cardText,{color:'#000'}]}>{item.data.livreur}</Text>
                      </View>


                          <View style={styles.horizontalLine} />
                          <Text style={styles.cardText}>Adresse et date de récupération</Text>
                          <Text style={[styles.cardText,{color:'#000',marginBottom:20}]}>03 rue de Tunis   Le 12/02/2024</Text>

                          <Text style={styles.cardText}>Adresse et date  de livraison</Text>
                          <Text style={[styles.cardText,{color:'#000'}]}>03 rue de Tunis   Le 12/02/2024</Text>

                          
                          <View style={styles.line}>
                            <Text style={[styles.priceText,{color:"#8C8C8C"}]}>Nombre d'articles</Text>
                            <Text style={[styles.priceText,{color:"#000"}]}>{item.data.price} Piéces</Text>
                          </View>

                          <View style={styles.horizontalLine} />
                          
                          <View style={styles.line}>
                          <Text style={[styles.cardText,{color:'#000',fontSize:16}]}>Totale</Text>
                          
                            <View style={[styles.encours,{backgroundColor:colors.primary}]}>
                              <Text style={[styles.categoryText , styles.categoryTextselected]}>{item.data.price} DT</Text>
                            </View>
                          </View>
              </View>
          </View>
      );
      case 'section2':
        return (
          <View style={styles.section}>
          <View style={styles.card}>
    
            <Text style={[styles.cardText,{color:'#000'}]}>Mes Articles (10)</Text>
            <FlatList
              data={groupedData}
              keyExtractor={(group) => group.title}
              renderItem={renderGroup}

            />
    
          </View>

        </View>
      ); 
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
       

        <View style={styles.container}>

              <View style={styles.header}>  
                  <View style={styles.top}>
                      <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                          {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
                      </TouchableOpacity>
                      <Text  style={[styles.sectionTitle,styles.topTitle]}>Détails CM001</Text> 
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

cardText: {
  fontSize: 12,
  marginBottom:10,
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
      marginBottom: 20,
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

export default HistoryDetailScreen;