import React from 'react'
import { Card, Text } from 'react-native-paper'
interface IProps {
  value?: string
}
const NoResult = ({ value }: IProps) => {
  return (
    <Card mode='outlined' style={{ margin: 15 }}>
      <Card.Content>
        <Text>{value || 'Sin resultados 🙁'}</Text>
      </Card.Content>
    </Card>
  )
}

export default NoResult
