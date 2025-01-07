import React, { useContext, useState  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions,Image,TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import CustomModal from '../../../components/CustomModal';
import { BasketContext } from '../../../Context/BasketContext';

const initialData = [
  { id: '1' , category: 'vetements',quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant FANADOUX EL FANAC grand air préserve votre linge, lavage après lavage. Pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '2' , category: 'voitures' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant FANADOUX EL FANAC grand air préserve votre linge, lavage après lavage. Pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '3' , category: 'domicile' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant FANADOUX EL FANAC grand air préserve votre linge, lavage après lavage. Pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},

  { id: '4' , category: 'vetements',quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant FANADOUX EL FANAC grand air préserve votre linge, lavage après lavage. Pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '5' , category: 'voitures' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '6' , category: 'domicile' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  
  { id: '7' , category: 'vetements',quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '8' , category: 'voitures' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '9'  , category: 'domicile',quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},

  { id: '10' , category: 'vetements',quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '11' , category: 'voitures' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '12' , category: 'domicile' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '13' , category: 'domicile' ,quantity:0, title: 'Lessive LIQUIDE pour MACHINE AUTOMATIQUE 3L', description:"l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '14' , category: 'domicile' ,quantity:0, title: 'wassim', description: "l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
  { id: '15' , category: 'domicile' ,quantity:0, title: 'wassim2', description: "l'assouplissant fanadoux el fanac grand air préserve votre linge, lavage après lavage. pour toujours plus de plaisir, cette formule concentrée, délicatement parfumée, laisse une odeur fraîche sur vos vêtements et facilite le repassage.",price: '12.500', src: require('../../../../assets/images/product/judy.png')},
]

const categories = ['All', ...new Set(initialData.map((d) => d.category))];

const { width } = Dimensions.get('window');


const StoreScreen = ({navigation}) => {

  const navigationGoBack = useNavigation();
  const [data, setData] = useState(initialData);
  
  const {basket,setBasket} = useContext(BasketContext);

  const [modalVisible, setModalVisible] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  


  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setData(initialData);
    } else {
      const filtered = initialData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setData(filtered);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const groupByCategory = (data) => {
    const groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.category]) {
        groupedData[item.category] = [];
      }
      groupedData[item.category].push(item);
    });
    return Object.entries(groupedData);
  };

  const filterData = () => {

    if (selectedCategories.length === 0 || selectedCategories.includes('All')) {
      return groupByCategory(data);
    }

    const filteredData = data.filter(item => selectedCategories.includes(item.category));
    return groupByCategory(filteredData);
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

  const renderCategoryItem = ({ item }) => (

    <TouchableOpacity
      style={[styles.categoryButton,selectedCategories.includes(item) && styles.selectedCategory]}
      onPress={() => toggleCategory(item)}
    >

      <Text style={[styles.categoryText ,selectedCategories.includes(item) && styles.categoryTextselected]}>{item}</Text>
    </TouchableOpacity>

  );

  
  const HandleProductPress = (item) => {
    const similarProducts = data.filter(it => it.category === item.category);
    navigation.navigate('ProductDetailScreen',{item:item,similarProducts:similarProducts,basket1:basket})
  }

  const renderProductItem = ({ item }) => (
    <View style={styles.cardProduct}>
      <TouchableOpacity style={styles.actionButtonProduct} onPress={()=>HandleProductPress(item,data)}>
        <Image source={item.src} style={styles.productImage} />
        <Text style={styles.productText}>{item.title}</Text>
        <View style={styles.price_plus}>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity  onPress={() => addToBasket(item)}>
            {React.createElement(icons['Plus'], { width:28 , height: 28, marginRight:5 })}
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
  </View>
  );

  const renderGroup = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>Produits de {item[0]}</Text>
      <FlatList
        data={item[1]}
        keyExtractor={(subItem) => subItem.id}
        renderItem={renderProductItem}
        numColumns={2}
      />
    </View>
  );


  const renderGroup_search = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>Produits de {item.category}</Text>
      <FlatList
        data={[item]}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
      />
    </View>
  );
  

  console.log(basket);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>


        <View style={styles.header}>  

          <View style={styles.top}>

              <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>
                {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
              </TouchableOpacity>

              <Text  style={[styles.sectionTitle,styles.topTitle]}>Produits</Text>  



              
<TouchableOpacity onPress={() => navigation.navigate('BasketDetails')}>
                {React.createElement(icons['Basket'], { width: 40,height: 40 })}
                    {basket.length > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{basket.length}</Text>
                    </View>
                    )}
                </TouchableOpacity>
            
          </View>     
          
          <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item}
              renderItem={renderCategoryItem}
              contentContainerStyle={styles.categoryContainer}
              showsHorizontalScrollIndicator={false}
          />  

          <View style={styles.searchContainer}>
       
              {React.createElement(icons['Search'], { width: 20, height: 20 ,stroke : colors.primary,strokewidth: 0.8 })}
              <TextInput style={styles.searchBar} 
                        placeholder="Search..." 
                        placeholderTextColor="#6c757d" 
                        value={searchQuery}
                        onChangeText={handleSearch}
                        />
          </View>   
        </View>





        {!searchQuery?(
              <FlatList
              data={filterData()}
              keyExtractor={(item) => item[0]}
              renderItem={renderGroup}
              />):

              (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderGroup_search}
              />          
              )      
        }
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


  categoryContainer: {
    marginVertical:20,
    paddingHorizontal: 10,
    // paddingBottom: 10,
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
  categoryText: {
    fontWeight:"bold",
    color:colors.primary,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#000',
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },

  item: {
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 10
  },
  itemTitle: {
    fontSize: 14,
    fontWeight:'bold',
    marginBottom:20, 
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

});



export default StoreScreen;

