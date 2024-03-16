import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ItemList from '../Screens/ItemList';
import HomeScreen from '../Screens/HomeScreen';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} 
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen name="item-list" 
      component={ItemList}       
      options={({ route }) => ({ title: route.params.category })}
    
      />
      <Stack.Screen name="product-detail" 
      component={ProductDetail}       
      options={{
        headerTitle:'Product Detail',
        headerTitleAlign:'center',
        // headerTitleStyle:{
        //   fontSize:20,
        //   fontWeight:'semi-bold'
        // }

      }}
    
      />
      
    </Stack.Navigator>
  )
}