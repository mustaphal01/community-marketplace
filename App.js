import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Apps/Screens/LoginScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Apps/Navigations/TabNavigation";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_cGxlYXNlZC1sb2N1c3QtNjcuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <View className="flex-1 style={{ backgroundColor: '#eeeee4' }}">
        <StatusBar style="auto" />

        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
