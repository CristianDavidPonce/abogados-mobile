import React from 'react'
import { ScrollView, Text } from 'react-native'
import { Appbar, Button, Card, useTheme } from 'react-native-paper'

const Utilidades = () => {
  const theme = useTheme()
  return (
    <>
      <Appbar>
        <Appbar.Content title='Utilidades' />
      </Appbar>
      <ScrollView style={{ backgroundColor: theme.colors.surface }}>
        <Card style={{ margin: 20 }}>
          <Card.Title
            title='Cálculo de liquidación laboral'
            titleVariant='titleLarge'
          />
          <Card.Content>
            <Text>Calcule su liquidacion laboral</Text>
          </Card.Content>

          <Button mode='contained' style={{ margin: 14 }}>
            Calcular
          </Button>
        </Card>
        <Card style={{ margin: 20 }}>
          <Card.Title
            title='Cálculo de jubilación patronal'
            titleVariant='titleLarge'
          />
          <Card.Content>
            <Text>Calcule el valor de su jubilacion patronal</Text>
          </Card.Content>

          <Button mode='contained' style={{ margin: 14 }}>
            Calcular
          </Button>
        </Card>
      </ScrollView>
    </>
  )
}

export default Utilidades
