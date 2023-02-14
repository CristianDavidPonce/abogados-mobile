import { Input } from '~/components/Form'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { Appbar, Button, Card, Text, TextInput } from 'react-native-paper'
import { RootStackParamList } from '../Navigator/types'

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Inicio'>>()
  const form = useForm()
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
              <Card.Title title='Ingresa tus datos a continuacion' />
              <Input
                name='fistName'
                label='Nombres'
                rules={{ required: { value: true, message: 'Requerido' } }}
                left={<TextInput.Icon icon='account' />}
              />
              <Input
                name='lastName'
                label='Apellidos'
                rules={{ required: { value: true, message: 'Requerido' } }}
                left={<TextInput.Icon icon='account' />}
              />

              <Input
                name='identificacion'
                label='Cedula o pasaporte'
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
                name='phone'
                label='Telefono'
                left={<TextInput.Icon icon='phone' />}
                keyboardType='phone-pad'
                rules={{ required: { value: true, message: 'Requerido' } }}
              />
              <Input
                name='usuario'
                label='Nombre de Usuario'
                left={<TextInput.Icon icon='account' />}
                rules={{ required: { value: true, message: 'Requerido' } }}
              />
              <Input
                name='password'
                label='Contrasena'
                rules={{ required: { value: true, message: 'Requerido' } }}
                secureTextEntry
                right={<TextInput.Icon icon='eye' />}
                left={<TextInput.Icon icon='lock' />}
              />
              <Input
                name='password1'
                label='Repita Contrasena'
                rules={{ required: { value: true, message: 'Requerido' } }}
                secureTextEntry
                right={<TextInput.Icon icon='eye' />}
                left={<TextInput.Icon icon='lock' />}
              />
              <Button
                mode='contained'
                onPress={form.handleSubmit(() => alert('hola'))}
              >
                Registrarse
              </Button>
              <Text variant='bodySmall' style={{ marginTop: 10 }}>
                Al registrarse, usted acepta los terminos y condiciones del
                servicio y las politicas de privacidad
              </Text>
            </Card.Content>
          </Card>
        </FormProvider>
      </ScrollView>
    </>
  )
}

export default Signup
