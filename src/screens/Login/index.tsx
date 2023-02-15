import { Input } from '~/components/Form'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { ScrollView } from 'react-native'
import {
  Appbar,
  Button,
  Card,
  ProgressBar,
  TextInput,
} from 'react-native-paper'
import { RootStackParamList } from '../Navigator/types'
import { ICreate } from './types'
import { useCreateOne, useGetOne } from '~/rest'
import { useDispatch, useSelector } from 'react-redux'
import { IAuthUserAction } from '~/store/reducers/authUser'
import { Dispatch } from '@reduxjs/toolkit'
import { IValidateToken } from '~/types'
import { IRootState } from '~/store/reducers'

const url = 'auth'

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Inicio'>>()
  const form = useForm<ICreate>({})
  const dispatch = useDispatch<Dispatch<IAuthUserAction>>()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const mutation = useCreateOne<ICreate>({
    url,
    onSuccess: (data: any) => {
      dispatch({ type: 'setToken', token: data.token })
    },
    snack: false,
  })
  const validar = useGetOne<IValidateToken>({
    url,
    key: 'validatedash',
    enabled: user.token !== undefined,
    onSuccess: (data) => {
      dispatch({ type: 'setUser', user: data })
      navigation.navigate('Home')
    },
  })
  const onSubmit: SubmitHandler<ICreate> = (x) => {
    mutation.mutate(x)
  }
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Iniciar Sesión' />
      </Appbar>
      {validar.isFetching && <ProgressBar indeterminate />}
      <ScrollView>
        <FormProvider {...form}>
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Card.Title title='Ingresa tus datos a continuación' />

              <Input
                name='identification'
                label='Cédula o Pasaporte'
                left={<TextInput.Icon icon='passport' />}
                rules={{ required: { value: true, message: 'Requerido' } }}
              />

              <Input
                name='password'
                label='Contraseña'
                rules={{ required: { value: true, message: 'Requerido' } }}
                secureTextEntry
                right={<TextInput.Icon icon='eye' />}
                left={<TextInput.Icon icon='lock' />}
              />

              <Button
                mode='contained'
                onPress={form.handleSubmit(onSubmit)}
                disabled={mutation.isLoading}
                loading={mutation.isLoading}
              >
                Entrar
              </Button>
            </Card.Content>
          </Card>
        </FormProvider>
      </ScrollView>
    </>
  )
}

export default Login
