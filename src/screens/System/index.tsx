import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Clipboard, ScrollView } from 'react-native'
import { Appbar, Button, Card, Divider, List, Text } from 'react-native-paper'
import { registerForPushNotificationsAsync } from '~/services/notifications'
import { RootStackParamList } from '../Navigator/types'
import * as Updates from 'expo-updates'

const System = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tramites'>>()

  const [loading, setLoading] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('')
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token || '')
    )
  }, [])
  async function fun() {
    setLoading(true)
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        // ... notify user of update ...
        await Updates.reloadAsync()
        setLoading(false)
      } else {
        alert('Su aplicación esta actualizada')
        setLoading(false)
      }
    } catch (error) {
      alert(error)
      setLoading(false)
    }
  }
  return (
    <>
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Appbar.Content title={'Sistema'} />
      </Appbar>

      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Card mode='outlined'>
          <List.Subheader>Sistema</List.Subheader>
          <Card.Content>
            <Text>Ambiente: Prod</Text>
            <Text>Versión: 1.0.0</Text>
            <Divider style={{ marginTop: 10 }} />
          </Card.Content>

          <List.Subheader>Actualizaciones</List.Subheader>
          <Card.Content>
            {
              <Button
                disabled={loading}
                icon='reload'
                mode='contained-tonal'
                onPress={() => {
                  return fun()
                }}
              >
                Actualizar
              </Button>
            }
            <Divider style={{ marginTop: 10 }} />
          </Card.Content>
          <List.Subheader>Notificaciones</List.Subheader>
          <Card.Content>
            <Text> {expoPushToken}</Text>
            <Button
              onPress={() => {
                Clipboard.setString(expoPushToken)
              }}
            >
              Copiar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  )
}

export default System
