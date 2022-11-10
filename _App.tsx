import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaPrincipal from './src/screens/TelaPrincipal';
import TelaSecundaria from './src/screens/TelaSecundaria';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

class App extends React.Component<{}, {}> {
  render() {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>        
          <Stack.Screen          name="Root"          component={this.BottomTabNavigator}          options={{ headerShown: false }}        />
          <Stack.Screen name="Home" component={TelaPrincipal} />
          <Stack.Screen name="TelaSecundaria" component={TelaSecundaria} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }

  
  BottomTabNavigator = () => {
    const BottomTab = createBottomTabNavigator();
  
    return (
      <BottomTab.Navigator
        initialRouteName="TelaPrincipal"
      >
        <BottomTab.Screen
          name="TelaPrincipal"
          component={TelaPrincipal}
        
        />
  
        <BottomTab.Screen
          name="TelaSecundaria"
          component={TelaSecundaria}
         
        />
      </BottomTab.Navigator>
    );
  }


}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

