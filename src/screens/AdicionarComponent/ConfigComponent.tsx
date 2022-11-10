import * as React from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native'

import { TextBox } from '../../components/TextBox'
import { Space } from '../../components/Space'
import ComponentService from '../../services/ComponentService'
import { ComponentesTelas, TipoComponent } from '../../modules/Types'

import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'

import { TextInputMask } from 'react-native-masked-text'
import { Button } from '../../components/Button'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  route: NavigationRoute
}

interface State {
  campos: ComponentesTelas
  listaComponentesTelas: Array<ComponentesTelas>
}

class ConfigComponent extends React.Component<Props> {
  state: State = {
    listaComponentesTelas: [],
    campos: {
      id: -1,
      chave: '',
      valor: '',
      ordenacao: 0,
      tela: 0,
      tipo: TipoComponent.Money,
    },
  }

  async componentDidMount() {
    const { params } = this.props.route

    if (!params) {
      return
    }

    console.log(params.dados)

    this.setState({
      campos: params.dados,
    })
  }

  handleChange = (nome: string, value: any) => {
    this.setState({
      campos: {
        ...this.state.campos,
        [nome]: value,
      },
    })
  }

  handleSaveChange = async () => {
    if (this.state.campos.chave.length == 0) {
      return
    }

    var componentService = new ComponentService()
    await componentService.saveAsync(this.state.campos)
    this.props.navigation.goBack()
  }

  handleDelete = async () => {
    var componentService = new ComponentService()
    await componentService.deleteAsync(this.state.campos.id)
    this.props.navigation.goBack()
  }

  render() {
    const { campos } = this.state

    return (
      <View style={styles.container}>
        <Text
          style={{
            color: 'white',
            textAlignVertical: 'center',
            textAlign: 'center',
            height: 50,
            fontSize: 30,
          }}
        >
          {campos.id > -1 ? 'Editar' : 'Adicionar'}
        </Text>
        <TextBox
          text={'Descrição'}
          onChangeText={value => this.handleChange('chave', value)}
          value={campos.chave}
        />

        <TextBox
          text={'Valor'}
          onChangeText={value => this.handleChange('valor', value)}
          value={campos.valor}
          type={'money'}
        />

        <View style={styles.Card}>
          <Button
            text={campos.id > -1 ? 'Editar' : 'Adicionar'}
            onPress={this.handleSaveChange}
          />
          <Space width={5} />
          {campos.id > -1 && (
            <>
              <Button text={'Deletar'} onPress={this.handleDelete} />
              <Space width={5} />
            </>
          )}
          <Button
            text={'Voltar'}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    )
  }
}

export default ConfigComponent

const styles = StyleSheet.create({
  botaoText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
    margin: 25,
    justifyContent: 'center',
    marginTop: 70,
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
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
})
