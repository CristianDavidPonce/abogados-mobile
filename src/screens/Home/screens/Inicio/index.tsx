import { RootStackParamList } from '@/screens/Navigator/types'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Inicio = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Inicio'>>()
  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Button mode='contained-tonal'>Inicia Sesión</Button>
        <Text>o</Text>
        <Button
          mode='contained-tonal'
          onPress={() => navigation.navigate('Signup')}
        >
          Regístrate
        </Button>
      </View>
    </ScrollView>
  )
}

export default Inicio
