import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { Chip, Divider, List, ProgressBar } from 'react-native-paper'
import Alerta from '~/components/Utils/Alerta'
import NoResult from '~/components/Utils/NoResult'
import { useGet, useGetOptions } from '~/rest'
import { RootStackParamList } from '~/screens/Navigator/types'
import { optionMatch } from '~/utils/optionMatch'
import { IGetOptions, IResponse, url } from './types'

const Lista = () => {
  const data = useGet<IResponse>({
    url,
    params: { params: { $limit: 10000, $page: 1 } },
  })
  const options = useGetOptions<IGetOptions>({ url })
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tramites'>>()
  return (
    <View>
      {data.isFetching && <ProgressBar indeterminate />}
      {data.isError && (
        <Alerta
          value={data.error.response?.data.message || data.error.message}
        />
      )}

      {data.data?.total === 0 && !data.isFetching && <NoResult />}

      <FlatList
        data={data.data?.data}
        keyExtractor={(x) => x._id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => data.refetch()} />
        }
        renderItem={({ item }) => (
          <View>
            <List.Item
              title={item.titulo}
              description={item.descripcion}
              descriptionNumberOfLines={5}
              onPress={() =>
                navigation.navigate('TramiteDetail', {
                  _id: item._id,
                  name: item.titulo,
                })
              }
            />
            <Chip style={{ width: 100, marginStart: 15, marginBottom: 10 }}>
              {optionMatch(item.estado, options.data?.options.estado)}
            </Chip>
            <Divider />
          </View>
        )}
      />
    </View>
  )
}

export default Lista
