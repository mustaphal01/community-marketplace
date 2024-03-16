import { useUser } from '@clerk/clerk-expo'
import { View, Text, Image, TextInput } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

export default function Header() {
    const{user}=useUser();
  return (
    <View className="mt-[22px] ">
        {/* User Info Section */}
        {/* <View className="flex flex-row items-center gap-2">
        <Image source={{uri:user?.imageUrl}} 
            className="rounded-full w-[65px] h-[65px]" 
        />
        <View>
            <Text className="text-[16px] text-gray-700">Welcome</Text>
            <Text className="text-[20px] font-semibold text-gray-700">{user?.fullName}</Text>
        </View>
        </View> */}

        {/* Search bar */}
        <View className="p-[12px] px-5 flex flex-row items-center
        bg-gray-50 border-[1.5px] border-gray-200  mt-[-10] rounded-full">
            <Ionicons name='search' size={24} color='gray'/>
            <TextInput placeholder='Search' 
            className="ml-3 text-[18px]"
            onChangeText={(value)=>
                console.log(value)
            }
            
            />
        </View>
    </View>
  )
}