import { View, Text, Image, TouchableOpacity } from 'react-native'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';



WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

    return (
        <View>
            <Image source={require('./../../assets/images/login.jpg')}
                className="w-full h-[400px] object-cover"
            />
            <View className="p-8 bg-white mt-[-20px] rounded-t-3xl">
  <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 90 }}>
    <Text className="text-[30px] font-semibold text-center flex-1 pr-2">Store X</Text>
    <Image
      source={require('./../../assets/images/shopping-bag.png')}
      style={{ width: 40, height: 40 }}
    />
  </View>
  <Text className="text-[22px] text-center text-slate-700 mt-10">
    Online Destination For All Your Buying & Selling Needs. ABUAD Exclusive
  </Text>
  <TouchableOpacity onPress={onPress} className="p-4 bg-gray-900 rounded-full mt-20">
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('./../../assets/images/google.png')}
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
      <Text className="text-white font-semibold text-[19px]">Start Shopping</Text>
    </View>
  </TouchableOpacity>
</View>
        </View>
    )
}