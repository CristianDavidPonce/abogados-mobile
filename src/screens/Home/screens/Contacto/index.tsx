import React from 'react'
import { Linking, ScrollView } from 'react-native'
import { Appbar, Card, List, Text, useTheme } from 'react-native-paper'
import Spacer from '~/components/Utils/Spacer'

const Contacto = () => {
  const theme = useTheme()
  return (
    <>
      <Appbar>
        <Appbar.Content title='Contacto' />
      </Appbar>
      <ScrollView style={{ backgroundColor: theme.colors.surface }}>
        <Card style={{ margin: 20 }}>
          <Card.Title title='Necesitas ayuda ?' />
          <Card.Content
            style={{
              flex: 1,
            }}
          >
            <Text>Contáctanos por los siguientes canales:</Text>
            <Spacer />
            <List.Item
              title={'0984069004'}
              style={{ width: '100%' }}
              description={'Call Center'}
              left={(props) => <List.Icon {...props} icon='phone' />}
              onPress={() => {
                Linking.openURL('tel:0984069004')
              }}
            />
            <List.Item
              title={'+593984069004'}
              style={{ width: '100%' }}
              description={'Whatsapp'}
              left={(props) => <List.Icon {...props} icon='whatsapp' />}
              onPress={() => {
                Linking.openURL(
                  'https://api.whatsapp.com/send?phone=+593984069004&text=Necesito información acerca de sus servicios.'
                )
              }}
            />
            <List.Item
              title={'info@sdabogados.com'}
              style={{ width: '100%' }}
              description={'Correo'}
              left={(props) => <List.Icon {...props} icon='mail' />}
              onPress={() => {
                Linking.openURL(
                  'mailto:info@sdabogados.com?subject=Necesito ayuda&body=Necesito ayuda me pueden contactar'
                )
              }}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  )
}

export default Contacto
