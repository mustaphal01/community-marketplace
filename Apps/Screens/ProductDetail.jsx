import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Share } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { app } from '../../firebaseConfig';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';


export default function ProductDetail({navigation}) {

  const {params}=useRoute();
  const [product,setProduct]=useState([]);
  const {user}=useUser();
  const db=getFirestore(app) 
  const nav=useNavigation();
  
  useEffect(()=>{
    params&&setProduct(params.product);
    shareButton();

  },[params,navigation])

  const shareButton=()=>{
    navigation.setOptions({
      headerRight: () => (
        
        <Ionicons name="share-social-sharp" onPress={()=>shareProduct()} size={22.5} color="black" style={{marginRight:14}} />
        
      ),
    });
  }

  // used to share product

  const shareProduct=async()=>{
    const content={
      message:product?.title+'\n'+product?.desc+'\n ₦'+product.price+'\n \n'+product?.image+'\n\nContact: \n'+product?.userEmail,
      url:product?.image
    }
    Share.share(content).then(resp=>{
      console.log(resp);
    },(error)=>{
      console.log(error);
    }) 
  }

  const sendEmailMessage=()=>{
    const subject='Regarding '+product.title;
    const body='Hello '+product.userName+',\n'+'I am interested in your product '+product.title;
    Linking.openURL('mailto:'+product.userEmail+'?subject='+subject+'&body='+body);
  }

  const deleteUserPost=()=>{
    Alert.alert('Delete Post','Are you sure you want to delete this post?',[
     {
      text:'Yes',
      onPress:()=>deleteFromFirestore()
     },
     {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
     },
    ])
  }
  const deleteFromFirestore=async()=>{
    console.log('Deleted');
    const q=query(collection(db,'UserPost'),where('title','==',product.title))
    const snapshot= await getDocs(q);
    snapshot.forEach(doc=>{
      deleteDoc(doc.ref).then(resp=>{
        console.log('Deleted the Doc...');
        nav.goBack();
      })
    })
    
  }


  return (
    
    <ScrollView className="flex-1 p-2 bg-white">
      {/* <Text className="text-[19px] text-gray-900 font-semibold">{' '+product?.title}</Text>   */}
      <Image source={{uri:product.image}}
      className="h-[350px]  w-full rounded-lg"
      />
      <View className="p-2">
        <Text className="text-[20px] text-gray-900 font-semibold">{product?.title}</Text>
        {/* <Text className="mt-1 text-gray-800 font-semibold text-[18px]">Description:</Text> */}
        <Text className="text-[16.5px] mt-0.5 p-0.5 text-gray-800 ">{product?.desc}</Text>
        <Text className="text-[20.5px] mt-0.5 p-0.5 text-gray-800 ">{product?.phoneNum}</Text>
        
        {user?.primaryEmailAddress.emailAddress==product.userEmail?
          <TouchableOpacity 
          onPress={() => deleteUserPost()}
          className='mb-3 bg-red-500 mt-1 p-4 rounded-full flex-row items-center justify-center'>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text className="text-center text-[15px] font-semibold text-white">Delete Post</Text>
            <FontAwesome name="trash" size={20} color="white" style={{marginLeft: 10}} />
          </View>
        </TouchableOpacity>
          :
          <TouchableOpacity 
        onPress={()=>sendEmailMessage()}
        className='mb-3 bg-gray-900  p-4 mt-2 rounded-full '>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text className="text-center text-[15px] font-semibold text-white">Contact Seller</Text>
        <Icon name="envelope" size={20} color="white" style={{marginLeft: 10}} />
        </View>
        </TouchableOpacity>
        
          
      }
        
        
      </View>
      
      {/* User info */}
      {/* <View className="p-2 flex flex-row items-center gap-2 bg-gray-100 ">
        <Image source={{uri:product.userImage}}
        className="h-12 w-12 rounded-full mb-2 "/>
        <View className='mb-2'>
          <Text className="font-semibold text-[18px] text-gray-900 ">{product.userName}</Text>
          <Text className="font-semibold text-gray-600">{product.userEmail} </Text>
        </View>
      </View> */}
      
    </ScrollView>
  )
}