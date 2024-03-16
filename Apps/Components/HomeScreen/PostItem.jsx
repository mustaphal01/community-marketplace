import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function PostItem({item}) {

  const navigation=useNavigation();

  return (
    <TouchableOpacity className="flex-1 m-2 rounded-lg"
    onPress={()=>navigation.push('product-detail',
    {
      product:item
    })}
    > 
        <Image source={{uri:item.image}}
        className="w-full h-[160px] rounded-lg"
        />
        <View>
            {/* <Text>{item.category}</Text> */}
            <Text className="text-[15px] font-semibold mt-0.5 text-gray-700">
                {item.title}
            </Text>
            <Text className="text-[17px] font-semibold text-green-600 ">
                ₦{item.price}
            </Text>

        </View>
    </TouchableOpacity>
  )
}