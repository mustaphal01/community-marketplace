import { getDocs, getFirestore, orderBy, query, collection } from 'firebase/firestore'
import { Text, ScrollView } from 'react-native'
import { app } from '../../firebaseConfig';
import { useEffect, useState } from 'react';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ExploreScreen() {

  const db=getFirestore(app);
  const [productList,setproductList]=useState([]);

  useEffect(()=>{
    getAllProducts();
  },[])
  
  // used to get all products

  const getAllProducts=async()=>{
    setproductList([]);
    const q=query(collection(db,'UserPost'),orderBy('createdAt','desc'));

    const snapshot=await getDocs(q);
    snapshot.forEach((doc)=>{
      
      setproductList(productList=>[...productList,doc.data()]);
    })
  }

  return (
    
    <ScrollView className="flex-1 p-5    mt-6 style={{ backgroundColor: '#eeeee4' }}">
      <Text className="text-[25px] font-semibold">Explore More</Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  )
}