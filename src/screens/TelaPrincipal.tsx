import { ComponentesTelas } from '../modules/Types'
import * as React from 'react'

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from 'react-native'

import ComponentService from '../services/ComponentService'

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'

import { Button } from '../components/Button'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface State {
  listaComponentesTelas: Array<ComponentesTelas>
}

class TelaPrincipal extends React.Component<Props> {
  [x: string]: any

  state: State = {
    listaComponentesTelas: [],
  }

  componentDidMount = () => {
    // Arrumar essa gambiarra
    this.AtualizarTela()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.AtualizarTela()
    })
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  onPress = (dados: ComponentesTelas) => {
    this.props.navigation.navigate('ConfigComponent', {
      dados,
    })
  }

  AtualizarTela = async () => {
    const resultadoServicos = await Promise.all([
      new ComponentService().getAsync(),
    ])

    const listaComponentesTelas = resultadoServicos[0]

    this.setState({
      listaComponentesTelas,
    })
  }

  render() {
    const { listaComponentesTelas } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Minhas Finanças</Text>
        <ScrollView>
          {listaComponentesTelas &&
            listaComponentesTelas.map((components, index) => {
              return (
                <React.Fragment key={index}>
                  <TouchableHighlight onPress={() => this.onPress(components)}>
                    <View style={styles.Card}>
                      <Text style={styles.left}>{components.chave}</Text>
                      <Text style={styles.right}>{components.valor}</Text>
                    </View>
                  </TouchableHighlight>
                </React.Fragment>
              )
            })}
        </ScrollView>
        <View
          style={{
            alignSelf: 'flex-end',
          }}
        >
          <Button
            text={'Adicionar'}
            onPress={() => this.props.navigation.navigate('ConfigComponent')}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default TelaPrincipal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
    margin: 25,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  left: {
    width: '70%',
    color: 'white',
  },
  right: {
    width: '30%',
    color: 'white',
  },
  Card: {
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
    width: 300,
  },
})
