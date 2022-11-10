import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

interface TextBoxProperties {
  onChangeText: (valor: string) => void
  value: string
  text: string
  type?: string
}

export class TextBox extends React.Component<TextBoxProperties> {
  render() {
    const { onChangeText, text, value, type } = this.props

    return (
      <View style={styles.Card}>
        <Text style={styles.left}>{text}</Text>
        <View style={styles.right}>
          {type ? (
            <TextInputMask
              style={styles.TextInput}
              type={'money'}
              options={{
                maskType: 'BRL',
              }}
              value={value}
              onChangeText={onChangeText}
              maxLength={15}
            />
          ) : (
            <TextInput
              style={styles.TextInput}
              onChangeText={onChangeText}
              value={value}
            />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TextInput: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    minWidth: 100,
    borderRadius: 10,
    paddingHorizontal: 9,
  },
  Card: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
    width: 300,
  },
  left: {
    width: '30%',
    color: 'white',
    textAlign: 'right',
    paddingRight: 7,
    textAlignVertical: 'center',
  },
  right: {
    width: '70%',
    color: 'white',
  },
})
