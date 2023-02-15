import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { RootStackParamList } from '~/screens/Navigator/types'

const Jubilación = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Jubilacion'>>()
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Jubilación laboral' />
      </Appbar>
    </>
  )
}

export default Jubilación
