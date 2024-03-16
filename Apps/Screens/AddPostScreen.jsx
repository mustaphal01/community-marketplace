import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const {user}=useUser();
  const[categoryList,setCategoryList]=useState([]);
  useEffect(() => {
    getCategoryList();
  }, [])
  
  // Get Category List

  const getCategoryList=async()=>{
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    
    querySnapshot.forEach((doc) => {
      
      setCategoryList(categoryList=>[...categoryList,doc.data()]);
    })
  }

  // use to pick image from gallery

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod=async(value, { setSubmitting, setFieldValue })=>{ 
    setLoading(true);
    
    //Convert Uri to blob file
    const resp=await fetch(image);
    const blob=await resp.blob();
    const storageRef = ref(storage, 'communityPost/'+Date.now()+".jpg");

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl) => {
        // console.log(downloadUrl);
        value.image=downloadUrl;
        value.userName=user.fullName;
        value.userEmail=user.primaryEmailAddress.emailAddress;
        value.userImage=user.imageUrl;

        const docRef = await addDoc(collection(db,"UserPost"), value)
        if(docRef.id)
        {
          setLoading(false);
          setSubmitting(false);
          Alert.alert('Success','Post Added Successfully!');  
          setImage(null); // Reset image state
        setFieldValue('title', ''); // Reset title field
        setFieldValue('desc', ''); // Reset description field
        setFieldValue('category', ''); // Reset category field
        setFieldValue('address', ''); // Reset address field
        setFieldValue('price', ''); // Reset price field
        setFieldValue('phoneNum', ''); // Reset phone number field
        }
      })
    });

    
  }
  return (
    <KeyboardAvoidingView className='flex-1 bg-white'>
    <ScrollView className="p-10 mt-[22px]">
      <Text className="text-[27px] font-bold">Create New Post</Text>
      <Text className="text-[16px] font-semibold text-gray-500 mb-3">Start Selling..</Text>
      <Formik
        initialValues={{title:'',desc:'',category:'', address:'',price:'',image:'',userName:'',userEmail:'',userImage:'', phoneNum:'', createdAt:new Date().toDateString()}}
        onSubmit={(values, { setSubmitting, setFieldValue }) => onSubmitMethod(values, { setSubmitting, setFieldValue })}
        validate={(values)=>{
          const errors={};
          if(!values.title)
          {
            
            ToastAndroid.show('Title is required',ToastAndroid.SHORT)
            errors.name='Title is required';
            
          }
          return errors;
        }}
      >
        {({handleChange,handleBlur,handleSubmit,values, setFieldValue,errors})=>(
          <View>
            <TouchableOpacity onPress={pickImage}>
            {image?
              <Image source={{uri:image}} style={{width:100, height:100, borderRadius:15}}/>
              
              :
              <Image source={require('./../../assets/images/placeholder.jpg')} 
              style={{width:100, height:100, borderRadius:15, borderWidth:1, borderColor:'#ccc'}}
              />
              
              }
              
              
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder='Title'
              value={values?.title}
              onChangeText= {handleChange('title')}
            />
            <TextInput
              style={styles.input}
              placeholder='Description'
              value={values?.desc}
              numberOfLines={5}
              onChangeText= {handleChange('desc')}
            />
            <TextInput
              style={styles.input}
              placeholder='Price'
              value={values?.price}
              keyboardType='numeric'
              onChangeText= {handleChange('price')}
            />
            <TextInput
              style={styles.input}
              placeholder='Address'
              value={values?.address}
              onChangeText= {handleChange('address')}
            />
            <TextInput
              style={styles.input}
              placeholder='Phone-Number'
              value={values?.phoneNum}
              keyboardType='numeric'
              onChangeText= {handleChange('phoneNum')}
            />

            {/* Category list dropdown */}

            <View style={{borderWidth:1, borderRadius:10, marginTop:15}}>
            <Picker
            selectedValue={values?.category}
            className="border-2 "
            onValueChange={itemValue=>setFieldValue('category',itemValue)}
            >
              {categoryList&&categoryList.map((item,index)=>(
                <Picker.Item key={index}
                label={item?.name} value={item?.name} />
              ))}
            
            </Picker>

            </View>

            <TouchableOpacity onPress={handleSubmit}
            style={{
              backgroundColor:loading?'#ccc':'#007BFF'
            }}
            disabled={loading}
            className="p-4 bg-blue-500 rounded-full mt-3 mb-20">
              {loading?
                <ActivityIndicator color="#fff" />
                :
                <Text className="text-white text-center text-[16px]">Submit</Text>
              }
            </TouchableOpacity>

          </View>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>	
  )
}

const styles = StyleSheet.create({
  input:{
    
    borderColor:'gray',
    borderWidth:1,
    borderRadius:10,
    padding:10,
    marginTop:15,
    marginBottom:5,	
    paddingHorizontal:17,
    textAlignVertical:'top',
    fontSize:17,
    
  }

})