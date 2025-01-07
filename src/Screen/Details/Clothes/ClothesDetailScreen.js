import React, { useState,useEffect ,useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import icons from '../../../svg/svgLoader';
import Upload_Images from '../Upload_Images';
import colors from '../../../constants/colors';



const initialData = [
  { id: '1' , category: 'Hauts' , title: 'T-Shirts', icon: 'TShirtsIcon',images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0  , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '2' , category: 'Hauts' , title: 'Chemise', icon: 'ChemiseIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '3' , category: 'Hauts' , title: 'Pull', icon: 'PullIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '4' , category: 'Hauts' , title: 'Blouson', icon: 'BlousonIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},


  { id: '5' , category: 'Bas' , title: 'Jean', icon: 'JeanIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
  { id: '6' , category: 'Bas' , title: 'Short', icon: 'ShortIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
  { id: '7' , category: 'Bas' , title: 'Pantalon', icon: 'PantalonIcon',  images1: [], images2: [], images3: [],lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
  { id: '8' , category: 'Bas' , title: 'Jupe', icon: 'JupeIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },

  { id: '9'  , category: 'Robes et Tenues', title: 'Robe', icon: 'RobeIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
  { id: '10' , category: 'Robes et Tenues', title: 'Pyjama', icon: 'PyjamaIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },
  { id: '11' , category: 'Robes et Tenues', title: 'Maillot de bain', icon: 'Maillot_bainIcon', images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5 },

  { id: '12' , category: 'Accessoires' , title: 'Echarpe', icon: 'EcharpeIcon', images1: [], images2: [], images3: [],lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '13' , category: 'Accessoires' , title: 'Gants', icon: 'GantsIcon', images1: [], images2: [], images3: [],lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '14' , category: 'Accessoires' , title: 'Chapeau', icon: 'ChapeauIcon',images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '15' , category: 'Accessoires' , title: 'Cravate', icon: 'CravateIcon', images1: [], images2: [], images3: [],lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},

  { id: '16', category: 'Sous-vêtements' , title: 'Chaussettes', icon: 'ChaussettesIcon', images1: [], images2: [], images3: [],lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '17', category: 'Sous-vêtements' , title: 'Sous-vêtements', icon: 'Sous_vetementsIcon', images1: [], images2: [], images3: [],lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},

  { id: '18', category: 'Extérieur', title: 'Manteaux', icon: 'ManteauxIcon',images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},
  { id: '19', category: 'Extérieur', title: 'Veste', icon: 'VesteIcon',images1: [], images2: [], images3: [], lavage_repassageNBR : 0 ,  lavage_SecNBR : 0 , repassageNBR : 0 ,totalitem:0 ,totalitemPrice:0 , lavage_repassagePrice : 3 ,  lavage_SecPrice : 4 , repassagePrice : 5},

];



const ActionSheet_Data = [
  { id: '1', title: 'Lavage / Repassage', price: '3', },
  { id: '2', title: 'Lavage à sec', price: '4',  },
  { id: '3', title: 'Repassage', price: '1.5', },
]

const categories = ['All', ...new Set(initialData.map((d) => d.category))];

const { width } = Dimensions.get('window');


const ClothesDetailScreen = ({navigation}) => {

  const navigationGoBack = useNavigation();
  const [data, setData] = useState(initialData);
  const actionSheetRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  


  const [lavage_repassageNBR,setlavage_repassageNBR] = useState(0);
  const [lavage_SecNBR,setlavage_SecNBR] = useState(0);
  const [repassageNBR,setrepassageNBR] = useState(0);
  

  const [numberArticale,setNumberArticale] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);



  const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const filterData = () => {
    if (selectedCategories.length === 0 || selectedCategories.includes('All')) {
      return groupByCategory(data);
    }
    const filteredData = data.filter(item => selectedCategories.includes(item.category));
    return groupByCategory(filteredData);
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



  const openActionSheet = (item) => {
    // setNumberArticale(0);
    // setTotalPrice(0);

    setSelectedItem(item)
    actionSheetRef.current?.show();
  };
  

  const closeActionSheet = (selectedItem) => {

    const updatedata =  data.map(d => {
      if (d && d.id) {
        if (d.id === selectedItem.id) {
          const totalitem = ( lavage_repassageNBR + repassageNBR + lavage_SecNBR );
          const totalitemPrice = (  lavage_repassageNBR* selectedItem.lavage_repassagePrice
                                    + repassageNBR* selectedItem.repassagePrice
                                    + lavage_SecNBR* selectedItem.lavage_SecPrice);
          return {
            ...d, 
            lavage_repassageNBR: lavage_repassageNBR,
            repassageNBR:repassageNBR,
            lavage_SecNBR:lavage_SecNBR,
            totalitem: totalitem ,
            totalitemPrice:totalitemPrice
          };
        
        }       
      }
    return d;
  })

  setData(updatedata);



  const totalArticles = updatedata
  .map(d => {
    if (d && d.id) {
      let art = d.totalitem; 
      let tt = d.totalitemPrice; 
      return [art, tt];
    }
    return [0, 0]; 
  })
  .reduce((acc, curr) => {
    return [acc[0] + curr[0], acc[1] + curr[1]]; 
  }, [0, 0]);

  const [numberArticale, totalPrice] = totalArticles;

  setNumberArticale(numberArticale);
  setTotalPrice(totalPrice);

  setlavage_repassageNBR(0)
  setlavage_SecNBR(0)
  setrepassageNBR(0)
  actionSheetRef.current?.hide();
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryButton,selectedCategories.includes(item) && styles.selectedCategory]}
      onPress={() => toggleCategory(item)}
    >
      <Text style={[styles.categoryText ,selectedCategories.includes(item) && styles.categoryTextselected]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>

      <View style={styles.side}>

      {React.createElement(icons[item.icon], { width: 30, height: 30 , })}
      <Text  style={styles.itemText}>{item.title}</Text>
      </View>

      <View style={styles.itemRow}>
      <Text  style={styles.itemText}>{item.totalitemPrice}  DT</Text>
      
        <View style={styles.numberItem}>
        <TouchableOpacity style={[styles.numberItem,item.totalitem === 0 && styles.numberItem_2]} 
        onPress={()=>{openActionSheet(item)}}>
          <Text 
          style={[styles.numberText,item.totalitem === 0 && styles.numberText_2]}
          >

          {item.totalitem === 0 ? "+" : item.totalitem}
          </Text>
        </TouchableOpacity>

        </View>
      </View>
    </View>
  );

  const renderGroup = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item[0]}</Text>
      <FlatList
        data={item[1]}
        keyExtractor={(subItem) => subItem.id}
        renderItem={renderItem}
      />
    </View>
  );
  
  const incrementlavage_repassageNBR = () => {
    setlavage_repassageNBR(lavage_repassageNBR + 1);
  };

  const decrementlavage_repassageNBR = () => {
    if (lavage_repassageNBR > 0) {
      setlavage_repassageNBR(lavage_repassageNBR - 1);
    }
  };

  const incrementlavage_SecNBR = () => {
    setlavage_SecNBR(lavage_SecNBR + 1);
  };

  const decrementlavage_SecNBR = () => {
    if (lavage_SecNBR > 0) {
      setlavage_SecNBR(lavage_SecNBR - 1);
    }
  };

  const incrementrepassageNBR = () => {
    setrepassageNBR(repassageNBR + 1);
  };

  const decrementrepassageNBR = () => {
    if (repassageNBR > 0) {
      setrepassageNBR(repassageNBR - 1);
    }
  };





  const render_ActionSheet_rowItem = ({ item }) => {
    switch (item.id) { 
      case '1':
        return (
          <View style={styles.itemRow}>
          <View style={styles.side}>

            {(selectedItem)?(
              React.createElement(icons[selectedItem.icon], { width: 30, height: 30})
            ):null}
            
            <View>
              <Text  style={styles.itemTextActionSheet}>{item.title}</Text>
              {
                (selectedItem) ? (
                <Text  style={styles.itemPieceActionSheet}>{selectedItem.lavage_repassagePrice}DT/Piéce</Text>    
                ) : null
              }
            </View>
          </View>
      
          <View style={styles.ActionSheet_itemRow}>
                <View style={styles.ActionSheet_numberItem}>
      
                    <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={decrementlavage_repassageNBR}>
                      <Text style={styles.ActionSheet_numberText}>-</Text>
                    </TouchableOpacity>     
      
                  </View>
      
                <Text  style={styles.itemTextActionSheet}>{lavage_repassageNBR}</Text>
      
                <View style={styles.ActionSheet_numberItem}>
      
                  <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={incrementlavage_repassageNBR}>
                    <Text style={styles.ActionSheet_numberText}>+</Text>
                  </TouchableOpacity>     
      
                </View>
          </View>
          </View>
          
        );
      
      case '2':
          return (
            <View style={styles.itemRow}>
  
            <View style={styles.side}>
              {(selectedItem)?(
                          React.createElement(icons[selectedItem.icon], { width: 30, height: 30 ,})
              ):null} 
              <View>
                <Text  style={styles.itemTextActionSheet}>{item.title}</Text>
                {
                (selectedItem) ? (
                <Text  style={styles.itemPieceActionSheet}>{selectedItem.lavage_SecPrice}DT/Piéce</Text>    
                ) : null}
              </View>
            </View>
        
            <View style={styles.ActionSheet_itemRow}>
                  <View style={styles.ActionSheet_numberItem}>
        
                      <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={decrementlavage_SecNBR}>
                        <Text style={styles.ActionSheet_numberText}>-</Text>
                      </TouchableOpacity>     
        
                    </View>
        
                  <Text  style={styles.itemTextActionSheet}>{lavage_SecNBR}</Text>
        
                  <View style={styles.ActionSheet_numberItem}>
        
                    <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={incrementlavage_SecNBR}>
                      <Text style={styles.ActionSheet_numberText}>+</Text>
                    </TouchableOpacity>     
        
                  </View>
            </View>
            </View>
            
          );
      
      case '3':
            return (
              <View style={styles.itemRow}>
    
              <View style={styles.side}>
              {(selectedItem)?(
                    React.createElement(icons[selectedItem.icon], { width: 30, height: 30})
              ):null}
                <View>
                  <Text  style={styles.itemTextActionSheet}>{item.title}</Text>
                  
                  {
                (selectedItem) ? (
                <Text  style={styles.itemPieceActionSheet}>{selectedItem.repassagePrice}DT/Piéce</Text>    
                ) : null}


                </View>
              </View>
          
              <View style={styles.ActionSheet_itemRow}>
                    <View style={styles.ActionSheet_numberItem}>
          
                        <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={decrementrepassageNBR}>
                          <Text style={styles.ActionSheet_numberText}>-</Text>
                        </TouchableOpacity>     
          
                      </View>
          
                    <Text  style={styles.itemTextActionSheet}>{repassageNBR}</Text>

                    <View style={styles.ActionSheet_numberItem}>
          
                      <TouchableOpacity style={styles.ActionSheet_numberItem} onPress={incrementrepassageNBR}>
                        <Text style={styles.ActionSheet_numberText}>+</Text>
                      </TouchableOpacity>     
          
                    </View>
              </View>
              </View>
              
            );

      default:

        return null;
    }
  };
  


  const render_ActionSheet =(item)=>{
    return(
    <View style={styles.actionSheetContent}>
    <View style={styles.actionSheetTop}>
  
    {selectedItem ? (
          <>
            <Text style={styles.actionSheetTitle}>{selectedItem.title}</Text>
            <Text style={styles.actionSheetTitle}>{selectedItem.totalitem} DT</Text>
          </>
        ) : null}
    </View>

    <View style={styles.actionItemContainer}>

    <FlatList
      data={item}
      keyExtractor={(item) => item.id}
      renderItem={render_ActionSheet_rowItem}
    />
    </View>

    <View style={styles.actionSheet_ImageContainner}>
      <Text style={styles.actionSheetTitle}>Ajouter les photos</Text>
    </View>


    <View style={styles.containerSectionImg}>

      <Upload_Images data={data} setData={setData} selectedItem={selectedItem} ></Upload_Images>

    </View>

      
    
    <TouchableOpacity style={styles.actionSheetButton} onPress={()=>{closeActionSheet(selectedItem)}}>
      <Text style={styles.actionSheetButtonText}>Close</Text>
    </TouchableOpacity>

  </View>
  )};

  const HandleSuivant = ()=>{
    navigation.navigate('ClothesConfirmationScreen',{
      data1 : data,
      numberArticale:numberArticale,
      totalPrice:totalPrice

    })
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigationGoBack.goBack()}>

            {React.createElement(icons['Backarrow'], { width: 20, height: 20 ,})}

        </TouchableOpacity>

        <View style={styles.header}>          
          <Text  style={[styles.sectionTitle,styles.topTitle]}>Sélectionnez vos articles</Text>  
          <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item}
              renderItem={renderCategoryItem}
              contentContainerStyle={styles.categoryContainer}
              showsHorizontalScrollIndicator={false}
          />     
        </View>
        
        <FlatList
          data={filterData()}
          keyExtractor={(item) => item[0]}
          renderItem={renderGroup}
        />
      </View>


      <View style={styles.totalContainer}>

        <View style={styles.c1}>
            <Text  style={[styles.totaltext]}>Nombre d’articles: </Text>
            <Text  style={[styles.totalnumber]}>{numberArticale} </Text>
        </View>

        <View style={styles.c2}>
            <Text  style={[styles.totaltext]}>Total à payé: </Text>
            <Text  style={[styles.totalnumber]}>{totalPrice} DT</Text>
        </View>

      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={HandleSuivant} >
           <Text style={styles.actionButtonText}>Suivant</Text>
        </TouchableOpacity>

          <ActionSheet ref={actionSheetRef}>
            {render_ActionSheet(ActionSheet_Data)}
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
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    borderRadius:30,
    top: 20, 
    zIndex: 1,
  },

  header:{
    backgroundColor:colors.background,
    // marginTop:30,
    paddingVertical:20,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
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
  item: {
    padding: 15,
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

  itemRow:{
    flexDirection:"row",
    justifyContent:'space-between',
    marginBottom:10,
  },

  itemText: {
    fontSize: 16,
    fontWeight:'semibold',  
    marginHorizontal:15,
  },



  side:{
    flexDirection:'row',
     
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
  totalContainer:{
    flexDirection :"row",
    alignContent:"center",
    justifyContent:"space-between",
    marginHorizontal:20,
    marginTop:10,
    backgroundColor:'#fff'
  },
  totaltext: {
    fontSize: 12,
    fontWeight :'regular',
    color:"#2D2D2D",
  },
  totalnumber:{
    fontSize:18,
    fontWeight:"semibold",
    color:colors.primary,
  },
  c1:{
    flexDirection : "row",
    width: width / 2.3,
    height:35,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:8,
    borderWidth:1,
    borderColor:'#E8E8E8',
    backgroundColor:"#F3F4F6"
  },
  c2:{
    flexDirection : "row",
    width: width / 2.3,
    height:35,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:8,
    borderWidth:1,
    borderColor:'#E8E8E8',
    
    backgroundColor:"#F3F4F6"
  },



  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,

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
    fontSize: 14,
    color: 'white',
    fontWeight: 'regular',
  },


// ActionSheet Css
  actionSheetContent: {
    padding: 20,
  },
  actionSheetTop:{
    flexDirection:'row',
    justifyContent:'space-between',
  },


  actionSheetTitle: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 10,
  },
  actionSheetText: {
    fontSize: 16,
    marginBottom: 20,
  },
  actionSheetButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  actionItemContainer:{
    backgroundColor:'#F6F6F6',
    padding:10,
    marginBottom:20
  },
  
  itemTextActionSheet: {
    fontSize: 12,
    fontWeight:'semibold',  
    marginHorizontal:15,
  },

  itemPieceActionSheet: {
    fontSize: 12,
    color:'#8C8C8C',
    fontWeight:'semibold',  
    marginHorizontal:15,
  },

  ActionSheet_itemRow:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    marginBottom:10,
  },

  ActionSheet_numberItem: {
    backgroundColor:'#fff',
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
    color:colors.primary,  
  },

  actionSheetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  actionSheet_ImageContainner:{


  },

  containerSectionImg: {
    // flex: 1,
    marginBottom:10,
    height:150
  },
});

export default ClothesDetailScreen;
