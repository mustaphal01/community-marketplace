import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import PostItem from './PostItem'
export default function LatestItemList({latestItemList,heading}) {
  return (
    <View className="mt-3 mb-10">
      <Text className="font-semibold text-[20px] text-gray-800"> {heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({item,index}) =>(
          <PostItem item={item}/>
        )} 
      
      
      />
      
    </View>
  )
}