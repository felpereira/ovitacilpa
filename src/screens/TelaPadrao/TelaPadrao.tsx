import * as React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

class TelaSecundaria extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tela Secundaria</Text>

        <Button
          title="Tela Padrão"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

export default TelaSecundaria

const styles = StyleSheet.create({
  botaoText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
