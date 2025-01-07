import React, { useContext, useState  } from 'react';
import { View, Text,FlatList,ImageBackground, TouchableOpacity, StyleSheet,Dimensions,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import CustomModal from '../../../components/CustomModal';
import { BookmarkContext } from '../../../Context/BookmarkContext';

const initialData = [
  
  { id: '1', rating: 'popular', like:3, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/clothes.webp') },
  { id: '2', rating: 'popular', like:5, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/wash-a-house.jpg') },
  { id: '3', rating: 'popular', like:9, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/carwash.webp') },
  
  { id: '4', rating: 'popular', like:10, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/clothes.webp') },
  { id: '5', rating: 'recent', like:30, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/wash-a-house.jpg') },
  { id: '6', rating: 'recent', like:56, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/carwash.webp') },

  { id: '7', rating: 'recent', like:7, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/clothes.webp') },
  { id: '8', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/wash-a-house.jpg') },
  { id: '9', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/carwash.webp') },

  { id: '10', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/clothes.webp') },
  { id: '11', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/wash-a-house.jpg') },
  { id: '12', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/carwash.webp') },

  { id: '13', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/clothes.webp') },
  { id: '14', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/wash-a-house.jpg') },
  { id: '15', rating: 'recent', like:6, title: 'Prolongez la durée de vie de vos vêtements',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/carwash.webp') },

]




const { width,height } = Dimensions.get('window');


const ArticleScreen = ({navigation}) => {

  const navigationGoBack = useNavigation();
  const [data, setData] = useState(initialData);
  
  const {bookmark, setBookmark } = useContext(BookmarkContext);

  const [modalVisible, setModalVisible] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);




  const groupByRating = (data) => {
    const groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.rating]) {
        groupedData[item.rating] = [];
      }
      groupedData[item.rating].push(item);
    });
    return Object.entries(groupedData);
  };

  const filterData = () => {

    if (selectedCategories.length === 0 || selectedCategories.includes('All')) {
      return groupByRating(data);
    }

    const filteredData = data.filter(item => selectedCategories.includes(item.rating));
    return groupByRating(filteredData);
  };

  const handleImagePress = (item) => {
    navigation.navigate('ArticleDetailScreen',{item:item})
  }

  const addToBookmark = (item) => {
    const itemExists = bookmark.some(it => it.id === item.id);
  
    if (itemExists) {
      
      setBookmark(prevBookmark =>
        prevBookmark.map(it =>
          it.id === item.id
            ? { ...it, quantity: it.quantity + 1 }
            : it
        )
      );
    } else {
     
      setBookmark([...bookmark, { ...item, quantity: 1 }]);
    }
  

  };

  const renderArticaleItem = ({ item }) => (

    <View style={styles.card}>
      <View style={styles.image_bookmark}>

          <TouchableOpacity style={styles.bookmarkIcon} onPress={()=>addToBookmark(item)}>
            {React.createElement(icons['Bookmark'], { width:14 , height: 22, marginRight:5 })}
          </TouchableOpacity>
            <View style={styles.blackOverlay}></View>
          <TouchableOpacity  onPress={() => handleImagePress(item)}>

            <ImageBackground
            source={item.src} 
            style={styles.cardImage}
            imageStyle={styles.imageBorderRadius}
            >
            <View style={styles.overlay} />
            </ImageBackground>

        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.title_like}>

        <TouchableOpacity onPress={() => handleImagePress(item)}> 
        <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLike(item)}>
        {React.createElement(icons['Like'], { width:15 , height: 15,marginTop:3})}
        </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={() => handleImagePress(item)}>
              <Text style={styles.cardDiscreption}>{item.description}</Text>
          </TouchableOpacity>
      </View>
  </View>
  );


  const renderArticaleItem2 = ({ item }) => (

    <View style={styles.card2}>
      <View style={styles.image_bookmark}>

          <TouchableOpacity style={styles.bookmarkIcon} onPress={()=>addToBookmark(item)}>
            {React.createElement(icons['Bookmark'], { width:14 , height: 22, marginRight:5 })}
          </TouchableOpacity>
            <View style={styles.blackOverlay}></View>
          <TouchableOpacity  onPress={() => handleImagePress(item)}>

            <ImageBackground
            source={item.src} 
            style={styles.cardImage2}
            imageStyle={styles.imageBorderRadius}
            >
            <View style={styles.overlay} />
            </ImageBackground>

        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.title_like}>

        <TouchableOpacity onPress={() => handleImagePress(item)}> 
        <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLike(item)}>
        {React.createElement(icons['Like'], { width:15 , height: 15,marginTop:3})}
        </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={() => handleImagePress(item)}>
              <Text style={styles.cardDiscreption}>{item.description}</Text>
          </TouchableOpacity>
      </View>
  </View>
  );

  const sections = [
    { id: '1', type: 'section1'},
    { id: '2', type: 'section2'},
  ];

  console.log(bookmark);
  console.log(filterData()[0][1])

  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'section1':
        return (
          <View style={styles.section}>
          <Text style={styles.itemTitle}>Astuces Populaires</Text>
          <FlatList
          data={filterData()[0][1]}
          renderItem={renderArticaleItem}
          keyExtractor={(item) =>  item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          />
        </View>
        );

      case 'section2':
        return (
          <View style={styles.section2}>
          <Text style={styles.itemTitle}>Astuces Récents</Text>
          <FlatList
              data={filterData()[1][1]}
              renderItem={renderArticaleItem2}
              keyExtractor={(item) =>  item.id}
              numColumns={1}
          />
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
              <Text  style={[styles.sectionTitle,styles.topTitle]}>Astuces</Text> 
              <TouchableOpacity  style={styles.Bookmark} onPress={() => navigation.navigate('BookmarkDetails')}>
                      {React.createElement(icons['Bookmark'], { width: 20,height: 20 })}
                          {bookmark.length > 0 && (
                          <View style={styles.badge}>
                              <Text style={styles.badgeText}>{bookmark.length}</Text>
                          </View>
                          )}
              </TouchableOpacity>  
          </View> 

        </View>

        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.id}
        />

      </View>
      
      <CustomModal
        navigation={navigation}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setModalVisible={setModalVisible}
        title="Devenir Partenaire ?"
        description="Vous vendez des produits de nettoyage 
        ou de soin pour textiles ? Contactez-nous pour proposer vos 
        produits dans notre boutique."
        button1="Commencer"
        button2="Annuler"
      />

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
    paddingTop:20,
    paddingBottom:10,
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

  Bookmark: {
    width: 40,
    height:40,
    borderRadius:20,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary
  },


  section: {
    paddingTop :10,
  },

  section2: {
   width :width,
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
  categoryTextselected: {
    color:'#fff',
    fontWeight:'bold',
   
  },

  item: {
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 10
  },

  itemTitle: {
    fontSize: 16,
    fontWeight:'bold',
    paddingLeft :15,
    marginVertical:10
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


card: {
  borderRadius: 6,
  width: width - 130,
  backgroundColor:'#FDFDFD',
  borderWidth:2,
  borderColor:'#E6E5FD',
  margin: 8,
},

card2: {
  borderRadius: 6,
  width: width/1.05,
  backgroundColor:'#FDFDFD',
  borderWidth:2,
  borderColor:'#E6E5FD',
  margin: 8,
},

image_bookmark:{
  position: 'relative', 
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
cardImage2: {
  width: width/1.12,
  height: width/3, 
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

});



export default ArticleScreen;

