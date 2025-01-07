import React,{useState,useEffect,useContext} from 'react';
import { View, Text,ImageBackground, TouchableOpacity, StyleSheet ,FlatList,Dimensions,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import { BookmarkContext } from '../../../Context/BookmarkContext';



const { width,height } = Dimensions.get('window');
const BookmarkDetails = ({ navigation }) => {
  const navigationGoBack = useNavigation();
  const {bookmark, setBookmark } = useContext(BookmarkContext);



    const renderArticaleItem2 = ({ item }) => (

      <View style={styles.card2}>
        <View style={styles.image_bookmark}>
  
            <TouchableOpacity style={styles.bookmarkIcon} onPress={() => handleBookmarkPress()}>
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                {React.createElement(icons['Backarrow'], { width: 15, height: 15 ,stroke : colors.primary,strokewidth: 0.8 })}
            </TouchableOpacity>

            <View style={styles.header}>          
              <Text  style={[styles.sectionTitle,styles.topTitle]}>bookmarks</Text>
            </View>


          <View style={styles.section1}>
            <FlatList
              data={bookmark}
              keyExtractor={(item) => item.id}
              renderItem={renderArticaleItem2}
              numColumns={1}
            />
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
    marginBottom :80
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
    // height:height/2,
    // marginHorizontal:10,
    paddingVertical:30,
    borderRadius:20,
    // marginVertical:20,
    backgroundColor:'#fff'
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

export default BookmarkDetails;
