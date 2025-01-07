import React, { useState ,useEffect,useContext } from 'react';
import { View, Text, FlatList,ImageBackground, TouchableOpacity, StyleSheet,Dimensions,Image,Animated} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import { BookmarkContext } from '../../../Context/BookmarkContext';
import { Ionicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

const articlesData = [
  { id: '1',title: 'Prolongez la durée de vie de vos vêtements',discreption:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/clothes.webp') },
  { id: '2',title: 'Prolongez la durée de vie de vos vêtements',discreption:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/wash-a-house.jpg') },
  { id: '3',title: 'Prolongez la durée de vie de vos vêtements',discreption:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../../assets/images/carwash.webp') },
];


const ArticleDetailScreen = ({navigation,route}) => {

  const article = {
    subtitle: 'Sample Article Article Article',
    image: 'https://via.placeholder.com/150',
    content: 'This is a sample article content.',
    likes: 10,
  };

  const {item} = route.params;
  const navigationGoBack = useNavigation();
  const {bookmark,setBookmark} = useContext(BookmarkContext);
  const [opacity] = useState(new Animated.Value(0)); 
  

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(article.likes);


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

 

  const handleImagePress = (item) => {
    startTransition();
    navigation.navigate('ArticleDetailScreen',{item:item})
  };
 

  const addToBookmark = () => {
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

    <View style={styles.cardArtical}>
      <View style={styles.image_bookmark}>
      <TouchableOpacity  onPress={() => handleImagePress(item)}>

          <TouchableOpacity style={styles.bookmarkIcon} onPress={()=>addToBookmark(item)}>
            {React.createElement(icons['Bookmark'], { width:14 , height: 22, marginRight:5 })}
          </TouchableOpacity>
        
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
              <Text style={styles.cardDiscreption}>{item.discreption}</Text>
          </TouchableOpacity>

  
          
      </View>
      
  </View>


  );

const handleLike = () => {
  setIsLiked(!isLiked);
  setLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1));
};
const sections = [
  { id: '1', type: 'article',data: item },
  { id: '2', type: 'articleSuggestion', data: articlesData},
];


const renderSection = ({ item }) => {
  switch (item.type) {
    case 'article':
      return (
        <View style={styles.section}>
                  
        <Text style={styles.productTitle}>{item.data.title}</Text>
            <View style={styles.image_bookmark}>

            <TouchableOpacity style={styles.bookmarkIcon} onPress={() => addToBookmark()}>
              {React.createElement(icons['Bookmark'], { width:14 , height: 22, marginRight:5 })}
            </TouchableOpacity>
              <View style={styles.blackOverlay}></View>
            <TouchableOpacity  onPress={() => handleImagePress(item)}>

              <ImageBackground
              source={item.data.src} 
              style={styles.cardImageArticale}
              imageStyle={styles.imageBorderRadius}
              >
              <View style={styles.overlay} />
              </ImageBackground>

            </TouchableOpacity>
            </View>
          <View>
            
           </View>
              
            <View style={[{flexDirection:"row",justifyContent:"space-between",marginBottom:10}]}>

                  <Text style={styles.productTitle}>{article.subtitle}</Text>

                  <View style={styles.likeContainer}>

                   
                      <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
                        <Ionicons
                          name={isLiked ? 'thumbs-up-sharp' : 'thumbs-up-sharp'}
                          size={24}
                          color={isLiked ? colors.primary : 'gray'}
                        />
                      </TouchableOpacity>
                      <Text style={styles.likeCount}>{likes}</Text>


                  </View>

            </View>

            
            <View  style={[{marginBottom:10}]} >
              <Text style={[{fontWeight:"bold",fontSize:16}]}>Lavez moins fréquemment :</Text>
              <Text>Chaque lavage use les fibres de vos vêtements. 
              À moins qu'ils ne soient réellement sales, essayez de porter vos vêtements
              plusieurs fois avant de les laver.</Text>
            </View>

            <View style={[{marginBottom:10}]}>
              <Text style={[{fontWeight:"bold",fontSize:16}]}>Lavez moins fréquemment :</Text>
              <Text>Chaque lavage use les fibres de vos vêtements. 
              À moins qu'ils ne soient réellement sales, essayez de porter vos vêtements
              plusieurs fois avant de les laver.</Text>
            </View>

            <View style={[{marginBottom:10}]}>
              <Text style={[{fontWeight:"bold",fontSize:16}]}>Lavez moins fréquemment :</Text>
              <Text>Chaque lavage use les fibres de vos vêtements. 
              À moins qu'ils ne soient réellement sales, essayez de porter vos vêtements
              plusieurs fois avant de les laver.</Text>
            </View>

            <View style={[{marginBottom:10}]}>
              <Text style={[{fontWeight:"bold",fontSize:16}]}>Lavez moins fréquemment :</Text>
              <Text>Chaque lavage use les fibres de vos vêtements. 
              À moins qu'ils ne soient réellement sales, essayez de porter vos vêtements
              plusieurs fois avant de les laver.</Text>
            </View>

             


             </View>
         
      );

    case 'articleSuggestion':
      return (
        <View style={styles.section}>

            <View style={styles.sectionHeader}>

                  <Text style={styles.sectionTitle}>Articales</Text>
                  <TouchableOpacity  onPress={() => navigation.navigate('ArticleScreen')}>

                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.more}>Voir Plus </Text>
                  {React.createElement(icons['Arrowright'], { width:26 , height: 16, })}
                  </View>
                  </TouchableOpacity>
            </View>

            <FlatList
              // ref={flatListRef}
              data={item.data}
              renderItem={renderArticaleItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            />
        </View>
      );
    default:
      return null;
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity }]}>

        <View style={styles.container}>
          
            <View style={styles.header}>  
              <View style={styles.top}>
                  <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                      {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
                  </TouchableOpacity>
                  <Text  style={[styles.sectionTitle,styles.topTitle]}>Détails Article</Text> 

                  <TouchableOpacity style={styles.Bookmark} onPress={() => navigation.navigate('BookmarkDetails')}>
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
      // contentContainerStyle={styles.container}
    />

           

      </View>
      </Animated.View>
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

  Bookmark: {
    width: 40,
    height:40,
    borderRadius:20,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 50% opacity
    borderRadius:6,
  },

  cardImageArticale: {
    width: width/1.2,
    height: width/2, 
    justifyContent: 'center',
    alignItems: 'center',
    margin : 10,
    borderRadius: 6, // Optional: This will crop the container view
    overflow: 'hidden',
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
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#555',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    marginRight: 8,
  },
  likeCount: {
    fontSize: 16,
    color: '#333',
  },
  
cardArtical: {
  borderRadius: 6,
  width: width - 130,
  backgroundColor:'#FDFDFD',
  borderWidth:2,
  borderColor:'#E6E5FD',
  margin: 8,
},

imageBorderRadius: {
  borderRadius: 6, 
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

export default ArticleDetailScreen;