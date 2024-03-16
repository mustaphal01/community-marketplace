import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import { getFirestore, collection, getDocs, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import Categories from '../Components/HomeScreen/Categories';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getSliders();
    await getCategoryList();
    await getLatestItemList();
    setRefreshing(false);
  };

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(collection(db, "UserPost"), orderBy("createdAt", "desc"));
    querySnapshot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  return (
    <ScrollView
    className="py-8 px-6 flex-1"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 23, marginBottom: 10, }}>
        <Text style={{ fontSize: 26, fontWeight: '700', color: '#333' }}>Store X</Text>
        {/* Shopping Bag Icon */}
        <Image 
          source={require('./../../assets/images/shopping-bag.png')} 
          style={{ width: 30, height: 30, marginLeft: 5 }} 
        />
      </View>

      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider sliderList={sliderList}/>
      {/* Category List */}
      <Categories categoryList={categoryList} />
      {/* Latest Item List */}
      <LatestItemList latestItemList={latestItemList} heading={"Latest Items"} />
    </ScrollView>
  );
}
