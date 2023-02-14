import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Signup from '../Signup'

const Stack = createNativeStackNavigator()
const Navigator = () => {
  return (
    <>
      <StatusBar style='light' translucent={false} />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen
            name='Signup'
            component={Signup}
            options={{ animation: 'fade_from_bottom' }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </>
  )
}

export default Navigator
