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
import { DatePicker, Input } from '~/components/Form'
import Spacer from '~/components/Utils/Spacer'
import { RootStackParamList } from '~/screens/Navigator/types'
import { ILiquidacion, liquidacion } from '~/utils/calculos'
import { isNumber } from '~/utils/validate'

const Liquidacion = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Liquidacion'>
    >()
  const theme = useTheme()
  const form = useForm<ILiquidacion>({
    defaultValues: { noPagado: '0', vacacionesNoGozadas: '0' },
  })
  const [data, setData] = useState<ReturnType<typeof liquidacion>>()
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Liquidación laboral' />
      </Appbar>
      <ScrollView
        style={{ backgroundColor: theme.colors.surface, paddingHorizontal: 14 }}
      >
        {data ? (
          <Card mode='outlined'>
            <Card.Title title='Resultado' titleVariant='titleLarge' />
            <Card.Content>
              <Display label='Remuneracion no pagada' value={data.remuneraNo} />
              <Display label='Proporcional 13ro' value={data.proporcional13} />
              <Display label='Proporcional 14ro' value={data.proporcional14} />
              <Display label='Desahucio' value={data.desahucio} />
              <Display
                label='Vacaciones no gozadas'
                value={data.vacacionesNo}
              />
              <Display label='Despido' value={data.despido} />
              <Display
                label='Total a recibir sin juicio'
                value={data.total}
                result
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setData(undefined)}>Corregir</Button>
              <Button
                onPress={() => {
                  setData(undefined)
                  form.reset({ noPagado: '0', vacacionesNoGozadas: '0' })
                }}
              >
                Nuevo cálculo
              </Button>
            </Card.Actions>
          </Card>
        ) : (
          <FormProvider {...form}>
            <Text>Ingrese los siguientes datos para realizar el cálculo.</Text>
            <Spacer />
            <DatePicker
              name='contratacion'
              label='Fecha de Contratación'
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
              }}
            />
            <DatePicker
              name='terminacion'
              label='Fecha terminación de relación laboral '
              rules={{
                required: {
                  value: true,
                  message: 'Requerido',
                },
              }}
            />

            <Input
              name='ultimaRemuneracion'
              label='Última remuneración'
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
              name='noPagado'
              label='Remuneracion no pagada'
              left={<TextInput.Icon icon={'currency-usd'} />}
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
              name='vacacionesNoGozadas'
              label='Vacaciones no gozadas'
              left={<TextInput.Icon icon={'currency-usd'} />}
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
            <Button
              mode='contained'
              onPress={form.handleSubmit((x) => setData(liquidacion(x)))}
            >
              CALCULAR LIQUIDACION
            </Button>
          </FormProvider>
        )}
      </ScrollView>
    </>
  )
}

export default Liquidacion
interface IDisplay {
  label: string
  value: number
  result?: boolean
}
const Display = ({ label, value, result = false }: IDisplay) => {
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
      >{`$ ${value.toFixed(2)}`}</Text>
    </View>
  )
}
