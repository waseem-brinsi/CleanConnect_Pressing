import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../../svg/svgLoader';

import colors from '../../constants/colors';
import HeaderComponent from '../../components/HeaderComponent';


const products = [
  { id: '1', category: 'Electronics', title: 'Laptop',date:'2025-01-15T08:25:30.000Z'},
  { id: '2', category: 'Clothing', title: 'T-Shirt', date:'2025-01-04T08:25:30.000Z' },
  { id: '3', category: 'Home', title: 'Vacuum Cleaner', date:'2025-01-04T08:25:30.000Z' },
  { id: '4', category: 'Electronics', title: 'Headphones', date:'2025-01-04T08:25:30.000Z' },
];
const { width,height } = Dimensions.get('window');


export default function ProductScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

    const [filterDateNettoyage, setFilterDateNettoyage] = useState('All'); // 'All', 'Today', 'This Month', 'Last Month'
    const [dropdownVisibleDateNettoyage, setDropdownVisibleDateNettoyage] = useState(false);
   

  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

    const getDateRange = (filterDateNettoyage) => {
      const today = new Date();
      const startOfToday = new Date(today.setHours(0, 0, 0, 0));
      const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
      const startOfThisYear = new Date(today.getFullYear(), 0, 1);
  
      switch (filterDateNettoyage) {
        case 'Today':
          return (date) => new Date(date).setHours(0, 0, 0, 0) === startOfToday.getTime();
        case 'This Month':
          return (date) => new Date(date).getMonth() === startOfThisMonth.getMonth() &&
            new Date(date).getFullYear() === startOfThisMonth.getFullYear();
        case 'Last Month':
          return (date) => new Date(date).getMonth() === startOfLastMonth.getMonth() &&
            new Date(date).getFullYear() === startOfLastMonth.getFullYear();
        case 'Last Year':
          return (date) => new Date(date) < startOfThisYear;
        default:
          return () => true; // No filtering for 'All'
      }
    };

    const filteredNettoyageByDate = filteredProducts.filter(el => getDateRange(filterDateNettoyage)(el.date));

    const toggleDropdownDateNettoyage = () => {
      setDropdownVisibleDateNettoyage(!dropdownVisibleDateNettoyage);
    };
  
    const selectfilterDate = (option3) => {
      setFilterDateNettoyage(option3);
      setDropdownVisibleDateNettoyage(false);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
          style={[styles.categoryButton,item === selectedCategory && styles.selectedCategory]}
          onPress={() => setSelectedCategory(item)}
        >

        <Text style={[styles.categoryText,item === selectedCategory && styles.categoryTextselected]}>{item}</Text>
        </TouchableOpacity>
      );


  console.log(filteredProducts)
  return (
  <SafeAreaView style={styles.safeArea}>

  <View style={styles.container}>
    <HeaderComponent title={'Historiques'} style={{backgroundColor:colors.background}}></HeaderComponent>

      <View style={styles.header}>  

              <View style={styles.top}>

                <FlatList
                  horizontal
                  data={categories}
                  keyExtractor={(item) => item}
                  renderItem={renderCategoryItem}
                  showsHorizontalScrollIndicator={false}
                />
                
              </View>   
      </View>

      <View style={styles.filterContainer}>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdownDateNettoyage}>
                <Text style={styles.dropdownButtonText}>{filterDateNettoyage}</Text>
              </TouchableOpacity>



              {dropdownVisibleDateNettoyage && (
                <View style={styles.dropdown}>
                  {['All', 'Today', 'This Month', 'Last Month','Last Year'].map(option3 => (
                    <TouchableOpacity
                      key={option3}
                      style={styles.dropdownOption}
                      onPress={() => selectfilterDate(option3)}
                    >
                      <Text style={styles.dropdownOptionText}>{option3}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

      
      </View>

            {/* Products List */}
            <FlatList
              data={filteredNettoyageByDate}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <Text style={styles.productTitle}>{item.title}</Text>
                </View>
              )}
              contentContainerStyle={styles.productList}
              showsVerticalScrollIndicator={false}
            />
    </View>


  </SafeAreaView>

  );
}

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
      paddingBottom:20,
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
  categoryText: {
    fontWeight:"bold",
    color:colors.primary,
  },
  categoryTextselected: {
    color:'#fff',
    fontWeight:'bold',
  },
  productList: {
    paddingTop: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    color: '#333',
  },

  
  dropdownContainer: {
    marginLeft:5,
    marginVertical:5,
  },
  
  filterContainer: {
    flexDirection:'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  dropdownButton: {
    width:width/3,
    height:height/25,
    paddingVertical: 5,
    // paddingHorizontal: 20,
    backgroundColor: colors.white ,
    borderWidth:1,
    borderColor:colors.primary,
    borderRadius: 5,
  },
  dropdownButtonText: {
    color:colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  dropdownOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#007bff',
  },
  
  
});
