import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Appbar, Button, Text, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import NoValidated from '~/components/Utils/NoValidated'
import { RootStackParamList } from '~/screens/Navigator/types'
import { IRootState } from '~/store/reducers'

const Inicio = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Inicio'>>()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const theme = useTheme()
  return (
    <>
      <Appbar>
        <Appbar.Content title='Inicio' />
      </Appbar>
      {user.isValidated ? (
        <ScrollView style={{ backgroundColor: theme.colors.surface }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <Text>Bienvenido 👋 {user.user?.nombres}</Text>
            <Text>Que vamos a hacer hoy?</Text>
            <View style={{ height: 20 }} />
            <Button
              mode='contained-tonal'
              onPress={() => navigation.navigate('Utilidades')}
            >
              Ir a utilidades
            </Button>
          </View>
        </ScrollView>
      ) : (
        <NoValidated />
      )}
    </>
  )
}

export default Inicio
