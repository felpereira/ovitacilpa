import * as React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'

interface ButtonProperties {
  onPress: () => void
  text: string
}

export class Button extends React.Component<ButtonProperties> {
  render() {
    const { onPress, text } = this.props

    return (
      <View>
        <TouchableHighlight
          style={{
            backgroundColor: 'grey',
            borderWidth: 2,
            borderRadius: 10,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPress}
        >
          <Text style={styles.botaoText}>{text}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  botaoText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
})
