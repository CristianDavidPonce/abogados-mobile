import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
interface IProps {
  value?: string
  type?: 'default' | 'error'
}
const Alerta = ({ value }: IProps) => {
  const theme = useTheme()
  return (
    <View
      style={{
        borderColor: theme.colors.error,
        borderWidth: 1,
        backgroundColor: theme.colors.errorContainer,
        borderRadius: 6,
        marginVertical: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <MaterialIcons
        name='error'
        size={24}
        color={theme.colors.error}
        style={{ marginRight: 10 }}
      />
      <Text style={{ color: theme.colors.error }}>{value}</Text>
    </View>
  )
}

export default Alerta
