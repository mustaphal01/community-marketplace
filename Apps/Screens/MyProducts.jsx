import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { View } from 'react-native'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'

export default function MyProducts() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserPost();
    });
  }, [navigation]);

  const getUserPost = async () => {
    setProductList([]); // Clear the productList before fetching new data
    const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
    const snapshot = await getDocs(q);
    const products = [];
    snapshot.forEach(doc => {
      products.push(doc.data());
    });
    setProductList(products); // Set the productList with the fetched data
  }

  return (
    <View className='flex-1 bg-white p-4 mt-[-50] scroll-mb-50'>
      <LatestItemList latestItemList={productList} />
    </View>
  )
}
