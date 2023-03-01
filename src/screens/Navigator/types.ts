export type RootStackParamList = {
  Home: undefined
  Contacto: undefined
  Inicio: undefined
  Tramites: undefined
  Signup: undefined
  Login: undefined
  Utilidades: undefined
  Liquidacion: undefined
  Jubilacion: undefined
  TramiteDetail: { _id: string; name: string }
  Feed: { sort: 'latest' | 'top' } | undefined
}
