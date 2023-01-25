import { useState, useEffect } from 'react'
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
import React from 'react'
import { ComponentesTelas } from 'modules/Types'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const TelaPrincipal = (props: Props) => {
  const [listaComponentesTelas, setListaComponentesTelas] = useState<
    Array<ComponentesTelas> | null
  >([])

  useEffect(() => {
    AtualizarTela()
  }, [])


  const onPress = (dados: ComponentesTelas) => {
    props.navigation.navigate('ConfigComponent', {
      dados,
    })
  }

  const AtualizarTela = async () => {
    const resultadoServicos = await Promise.all([
      new ComponentService().getAsync(),
    ])

    const listaComponentesTelas = resultadoServicos[0]

    setListaComponentesTelas(listaComponentesTelas)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minhas Finanças</Text>
      <ScrollView>
        {listaComponentesTelas &&
          listaComponentesTelas.map((components, index) => {
            return (
              <React.Fragment key={index}>
                <TouchableHighlight onPress={() => onPress(components)}>
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
          onPress={() => props.navigation.navigate('ConfigComponent')}
        />
      </View>
    </SafeAreaView>
  )
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
