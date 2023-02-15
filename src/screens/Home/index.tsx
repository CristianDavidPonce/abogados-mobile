import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Inicio from './screens/Inicio'
import Utilidades from './screens/Utilidades'
import Contacto from './screens/Contacto'
import Tramites from './screens/Tramites'
import Mas from './screens/Mas'

const Tab = createMaterialBottomTabNavigator()

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Inicio'
        component={Inicio}
        options={{ tabBarIcon: 'home' }}
      />
      <Tab.Screen
        name='Utilidades'
        component={Utilidades}
        options={{ tabBarIcon: 'tools' }}
      />
      <Tab.Screen
        name='Tramites'
        component={Tramites}
        options={{ tabBarIcon: 'file', title: 'Trámites' }}
      />
      <Tab.Screen
        name='Contacto'
        component={Contacto}
        options={{ tabBarIcon: 'phone' }}
      />
      <Tab.Screen
        name='Mas'
        component={Mas}
        options={{ tabBarIcon: 'menu', title: 'Más' }}
      />
    </Tab.Navigator>
  )
}

export default Home
