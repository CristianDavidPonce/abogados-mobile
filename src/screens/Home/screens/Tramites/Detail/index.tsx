import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import moment from 'moment'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Appbar, Chip, ProgressBar, Text } from 'react-native-paper'
import { useGetOne, useGetOptions } from '~/rest'
import { RootStackParamList } from '~/screens/Navigator/types'
import { optionMatch } from '~/utils/optionMatch'
import { IGetOne, IGetOptions, url } from '../types'

const Detail = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'TramiteDetail'>
    >()
  const router = useRoute<RouteProp<RootStackParamList, 'TramiteDetail'>>()
  const data = useGetOne<IGetOne>({ url, _id: router.params._id })
  const options = useGetOptions<IGetOptions>({ url })
  return (
    <View>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={router.params.name} />
      </Appbar>
      {data.isFetching && <ProgressBar indeterminate />}
      {data.isError && (
        <View>
          <Text variant='labelMedium'>
            {data.error.response?.data.message || data.error.message}
          </Text>
        </View>
      )}
      <ScrollView style={{ padding: 18 }}>
        <Text variant='labelLarge'>{data?.data?.result?.titulo}</Text>
        <Text variant='bodySmall'>{data.data?.result.descripcion}</Text>
        <Chip style={{ width: 100, marginVertical: 10 }}>
          {optionMatch(data.data?.result.estado, options.data?.options.estado)}
        </Chip>
        <Text variant='bodySmall'>
          {data.data?.result.fechaTramite &&
            moment(data.data.result.fechaTramite).format('YYYY-MM-DD')}
        </Text>
      </ScrollView>
    </View>
  )
}

export default Detail
