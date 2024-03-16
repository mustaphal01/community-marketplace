import { useRoute } from '@react-navigation/native'
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList() {

  const {params} = useRoute();
  const db=getFirestore(app)
  const [itemList,setItemList]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    params&&getItemListByCategory();
  },[params])

  const getItemListByCategory =async()=>{
    setItemList([]);
    setLoading(true);
    const q=query(collection(db,'UserPost'),where('category','==',params.category));
    const snapshot=await getDocs(q); 
    setLoading(false);
    snapshot.forEach(doc=>{
      console.log(doc.data());
      setItemList(itemList=>[...itemList,doc.data()])
      setLoading(false);
    })
  }

  

  return (
    <View className="flex-1 mt-[-40] p-3 bg-white">
      {loading?
      <ActivityIndicator size="large"  className="mt-[10%]" color={'#000'} animating={loading} />
      :
    itemList?.length>0? <LatestItemList latestItemList={itemList} 
      heading={''}/>
      :<Text className="mt-[20%] text-center  font-semibold text-gray-600">No Post Found</Text>}
    </View>
  )
}