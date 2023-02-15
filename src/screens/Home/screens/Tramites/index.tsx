import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import NoValidated from '~/components/Utils/NoValidated'
import { IRootState } from '~/store/reducers'

const Tramites = () => {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const theme = useTheme()
  return (
    <>
      <Appbar>
        <Appbar.Content title='Mis Trámites y Casos' />
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
            <Text>Tramites</Text>
            <View style={{ height: 20 }} />
          </View>
        </ScrollView>
      ) : (
        <NoValidated />
      )}
    </>
  )
}

export default Tramites
