import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={require('../../../assets/images/welcome/collecte.jpg')} style={styles.TshirtImage} />
      <View style={styles.container}>

        <Text style={styles.TitleText}>Collecte de vétements</Text>


        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a purus pretium nisi consequat egestas. Phasellus quis odio a eros pretium viverra eget sed velit.
        </Text>

        <View style={styles.buttonsContainer}>


          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BienvenueScreen')}>
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  TshirtImage: {
    width: width,
    height: width * 1.1,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  TitleText: {
    fontSize: 24,
    color:colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical:20
  },
  description: {
    fontSize: 14,
    fontWeight: 'regular',
    textAlign: 'center',
    marginBottom: 80,
    paddingHorizontal: 20,
    marginVertical:20

  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    bottom: 20, // Adjust this value to position the buttons properly
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingHorizontal:16,
    paddingVertical:10,
    borderRadius: 20,
    width: '89', 
    height:'40',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:"regular",
    
  },
});

export default WelcomeScreen;
