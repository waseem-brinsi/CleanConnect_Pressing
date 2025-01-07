import React, { useContext, useState  } from 'react';
import { View, Text,FlatList,Image, TouchableOpacity, StyleSheet,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';



const initialData = [
  {
    id: '1',
    name: 'John Doe',
    feedback: 'This app is amazing! It has changed my life for the better.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    feedback: 'A must-have app for anyone looking to improve productivity!A must-have app for anyone looking to improve productivity! A must-have app for anyone looking to improve productivity!',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    feedback: 'Great user experience and fantastic support team.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 3,
  },
  {
    id: '4',
    name: 'John Doe',
    feedback: 'This app is amazing! It has changed my life for the better.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
  },
  {
    id: '5',
    name: 'Jane Smith',
    feedback: 'A must-have app for anyone looking to improve productivity!A must-have app for anyone looking to improve productivity! A must-have app for anyone looking to improve productivity!',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4,
  },
  {
    id: '6',
    name: 'Mike Johnson',
    feedback: 'Great user experience and fantastic support team.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 3,
  },
  {
    id: '7',
    name: 'John Doe',
    feedback: 'This app is amazing! It has changed my life for the better.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
  },
  {
    id: '8',
    name: 'Jane Smith',
    feedback: 'A must-have app for anyone looking to improve productivity!A must-have app for anyone looking to improve productivity! A must-have app for anyone looking to improve productivity!',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4,
  },
  {
    id: '9',
    name: 'Mike Johnson',
    feedback: 'Great user experience and fantastic support team.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 3,
  },
];




const { width,height } = Dimensions.get('window');



const TestimonialScreen = ({navigation}) => {

  const navigationGoBack = useNavigation();
  const [data, setData] = useState(initialData);
  

  const sections = [
    { id: '1', type: 'section1'},
    { id: '2', type: 'section2'},
  ];
  const renderStars = (rating) => {
    return (
      <View style={styles.starContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Text key={index} style={styles.star}>
            {index < rating ? '★' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        {renderStars(item.rating)}
        <Text style={styles.feedback}>{item.feedback}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
              <View style={styles.header}>  
        <View style={styles.top}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
              </TouchableOpacity>

              <Text  style={[styles.sectionTitle,styles.topTitle]}>Témoignages Clients</Text>  
        </View>     

        <View  style={styles.section}>


             <Text  style={styles.textTitle}>Partagez Votre Expérience</Text>
             <Text  style={styles.text}>Partagez votre avis, cela nous aide à vous offrir la meilleure expérience possible.</Text>
             <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Ajouter Mon Avis</Text>
                </TouchableOpacity>
              </View>


        </View>
        
   
        </View>

        <View  style={styles.tt} >
           
              {React.createElement(icons['Star'], { width:30 , height:30 ,marginRight:5 })}
              <Text style={styles.cardText}>Avis Clients</Text>
            
            
        </View>

          <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
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
    backgroundColor:colors.background,
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

  section:{
    marginTop:10,
    marginHorizontal:20

  },
  textTitle:{
    fontSize:13,
    fontWeight:"bold",
  },
  text:{
    fontSize:13,
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical:10
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

  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'white',
    fontWeight: 'regular',
  },




listContainer: {
  padding: 16,
},
card: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 3,
},
avatar: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 16,
},
textContainer: {
  flex: 1,
},
name: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 4,
},
starContainer: {
  flexDirection: 'row',
  marginBottom: 8,
},
star: {
  color: colors.primary,
  fontSize: 16,
  marginRight: 2,
},
feedback: {
  fontSize: 14,
  color: '#555',
},
 
tt:{
  flexDirection:'row',
  marginHorizontal:20,
  marginTop:10,
  alignContent:'center',
  alignItems:'center'
},


cardText: {
fontSize: 14,
fontWeight: 'bold',
},

});

export default TestimonialScreen;