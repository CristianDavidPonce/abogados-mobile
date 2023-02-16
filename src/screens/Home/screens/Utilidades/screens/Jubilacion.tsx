import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import {
  Appbar,
  Button,
  Card,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper'
import { Input, Select } from '~/components/Form'
import Spacer from '~/components/Utils/Spacer'
import { RootStackParamList } from '~/screens/Navigator/types'
import { IJubilacion, jubilacion } from '~/utils/calculos'
import { isNumber } from '~/utils/validate'

const Jubilacion = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Jubilacion'>>()
  const theme = useTheme()
  const form = useForm<IJubilacion>({
    defaultValues: {},
  })
  const [data, setData] = useState<ReturnType<typeof jubilacion>>()
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Jubilación Patronal' />
      </Appbar>
      <ScrollView
        style={{ backgroundColor: theme.colors.surface, paddingHorizontal: 14 }}
      >
        {data ? (
          <Card mode='outlined'>
            <Card.Title title='Resultado' titleVariant='titleLarge' />
            <Card.Content>
              <Display
                label='Coeficiente Mensual'
                value={data.coeficienteMensual}
              />
              <Display
                label='Coeficiente Anual'
                value={data.coeficienteAnual}
              />
              <Display label='Años de servicio' value={data.years} />
              <Display label='Fondo Mensual' value={data.fondoMensual} money />
              <Display label='Total FG' value={data.total} result money />
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setData(undefined)}>Corregir</Button>
              <Button
                onPress={() => {
                  setData(undefined)
                  form.reset()
                }}
              >
                Nuevo cálculo
              </Button>
            </Card.Actions>
          </Card>
        ) : (
          <FormProvider {...form}>
            <Text variant='labelLarge'>
              Remuneraciones de los últimos 5 años de servicio
            </Text>
            <Text variant='bodySmall'>
              Nota 1: El año 1 es el más antiguo es decir como recorrimos 5 años
              atrás ese corresponde al año 1
            </Text>
            <Text variant='bodySmall'>
              Nota 2: Para cada año sumar todas las remuneraciones mensuales de
              ese año
            </Text>
            <Spacer />
            <Input
              name='year1'
              label='Remuneraciones del Año 1'
              keyboardType='numeric'
              left={<TextInput.Icon icon={'currency-usd'} />}
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'No puede ser negativo' },
                validate: isNumber,
              }}
            />
            <Input
              name='year2'
              label='Remuneraciones del Año 2'
              keyboardType='numeric'
              left={<TextInput.Icon icon={'currency-usd'} />}
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'No puede ser negativo' },
                validate: isNumber,
              }}
            />
            <Input
              name='year3'
              label='Remuneraciones del Año 3'
              keyboardType='numeric'
              left={<TextInput.Icon icon={'currency-usd'} />}
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'No puede ser negativo' },
                validate: isNumber,
              }}
            />
            <Input
              name='year4'
              label='Remuneraciones del Año 4'
              keyboardType='numeric'
              left={<TextInput.Icon icon={'currency-usd'} />}
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'No puede ser negativo' },
                validate: isNumber,
              }}
            />
            <Input
              name='year5'
              label='Remuneraciones del Año 5'
              keyboardType='numeric'
              left={<TextInput.Icon icon={'currency-usd'} />}
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'No puede ser negativo' },
                validate: isNumber,
              }}
            />
            <Text variant='labelLarge'>Tiempo de Servicio</Text>
            <Spacer />
            <Input
              name='servicio.years'
              label='Años de servicio'
              keyboardType='numeric'
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'No puede ser negativo' },
                validate: isNumber,
              }}
            />
            <Input
              name='servicio.months'
              label='Meses del último año servicio'
              keyboardType='numeric'
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'Debe ser un mes entre 0 y 12' },
                max: { value: 12, message: 'Debe ser un mes entre 0 y 12' },
                validate: isNumber,
              }}
            />
            <Input
              name='servicio.days'
              label='Días del último mes de servicio'
              keyboardType='numeric'
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: { value: 0, message: 'Debe ser un día entre 0 y 31' },
                max: { value: 31, message: 'Debe ser un día entre 0 y 31' },
                validate: isNumber,
              }}
            />
            <Text variant='labelLarge'>Datos personales</Text>
            <Text variant='bodySmall'>
              Estos datos son requeridos para la determinación de coeficientes
            </Text>
            <Spacer />
            <Input
              name='edad'
              label='Edad'
              keyboardType='numeric'
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
                min: {
                  value: 39,
                  message: 'La edad mínima para el cálculo es 39 años',
                },
                max: {
                  value: 99,
                  message: 'La edad máxima para el cálculo es 99 años',
                },
                validate: isNumber,
              }}
            />
            <Select
              name='sexo'
              label='Sexo'
              list={[
                {
                  label: 'Masculino',
                  value: 'M',
                },
                {
                  label: 'Femenino',
                  value: 'F',
                },
              ]}
            />
            <Button
              mode='contained'
              onPress={form.handleSubmit((x) => setData(jubilacion(x)))}
            >
              CALCULAR JUBILACION
            </Button>
          </FormProvider>
        )}
      </ScrollView>
    </>
  )
}

export default Jubilacion
interface IDisplay {
  label: string
  value: number
  result?: boolean
  money?: boolean
}
const Display = ({ label, value, result = false, money = false }: IDisplay) => {
  const theme = useTheme()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 7,
        alignItems: 'center',
      }}
    >
      <Text variant='bodyLarge'>{label}</Text>
      <Text
        variant={result ? 'titleLarge' : 'labelLarge'}
        style={{
          color: result ? theme.colors.error : 'default',
          fontWeight: result ? 'bold' : 'normal',
        }}
      >{`${money ? '$ ' : ''}${value.toFixed(2)}`}</Text>
    </View>
  )
}
