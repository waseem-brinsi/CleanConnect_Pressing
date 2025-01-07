import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import icons from '../svg/svgLoader';

import {
  HomeScreen,
  HistoryScreen,
  ProfileScreen,
} from '../Screen';


const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: '#ffffff',
          borderRadius: 32,
          height: 60,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#5549EF',
        tabBarIconStyle: {
          size: 24,
        },
        tabBarActiveBackgroundColor: '#E6E5FD', 
        tabBarInactiveBackgroundColor: '#ffffff',
        tabBarItemStyle: {
          borderRadius: 32, 
          margin: 5,
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? '#5549EF' : '#5549EF', fontWeight: 'bold' }}>
            {route.name} 
          </Text>
        ),
      })}>
  
        <Tab.Screen name="Acceuil" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              React.createElement(icons['Home'], { width: 25, height: 25 })
            )
            ,headerShown: false 
          }}/>
  
        <Tab.Screen 
          name="Historiques" 
          component={HistoryScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              React.createElement(icons['History'], { width:25 , height: 25 })
            ),headerShown: false 
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              React.createElement(icons['Profile'], { width:25 , height: 25 })
            ),headerShown: false
          }}
        />
      </Tab.Navigator>
    );
  }

export default TabNavigator;
