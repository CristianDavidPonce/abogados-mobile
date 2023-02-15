import { Input, Select } from '~/components/Form'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { Appbar, Button, Card, Text, TextInput } from 'react-native-paper'
import { RootStackParamList } from '../Navigator/types'
import { ICreate, IGetOptions } from './types'
import { useCreateOne, useGetOptions } from '~/rest'
import config from '~/config'
import useVisible from '~/hooks/useVisible'

const url = 'register'

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Inicio'>>()
  const form = useForm<ICreate>({
    defaultValues: {
      pais: 'ECU',
      business: config.business,
    },
  })
  const mutation = useCreateOne<ICreate>({
    url,
    onSuccess: () => navigation.navigate('Login'),
  })
  const onSubmit: SubmitHandler<ICreate> = (x) => {
    mutation.mutate(x)
  }
  const options = useGetOptions<IGetOptions>({ url })
  const pass = useVisible()
  const pass1 = useVisible()
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Registrarse' />
      </Appbar>
      <ScrollView>
        <FormProvider {...form}>
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Card.Title title='Ingresa tus datos a continuación' />
              <Input
                name='nombres'
                label='Nombres'
                rules={{ required: { value: true, message: 'Requerido' } }}
                left={<TextInput.Icon icon='account' />}
              />
              <Input
                name='apellidos'
                label='Apellidos'
                rules={{ required: { value: true, message: 'Requerido' } }}
                left={<TextInput.Icon icon='account' />}
              />

              <Input
                name='identification'
                label='Cédula o Pasaporte'
                left={<TextInput.Icon icon='passport' />}
                rules={{ required: { value: true, message: 'Requerido' } }}
              />
              <Input
                name='email'
                label='Correo'
                left={<TextInput.Icon icon='email' />}
                keyboardType='email-address'
                rules={{ required: { value: true, message: 'Requerido' } }}
              />
              <Input
                name='telefonos.0.telefono'
                label='Teléfono'
                left={<TextInput.Icon icon='phone' />}
                keyboardType='phone-pad'
                rules={{
                  required: { value: true, message: 'Requerido' },
                  validate: (value: string) => {
                    const matches = value.match(
                      /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
                    )
                    return (
                      (matches && matches?.length > 0) || 'Debe ser un número'
                    )
                  },
                }}
              />
              <Select
                name='pais'
                list={options.data?.options.pais}
                label='País'
                left={<TextInput.Icon icon='map' />}
              />
              <Input
                name='password'
                label='Contraseña'
                rules={{ required: { value: true, message: 'Requerido' } }}
                secureTextEntry={!pass.visible}
                right={
                  <TextInput.Icon
                    icon={pass.visible ? 'eye' : 'eye-off'}
                    onPress={pass.change}
                  />
                }
                left={<TextInput.Icon icon='lock' />}
              />
              <Input
                name='password1'
                label='Confirmar Contraseña'
                rules={{
                  required: { value: true, message: 'Requerido' },
                  validate: (x) =>
                    x === form.watch('password')
                      ? true
                      : 'Las contraseñas no coinciden.',
                }}
                secureTextEntry={!pass1.visible}
                right={
                  <TextInput.Icon
                    icon={pass1.visible ? 'eye' : 'eye-off'}
                    onPress={pass1.change}
                  />
                }
                left={<TextInput.Icon icon='lock' />}
              />
              <Button
                mode='contained'
                onPress={form.handleSubmit(onSubmit)}
                disabled={mutation.isLoading}
                loading={mutation.isLoading}
              >
                Registrarse
              </Button>
              <Text variant='bodySmall' style={{ marginTop: 10 }}>
                Al registrarse, usted acepta los terminos y condiciones del
                servicio y las politicas de privacidad.
              </Text>
            </Card.Content>
          </Card>
        </FormProvider>
      </ScrollView>
    </>
  )
}

export default Signup
