import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';


import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
import { BasketProvider } from './src/Context/BasketContext';
import { BookmarkContext, BookmarkProvider } from './src/Context/BookmarkContext';

export default function App() {
  //SplashScreen
  useEffect(() => {
    async function prepare() {
      try {

        await new Promise(resolve => setTimeout(resolve, 1000)); 
      await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {

        await SplashScreen.hideAsync();
      }
    }

    prepare();
  },[]);


  return (
    <BookmarkProvider>
    <BasketProvider>
      <NavigationContainer>
          <AppNavigator/>
      </NavigationContainer>
    </BasketProvider>
    </BookmarkProvider>


  );
}

