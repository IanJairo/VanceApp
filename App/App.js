import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTestScreen from './screens/MyTestScreen';
import IntroScreen from './screens/introScreen'; 
import PresentationScreenOne from './screens/presentationScreenOne'; 
import PresentationScreenTwo from './screens/presentationScreenTwo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        {/* Defina a rota para a tela de teste */}
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="MyTest" component={MyTestScreen} />
        <Stack.Screen name="PresentationOne" component={PresentationScreenOne} />
        <Stack.Screen name="PresentationTwo" component={PresentationScreenTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
