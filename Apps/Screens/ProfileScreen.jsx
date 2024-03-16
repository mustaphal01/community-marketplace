import { useAuth, useUser } from '@clerk/clerk-expo'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import diary from './../../assets/images/diary.png'
import logout from './../../assets/images/logout.png'
import search from './../../assets/images/search.png'
import about from './../../assets/images/about.png'
import ads from './../../assets/images/ads.png'
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {

  const {user}=useUser();
  const navigation=useNavigation();
  const {isLoaded, signOut}= useAuth();

  const menuList= [
    {
      id:1,
      name: 'My Products',
      icon: diary,
      path: 'my-product'
      
    },
    {
      id:2,
      name: 'Explore',
      icon: search,
      path: 'explore'
      
    },
    {
      id:3,
      name: 'Ads',
      icon: ads,
      
      
    },
    {
      id:5,
      name: 'About',
      icon: about,
      url:''
      
    },
    
    

    
  
    {
      id:4,
      name: 'Logout',
      icon: logout
      
    },
  
  ]
  const onMenuPress=(item)=>{ 
    if(item.name=='Logout')
    {
        signOut();
      return;
    }
   item?.path?navigation.navigate(item.path):null;
  }

  return (
    <View className="flex-1 p-5 style={{ backgroundColor: '#eeeee4' }} ">

    
    <View className='items-center mt-20'>
    <Text className="text-[25px] font-semibold mt-10 text-gray-900"> My Profile</Text>
    </View>
    <View >
      <View className="items-center">
      
      {/* <Image source={{uri:user?.imageUrl}}
      className="w-[100px] h-[100px] rounded-full mt-14"
      /> */}
      {/* <Text className="text-[20px] mt-3 text-gray-700 ">{user?.fullName}</Text> */}
      {/* <Text className="text-[18px]  mt-2 text-gray-500">{user?.primaryEmailAddress?.emailAddress}</Text> */}
    
      </View> 
    </View> 
      <FlatList 
      
        
        data={menuList}
        numColumns={2}
        style={{marginTop:95}}
        renderItem={({item, index})=>(
          
          <TouchableOpacity 
          onPress={()=>onMenuPress(item)}
          className="flex-1 p-3 border-[1.5px] items-center  rounded-lg border-gray-200 mx-2 mt-4 bg-gray-50">
            {item.icon&& <Image source={item?.icon}
            className="w-[30px] h-[30px]"
            />}
            <Text className="text-[13px] mt-1.5 font-semibold text-gray-700">{item.name}</Text>
          </TouchableOpacity>
        )}
      
      />
    </View>
  )
}