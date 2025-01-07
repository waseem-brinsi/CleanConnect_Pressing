import React, { useRef, useEffect,useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert,Image,TouchableOpacity,Animated, FlatList, Dimensions,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; 
import icons from '../../svg/svgLoader';
import { BookmarkContext } from '../../Context/BookmarkContext';
import { BasketContext } from '../../Context/BasketContext';

const { width } = Dimensions.get('window');







// Get the screen width to calculate the item size


const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;
const SPACING = 5;

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name={i <= rating ? 'star' : 'star-o'}
        size={16}
        color="#5549EF" // Gold color for stars
        style={{ marginRight: 4 }}
      />
    );
  }
  return <View style={styles.starsContainer}>{stars}</View>;
};




const screenWidth = Dimensions.get('window').width;

const numColumns = 2; 

splitScreen = 1.9;
const margin = 10; 
const padding20 =20;
const itemWidth = (screenWidth / splitScreen); 
const itemheight = (screenWidth / 7); 

// Data



const servicesData = [
  { id: '1', title: 'Nettoyage Vétements', span: 1, icon: 'VetementService', navigateTo:'ClothesDetail'},
  { id: '2', title: 'Nettoyage à domicile',  span: 1, icon: 'VoitureService', navigateTo: 'Domicile'},
  { id: '3', title: 'Lavage de Voitures',  span: 1, icon: 'DomicileService', navigateTo: 'Voitures'},
  { id: '4', title: 'Collecte vétemets',  span: 1, icon: 'CollectService', navigateTo: 'Vetemets'},

];

const articlesData = [
  { id: '1',title: 'Prolongez la durée de vie de vos vêtements',discreption:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../assets/images/clothes.webp') },
  { id: '2',title: 'Prolongez la durée de vie de vos vêtements',discreption:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../assets/images/wash-a-house.jpg') },
  { id: '3',title: 'Prolongez la durée de vie de vos vêtements',discreption:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.' , src: require('../../../assets/images/carwash.webp') },
];

const boutiqueData = [
  { id: '1', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'), navigateTo: 'ClothesDetail' },
  { id: '2', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'),  navigateTo: 'ClothesDetail' },
  { id: '3', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'),  navigateTo: 'ClothesDetail' },
  { id: '4', title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L',description:'Conseils pratiques pour garder vos vêtements en excellent état plus longtemps.', price: '12.500 DT', src: require('../../../assets/images/product/judy.png'),  navigateTo: 'ClothesDetail' }
];

const testimonialData = [
  {testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed molestie erat. Nam in pretium ipsum. Pellentesque tempor, nulla non pulvinar malesuada.", name: "John Doe", image: "https://randomuser.me/api/portraits/men/1.jpg", rating: 5,},
  {testimonial: "Fantastic service and friendly staff.", name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/1.jpg", rating: 4,},
  {testimonial: "Highly recommend this to anyone!", name: "Michael Johnson", image: "https://randomuser.me/api/portraits/men/2.jpg", rating: 5,},
  {testimonial: "This product is amazing! It has changed my life.", name: "John Doe", image: "https://randomuser.me/api/portraits/men/1.jpg", rating: 3,},
  {testimonial: "Fantastic service and friendly staff.", name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/1.jpg", rating: 1,},
  {testimonial: "Highly recommend this to anyone!", name: "Michael Johnson", image: "https://randomuser.me/api/portraits/men/2.jpg", rating: 2,},
  // Add more testimonials as needed
];


const HomeScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {bookmark, setBookmark } = useContext(BookmarkContext);
  const {basket,setBasket} = useContext(BasketContext);

  const scrollX = useRef(new Animated.Value(0)).current; //this is for testimonial

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % articlesData.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleImagePress = (item) => {
    navigation.navigate('ArticleDetailScreen',{item:item})
  };

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

  const handleLike = (image) => {
    console.log('Like pressed');
  };


  const handle_ServicePress = (servicesData) => {
    switch (servicesData.navigateTo) {
      case 'ClothesDetail':
        navigation.navigate('ClothesDetail');
        break;
      case 'Domicile':
        Alert.alert("Coming Soon", "This feature is under development!");
        break;
      case 'Voitures':
        Alert.alert("Coming Soon", "This feature is under development!");
        break;
      case 'Vetemets':
        Alert.alert("Coming Soon", "This feature is under development!");
          break;
      default:
        console.log('Unknown navigation target:', servicesData.navigateTo);
    }
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

  const renderArticaleItem = ({ item }) => (

    <View style={styles.card}>
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
    { id: '1', type: 'header' },
    { id: '2', type: 'articles', data: articlesData},
    { id: '3', type: 'boutique', data: boutiqueData },
    { id: '5', type: 'testimonial', data: testimonialData },
  ];


  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.containerColor }>
            <View style={styles.header}>
            {React.createElement(icons['Cclogo'], { width:40 , height: 40 })}
              <View style={styles.store_ringContainner}>

                {React.createElement(icons['Store'], { width:36 , height: 36, marginRight:5 })}
                
                {React.createElement(icons['Notification'], { width:36 , height: 36 })}
              </View>
            </View>

            <Text style={styles.title}>Bienvenue , Hatira !</Text>
            <Text style={styles.subtitle}>Prête pour un service rapide et efficace ?</Text>

            <FlatList
            data={servicesData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
          />
          </View>
        );

      case 'articles':
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
                ref={flatListRef}
                data={item.data}
                renderItem={renderArticaleItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              />
          </View>
        );

      case 'boutique':
        return (
          <View style={styles.section}>


          <View style={styles.sectionHeader}>

              <Text style={styles.sectionTitle}>Boutique</Text>
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
            numColumns={numColumns}
          />

        </View>
        );

      case 'testimonial':
        return (
          <View style={{marginBottom:100}}>
          <View style={[styles.section]}>


            <View style={styles.sectionHeader}>

                <Text style={styles.sectionTitle}>Avis clients</Text>
                <TouchableOpacity  onPress={() => navigation.navigate('TestimonialScreen')}>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.more}>Voir Plus </Text>
                {React.createElement(icons['Arrowright'], { width:26 , height: 16, })}
                </View>
                </TouchableOpacity>

            </View>
            

            </View>
            <View style={styles.containerTestimonial}>
                  <Animated.FlatList
                    data={testimonialData}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: (width - ITEM_WIDTH) / 2,
                    }}
                    snapToInterval={ITEM_WIDTH + SPACING}
                    decelerationRate="fast"
                    bounces={false}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                      { useNativeDriver: true }
                    )}
                    renderItem={({ item, index }) => {
                      const inputRange = [
                        (index - 1) * (ITEM_WIDTH + SPACING),
                        index * (ITEM_WIDTH + SPACING),
                        (index + 1) * (ITEM_WIDTH + SPACING),
                      ];

                      const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 0.8],
                        extrapolate: 'clamp',
                      });

                      const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.7, 1, 0.7],
                        extrapolate: 'clamp',
                      });

                      return (
                        <Animated.View style={[styles.itemContainerTestimonial, { transform: [{ scale }], opacity }]}>
                          <Image source={{ uri: item.image }} style={styles.imageTestimonial} />
                          <Text style={styles.testimonialText}>“{item.testimonial}”</Text>
                          <StarRating rating={item.rating} />
                          <Text style={styles.nameTextTestimonial}>- {item.name}</Text>
                        </Animated.View>
                      );
                    }}
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
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
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
    backgroundColor: "#fff",
    
  },
  containerColor:{
    backgroundColor:'#EDECFF',
    padding: padding20,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  store_ringContainner:{
    flexDirection:'row',
  },
  store:{
    marginRight:5,
  },

  title: {
    fontSize: 21,
    fontWeight: '900',
    color:'#000'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color:'#000',
    marginBottom: 20,
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
// Articales section css

card: {
  borderRadius: 6,
  width: width - 130,
  backgroundColor:'#FDFDFD',
  borderWidth:2,
  borderColor:'#E6E5FD',
  margin: 8,
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
  productPrice: {
    fontSize: 14,
    marginRight:50,
    fontWeight: 'bold',
    color:'#5549EF'
  },
  section: {
    paddingTop :padding20,
    paddingLeft :padding20
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

  


  columnWrapper: {
    justifyContent: 'space-between',
  },


});

export default HomeScreen;
