import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetail from '../Screens/ProductDetail';

const Stack=createStackNavigator();


export default function ProfileStackNav() {
  return (
    <Stack.Navigator>
            <Stack.Screen  name='profile-tab' 
            options={{headerShown:false}}
            component={ProfileScreen}/>
            <Stack.Screen   name='my-product' 
            component={MyProducts}
            options={{
              headerTitle:'My Products',
              headerTitleAlign:'center',
              // headerTitleStyle:{
              //   fontSize:20,
              //   fontWeight:'semi-bold'
              // }
      
            }} 
            />
            
            <Stack.Screen name="product-detail" component={ProductDetail} 
        options={{
          headerTitle:' Details',
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