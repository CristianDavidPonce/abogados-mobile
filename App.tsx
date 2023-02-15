import Navigator from './src/screens/Navigator'
import { Provider as ProviderRedux } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~/store/store'
import Snack from '~/components/Utils/SnackBar'

const queryClient = new QueryClient()
export default function App() {
  return (
    <ProviderRedux store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <NavigationContainer>
              <Navigator />
              <Snack />
            </NavigationContainer>
          </PaperProvider>
        </QueryClientProvider>
      </PersistGate>
    </ProviderRedux>
  )
}
