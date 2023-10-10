import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTestScreen from './screens/MyTestScreen'; // Importe a tela de teste
import IntroScreen from './screens/introScreen'; // Importe a tela de introdução

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        {/* Defina a rota para a tela de teste */}
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="MyTest" component={MyTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
