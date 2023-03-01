import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home'
import { Platform, SafeAreaView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Signup from '../Signup'
import Login from '../Login'
import { Button, Provider as PaperProvider, Text } from 'react-native-paper'
import Liquidacion from '../Home/screens/Utilidades/screens/Liquidacion'
import Jubilación from '../Home/screens/Utilidades/screens/Jubilacion'
import Snack from '~/components/Utils/SnackBar'
import { useSelector } from 'react-redux'
import { IRootState } from '~/store/reducers'
import { darkTheme, theme } from '~/core/theme'
import { NavigationContainer } from '@react-navigation/native'
import Detail from '../Home/screens/Tramites/Detail'
import * as Updates from 'expo-updates'
import System from '../System'

const Stack = createNativeStackNavigator()
const Navigator = () => {
  const mode = useSelector<IRootState, IRootState['modeReducer']>(
    (x) => x.modeReducer
  )
  const tema = mode.isDark ? darkTheme : theme
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    async function fun() {
      try {
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          setUpdate(true)
          await Updates.fetchUpdateAsync()
          await Updates.reloadAsync()
        }
      } catch (error) {}
    }
    fun()
  }, [])
  return (
    <PaperProvider theme={tema}>
      <NavigationContainer theme={tema as any}>
        <StatusBar
          backgroundColor={tema.colors.surface}
          style={mode.isDark && Platform.OS === 'android' ? 'light' : 'dark'}
          translucent={false}
        />
        <SafeAreaView style={{ flex: 1 }}>
          {update && (
            <>
              <View
                style={{
                  padding: 20,
                  backgroundColor: theme.colors.background,
                  borderColor: '#faad14',
                  borderWidth: 1,
                  borderRadius: 4,
                  marginBottom: 10,
                }}
              >
                <Text>
                  Nueva actualización encontrada, presione actualizar para
                  obtener las nuevas características.
                </Text>
                <Button
                  mode='outlined'
                  loading
                  onPress={async () => {
                    try {
                      await Updates.fetchUpdateAsync()
                      // ... notify user of update ...
                      await Updates.reloadAsync()
                    } catch (e) {
                      alert(e)
                    }
                  }}
                >
                  Actualizando
                </Button>
              </View>
            </>
          )}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen
              name='Signup'
              component={Signup}
              options={{ animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name='Liquidacion'
              component={Liquidacion}
              options={{ animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name='Jubilacion'
              component={Jubilación}
              options={{ animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name='TramiteDetail'
              component={Detail}
              options={{ animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name='System'
              component={System}
              options={{ animation: 'fade_from_bottom' }}
            />
          </Stack.Navigator>
        </SafeAreaView>
        <Snack />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default Navigator
