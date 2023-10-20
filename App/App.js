import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTestScreen from './screens/MyTestScreen';
import IntroScreen from './screens/introScreen'; 
import PresentationScreenOne from './screens/presentationScreenOne'; 
import PresentationScreenTwo from './screens/presentationScreenTwo';
import LoginScreen from './screens/loginScreen';
import EmailRegister from './screens/emailRegisterScreen';
import NomeRegister from './screens/nameRegisterScreen';
import PasswordRegister from './screens/passwordRegisterScreen';
import ResetPassword from './screens/passwordRecoveryScreen';
import GeneratePin from './screens/generatePinScreen';
import ValidatePin from './screens/validatePinScreen';
import Config from './screens/configTabScreen';
import Profile from './screens/profileTabScreen';
import AboutUs from './screens/aboutUsTabScreen';

import arrowImage from './assets/blackArrowIcon.png'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;

function BackButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image style={{
        width: 18,
        height: 18,
        marginLeft: 20,
      }} source={arrowImage}/>
    </TouchableOpacity>
  );
}

function ConfigTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Config" component={Config} />
      <Tab.Screen name="About Us" component={AboutUs} />
    </Tab.Navigator>
  );
};

export default function App() {
  const navigation = useNavigation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ConfigTab">
        {/* Defina a rota para a tela de teste */}
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="MyTest" component={MyTestScreen} />
        <Stack.Screen name="PresentationOne" component={PresentationScreenOne} />
        <Stack.Screen name="PresentationTwo" component={PresentationScreenTwo} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmailRegister" component={EmailRegister} />
        <Stack.Screen name="NomeRegister" component={NomeRegister} />
        <Stack.Screen name="SenhaRegister" component={PasswordRegister} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name='GeneratePin' component={GeneratePin} />
        <Stack.Screen name='ValidatePin' component={ValidatePin} />
        <Stack.Screen name='ConfigTab' component={ConfigTab} options={{ headerTitle: (props) => <BackButton {...props} navigation={navigation} /> }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
