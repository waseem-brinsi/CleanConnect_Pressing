import React, { useRef, useEffect,useContext, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList, Dimensions,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionSheet from 'react-native-actions-sheet';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import  ConfirmeButton from '../../components/ConfirmeButton';
import  CancelButton from '../../components/CancelButton';

const { width ,height} = Dimensions.get('window');


const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;
const SPACING = 5;
const screenWidth = Dimensions.get('window').width;
const numColumns = 2; 

splitScreen = 1.9;
const margin = 10; 
const padding20 =20;
const itemWidth = (screenWidth / splitScreen); 
const itemheight = (screenWidth / 7); 

// Data
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
const products = [
  { id: '1' , state: 'En cours',trajet:'Livraison', code:'CM001',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '2' , state: 'En cours',trajet:'Récuperation', code:'CM001',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '3' , state: 'New',trajet:'Livraison', img:'Livreur', code:'CM013',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '4' , state: 'New',trajet:'Récuperation', img:'Recepteur',code:'CM013',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 }
];
const New2 = [
  { id: '1' , state: 'New',trajet:'Livraison', img:'Livreur', code:'CM013',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '2' , state: 'New',trajet:'Récuperation', img:'Recepteur', code:'CM013',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '3' , state: 'New',trajet:'Livraison', img:'Livreur', code:'CM013',date:'2025-01-04T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 },
  { id: '4' , state: 'New',trajet:'Récuperation', img:'Recepteur', code:'CM013',date:'2025-01-03T08:25:30.000Z',pressing:'Laundry Pressing',firstName:'Ahmed', lastName:'Ahmed ',price:12,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', adresseL:'03 rue de Tunis , Tunisie' ,dateL:'2024-11-01T08:25:30.000Z',nbrArticale:11 }
];

const New = products.filter(product => product.state === 'New');
const Encours = products.filter(product => product.state === 'En cours');
const servicesData = [
  { id: '1', title: '360 DT  Revenu Total', span: 1, icon: 'Pig1', navigateTo:'Portfeuil'},
  { id: '2', title: '35 Commandes',  span: 1, icon: 'List', navigateTo: 'Historiques'},
];

const HomeScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Nettoyage');
    const actionSheetRef = useRef();
  

  const handle_ServicePress = (servicesData) => {
    switch (servicesData.navigateTo) {
      case 'Portfeuil':
        navigation.navigate('Portfeuil');
        break;
      case 'Historiques':
        navigation.navigate('Historiques');
        break;
      default:
        console.log('Unknown navigation target:', servicesData.navigateTo);
    }
  };

  const renderIcon = (state) => {
    switch (state) {
      case 'New':
        return (
          <View >
              {React.createElement(icons['TimeCounter'], { width:30 , height: 30,marginRight:5 })}
          </View>
      );
      case 'En cours':
        return (
          <View style={styles.encours}>
              {React.createElement(icons['Encours'], { width:14 , height: 22,marginRight:5 })}
              <Text style={[styles.StateText , styles.StateText]}> En cours</Text>
          </View>
      ); 
      default:
        return React.createElement(icons['Encours'], { width:14 , height: 22,marginRight:5 });
    }
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handle_ServicePress(item)}>
      <View style={[styles.itemContainerService, { width: (item.span * itemWidth )-margin-6-20}]}>
      <View style={styles.iconTextContainerService}>
          {React.createElement(icons[item.icon], { width:36 , height: 36, marginRight:5 })}

          <Text style={styles.titleService}>
            {item.title}
          </Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  const renderCard = ({ item }) => (

    <View style={styles.card}>
    

{item.state === "En cours" &&(
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
    )}
{item.state === "New" &&(
      <View style={styles.actionButtonProduct}>
        <View style={styles.rowimage}>
          <View style={styles.image2}>
          {React.createElement(icons[item.img],{width:40,height:40})}
          </View>

              <View style={styles.Rightpart} >
                      <View  style={styles.tt1} >
                          <Text style={[styles.cardText,{color:colors.primary}]}>Trajet de {item.trajet} {item.code}</Text>
                            <TouchableOpacity onPress={ showActionSheet }>
                                {renderIcon(item.state)}
                            </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                                {React.createElement(icons['Map2'],{width:15,height:15})}
                                {/* <Text style={[styles.cardText]}> Livrée eéstimé le:</Text> */}
                                <Text style={[styles.cardText,{color:colors.primary}]}> P:</Text>
                               
                                <Text style={[styles.cardText,{color:'#000'}]}> {item.adresseL}</Text>
                      </View>
                      <View style={styles.row}>
                                {React.createElement(icons['Map2'],{width:15,height:15})}
                                {/* <Text style={[styles.cardText]}> Livrée eéstimé le:</Text> */}
                                <Text style={[styles.cardText,{color:colors.primary}]}> C:</Text>
                               
                                <Text style={[styles.cardText,{color:'#000'}]}> {item.adresseL}</Text>
                      </View>

                      <View style={styles.row}>
                            {React.createElement(icons['Calender'],{width:15,height:15})}
                            <Text style={[styles.cardText,{color:'#000'}]}> Le {item.dateL}</Text>
                      </View>


                      <View style={{flexDirection:'row'}}>
                        
                                      <ConfirmeButton ConfirmeText={'Accepter'}  style={{flex:1}}></ConfirmeButton>
                                      <CancelButton CancelText={'Refuser'} style={{flex:1}}></CancelButton>
                      </View>
              </View>
        </View>
      </View>
    )}
    </View>
  );

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

  const sections = [
    { id: '1', type: 'section1'},
    { id: '2', type: 'section2'}
  ];

  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'section1':
        return (
          <View style={styles.containerColor }>
          <View style={styles.header}>    
          {React.createElement(icons['Cclogo'], { width:40 , height: 40 })}
            <View style={styles.store_ringContainner}>
              {React.createElement(icons['Notification'], { width:36 , height: 36 })}
            </View>
          </View>

            <Text style={styles.title}>Bienvenue ,LAUNDRY !</Text>
            <Text style={styles.subtitle}>Prête pour un service rapide et efficace ?</Text>

          <FlatList
          data={servicesData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={numColumns}
        />

</View>

        );
      case 'section2':
        return (
          <View style={styles.section}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[selectedTab === 'Nettoyage' && styles.activeTab]}
                  onPress={() => setSelectedTab('Nettoyage')}
                >
                  <Text 
                  style={[selectedTab === 'Nettoyage' && styles.tabTextSelected]}
                  >Acceuil</Text>
                </TouchableOpacity> 
    
                <TouchableOpacity
                  style={[styles.tabButton, selectedTab === 'Boutique' && styles.activeTab]}
                  onPress={() => setSelectedTab('Boutique')}
                >
                  <Text
                  style={[selectedTab === 'Boutique' && styles.tabTextSelected]}
                  >Nouveaux trajets</Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={[styles.tabButton, selectedTab === 'En cours' && styles.activeTab]}
                  onPress={() => navigation.navigate('Historiques')}
                >
                  <Text
                  style={[selectedTab === 'En cours' && styles.tabTextSelected]}
                  >trajets En cours</Text>
                </TouchableOpacity>
            </View>
  
          {selectedTab === 'Nettoyage' && (
                  <View>
                  <Text style={styles.subtitle}>Statistiques</Text>
  
                  <View style={styles.row1} >
                          <View style={styles.item}>
                              <Text  style={[styles.statText,{color:colors.primary,fontSize:14}]}>02</Text>
                              <Text  style={styles.statText}>Nouveaux trajets</Text>
                          </View>
        
                          <View style={styles.item}>
                              <Text  style={[styles.statText,{color:colors.primary,fontSize:14}]}>02</Text>  
                              <Text  style={styles.statText} >Nouveaux trajets</Text>
                          </View>
        
                          <View style={styles.item}>
                          <Text  style={[styles.statText,{color:colors.primary,fontSize:14}]}>02</Text>
                              <Text  style={styles.statText}>Nouveaux trajets</Text>
                          </View>
        
                          <View style={styles.item}>
                              <Text  style={[styles.statText,{color:colors.primary,fontSize:14}]}>02</Text>
                              <Text  style={styles.statText}>Nouveaux trajets</Text>
                          </View>
  
                  </View>
  
                  <Text style={styles.subtitle}>Nouveaux trajets</Text>
                      <FlatList
                          data={New}
                          keyExtractor={(item) => item.id}
                          renderItem={renderCard}
                        />

                  
                  <Text style={styles.subtitle}>trajets en cours</Text>
                      <FlatList
                                data={Encours}
                                keyExtractor={(item) => item.id}
                                renderItem={renderCard}
                                // contentContainerStyle={styles.listContainer}
                              />
                  </View>
          )}
          {selectedTab === 'Boutique' && (
            <View>
                  <FlatList
                      data={New2}
                      keyExtractor={(item) => item.id}
                      renderItem={renderCard}
                      // contentContainerStyle={styles.listContainer}
                    />
            </View>
          )} 
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}> 
    <View style={styles.container}>     

    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      />
    
    <ActionSheet ref={actionSheetRef}>
      <View style={styles.sheetContent}>    
          <Text style={[styles.sheetcardText,{color:'#000'}]}>Mon Panier (10 Piéces)</Text>
          <FlatList
            data={groupedData}
            keyExtractor={(group) => group.title}
            renderItem={renderGroup}
          />  
                  
          <Text style={styles.priceText}>Note</Text>
          <Text >Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Phasellus mollis consequat bibendum. 
          Donec tellus nibh, tristique in ligula eget, facilisis mattis neque. </Text> 

        <View style={{flexDirection:'row',marginTop:10}}>
            <ConfirmeButton ConfirmeText={'Accepter'} style={{flex:1}}></ConfirmeButton>
            <CancelButton CancelText={'Refuser'} style={{flex:1}}></CancelButton>
      </View>

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
    backgroundColor: "#fff",
    
  },
  containerColor:{
    backgroundColor:'#EDECFF',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  store_ringContainner:{
    flexDirection:'row',
  },
  title: {
    fontSize: 21,
    fontWeight: '900',
    color:'#000'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#000',
    marginVertical: 10,
  },
  actionButtonProduct: {
    padding: 10,
  },
  rowimage: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',

  },
  image2: {
    width:width*0.2,
    height:width*0.4,
    borderRadius:12,
    marginRight:8,
    backgroundColor:"#fff",
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
  },
  Rightpart: {
    width:width*0.6,
    // justifyContent:'space-around',

    alignItems:'baseline',
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
  tt1:{
      width:width*0.6,
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'space-between',
      alignItems:'center',
      marginBottom:20
    },
    tt:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'space-between',
      alignItems:'center',
      marginBottom:20
    },
  cardText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8C8C8C', 
  },
  cardText2: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary, 
  },
  cercle:{
    width:width*0.08,
    height:width*0.08,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:colors.background,
  },
  item:{
    width:width*0.2,
    height:width*0.15,
    padding:5,
    fontSize:12,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:8,
    backgroundColor:colors.background2
  },
  statText: {
    fontSize: 12,
    fontWeight:'bold',
    textAlign:'center',
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
  StateText:{
      fontWeight:"bold",
      color:colors.white,
    },
  row1:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  row:{
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    marginBottom:10
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    alignContent:'center',
    paddingVertical: 10,
  },

  tabButton: {
    height: height/20,
    paddingHorizontal:10,
    fontSize:12,
    fontWeight:"regular",
    borderRadius: 8,
    marginRight: 10,
    justifyContent:'center',
  },
  tabTextSelected: {
    color:colors.primary,
    fontWeight:'bold',
    textDecorationLine:"underline"
  },
  tabText: {
    fontWeight:"bold",
    color:'#000',
    textAlign: 'center',
  },



// grid section css
itemContainerService: {
 
    marginRight: margin, // Adjust margin to fit items
    marginBottom: margin, 
    height: itemheight, // Make the item square
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14, // Optional: to style the image itself
    backgroundColor: '#5549EF'
  },

  iconTextContainerService:{
 
    flexDirection: 'row',
    alignItems: 'center',
    padding:10 
  },
  
  titleService: {
    width: width/5 ,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff', 
    marginLeft: 1 ,
    marginBottom: 5, 
  },
image_bookmark:{
  position: 'relative', // For positioning the basket icon absolutely
  overflow: 'hidden',
},

bookmarkIcon:{
  position: 'absolute',
  top: 16,
  right: 20,
  zIndex: 2, // Ensure it appears above other content
},

overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black with 50% opacity
  borderRadius:6,
},

cardImage: {
  width: width/1.6,
  height: width/4, 
  justifyContent: 'center',
  alignItems: 'center',
  margin : 10,
  borderRadius: 6, // Optional: This will crop the container view
  overflow: 'hidden',
},
imageBorderRadius: {
  borderRadius: 6, // Apply borderRadius to the image itself
},
cardContent: {
  padding: 10,
},

title_like: {
  flexDirection:'row',
  justifyContent:'space-between',
  marginBottom: 10,
},

cardTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  width : width/2
},
cardDiscreption: {
  color:'#8C8C8C',
  fontSize: 12,
  fontWeight: 'medium',
  marginBottom: 10,
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



  section: {
    paddingHorizontal :padding20,
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
  containerTestimonial: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  },
  itemContainerTestimonial: { 
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 2,
    marginVertical:20,
    padding: 16,
    paddingTop:40,
    paddingBottom:40,
    backgroundColor: '#E6E5FD',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageTestimonial: {
    width: 86,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth:2,
    borderColor:'#5549EF',
  },

  testimonialText: {
    fontSize: 12,
    fontWeight:'regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },

  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  nameTextTestimonial: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
    priceText: {
      fontSize: 14,
      marginBottom:5,
      fontWeight: 'bold',
      color: colors.primary
    },

  columnWrapper: {
    justifyContent: 'space-between',
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

export default HomeScreen;
