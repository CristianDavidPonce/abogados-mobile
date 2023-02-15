import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { Appbar, Button, Card, useTheme } from 'react-native-paper'
import { RootStackParamList } from '~/screens/Navigator/types'

const Utilidades = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Liquidacion'>
    >()
  const theme = useTheme()
  return (
    <>
      <Appbar>
        <Appbar.Content title='Utilidades' />
      </Appbar>
      <ScrollView style={{ backgroundColor: theme.colors.surface }}>
        <Card style={{ margin: 20 }}>
          <Card.Title
            title='Cálculo de liquidación laboral'
            titleVariant='titleLarge'
          />
          <Card.Content>
            <Text>Calcule su liquidacion laboral</Text>
          </Card.Content>

          <Button
            mode='contained'
            style={{ margin: 14 }}
            onPress={() => navigation.navigate('Liquidacion')}
          >
            Calcular
          </Button>
        </Card>
        <Card style={{ margin: 20 }}>
          <Card.Title
            title='Cálculo de jubilación patronal'
            titleVariant='titleLarge'
          />
          <Card.Content>
            <Text>Calcule el valor de su jubilacion patronal</Text>
          </Card.Content>

          <Button
            mode='contained'
            style={{ margin: 14 }}
            onPress={() => navigation.navigate('Jubilacion')}
          >
            Calcular
          </Button>
        </Card>
      </ScrollView>
    </>
  )
}

export default Utilidades
