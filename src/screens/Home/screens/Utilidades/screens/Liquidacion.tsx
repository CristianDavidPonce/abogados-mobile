import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { DatePicker } from '~/components/Form'
import { RootStackParamList } from '~/screens/Navigator/types'

const Liquidacion = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Liquidacion'>
    >()
  const theme = useTheme()
  const form = useForm()
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Liquidacion labora' />
      </Appbar>
      <ScrollView style={{ backgroundColor: theme.colors.surface }}>
        <FormProvider {...form}>
          <DatePicker name='contratacion' label='Fecha de Contratación' />
        </FormProvider>
      </ScrollView>
    </>
  )
}

export default Liquidacion
