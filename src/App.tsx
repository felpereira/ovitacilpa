import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TelaPrincipal from './screens/TelaPrincipal'
import TelaSecundaria from './screens/TelaSecundaria'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

import { applyMigrationsAsync } from './modules/database'
import ConfigComponent from './screens/AdicionarComponent/ConfigComponent'

import Configuracoes from './screens/Configuracores/Configuracoes'
import { Telas } from './modules/Types'
import TelasServices from './services/TelasService'

interface State {
  listaComponentesTelas: Array<Telas>
}

class App extends React.Component<{}, {}> {
  state: State = {
    listaComponentesTelas: [],
  }

  componentDidMount = async () => {
    await applyMigrationsAsync()
    await this.AtualizarTela()
  }

  AtualizarTela = async () => {
    const resultadoServicos = await Promise.all([
      new TelasServices().getAsync(),
    ])

    const listaComponentesTelas = resultadoServicos[0]

    this.setState({
      listaComponentesTelas,
    })
  }

  render() {
    const Stack = createNativeStackNavigator()

    const { listaComponentesTelas } = this.state

    console.log('listaComponentesTelas[0]' + listaComponentesTelas[0])

    return (
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={this.BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={TelaPrincipal} />
          <Stack.Screen name="TelaSecundaria" component={TelaSecundaria} />
          <Stack.Screen name="Configuracoes" component={Configuracoes} />
          <Stack.Screen
            name="ConfigComponent"
            component={ConfigComponent}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  BottomTabNavigator = () => {
    const BottomTab = createBottomTabNavigator()

    return (
      <BottomTab.Navigator initialRouteName="Home">
        <BottomTab.Screen
          name="Home"
          component={TelaPrincipal}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome
                size={30}
                style={{ marginBottom: -3, color: 'white' }}
                name={'home'}
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="Configurações"
          component={Configuracoes}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome
                size={30}
                style={{ marginBottom: -3, color: 'white' }}
                name={'gear'}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    )
  }
}

export default App
