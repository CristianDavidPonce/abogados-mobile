import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Signup from '../Signup'
import Login from '../Login'
import Liquidacion from '../Home/screens/Utilidades/screens/Liquidacion'
import Jubilación from '../Home/screens/Utilidades/screens/Jubilacion'

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
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ animation: 'fade_from_bottom' }}
          />
          <Stack.Screen
            name='Liquidacion'
            component={Liquidacion}
            options={{ animation: 'fade_from_bottom' }}
          />
          <Stack.Screen
            name='Jubilacion'
            component={Jubilación}
            options={{ animation: 'fade_from_bottom' }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </>
  )
}

export default Navigator
