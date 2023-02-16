import Navigator from './src/screens/Navigator'
import { Provider as ProviderRedux } from 'react-redux'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~/store/store'

const queryClient = new QueryClient()
export default function App() {
  return (
    <ProviderRedux store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Navigator />
        </QueryClientProvider>
      </PersistGate>
    </ProviderRedux>
  )
}
