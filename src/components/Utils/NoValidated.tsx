import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import { Button, Card, Text, useTheme } from 'react-native-paper'
import { RootStackParamList } from '~/screens/Navigator/types'
import Spacer from './Spacer'

const NoValidated = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Inicio'>>()
  const theme = useTheme()
  return (
    <ScrollView style={{ backgroundColor: theme.colors.surface }}>
      <Card style={{ margin: 20 }}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Text>Inicia sesión para acceder a todos los recursos</Text>
          <Spacer />
          <Button
            mode='contained-tonal'
            onPress={() => navigation.navigate('Login')}
          >
            Inicia Sesión
          </Button>
          <Spacer />
          <Text>No tienes una cuenta?</Text>
          <Spacer />
          <Button
            mode='contained-tonal'
            onPress={() => navigation.navigate('Signup')}
          >
            Regístrate
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

export default NoValidated
