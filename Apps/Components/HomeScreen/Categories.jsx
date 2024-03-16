import { useNavigation } from '@react-navigation/native'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'

export default function Categories({categoryList}) {
  
  const navigation = useNavigation();

  return (
    <View className="mt-3">
      <Text className="font-semibold text-[20px] text-gray-800">Categories</Text>
      <FlatList 
        data={categoryList}
        numColumns={4}
        renderItem={({item, index}) => (
          <TouchableOpacity 
          onPress={()=>navigation.navigate('item-list',{
            category:item.name
          })}
          className="flex-1 justify-center items-center p-2 
          border-[1.5px] border-gray-200 rounded-lg m-1  bg-gray-50">
            <Image source={{uri:item.icon}}
            className="w-[40px] h-[40px]"
            />
            <Text className="text-[12px] text-gray-700 font-semibold text-center mt-1">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}