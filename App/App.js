import React, { useState } from 'react';
import { Dimensions, Image} from 'react-native';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IntroScreen from './screens/introScreen'; 
import PresentationScreenOne from './screens/presentationScreenOne'; 
import PresentationScreenTwo from './screens/presentationScreenTwo';
import LoginScreen from './screens/loginScreen';
import EmailRegister from './screens/emailRegisterScreen';
import NameRegister from './screens/nameRegisterScreen';
import PasswordRegister from './screens/passwordRegisterScreen';
import ResetPassword from './screens/passwordRecoveryScreen';
import GeneratePin from './screens/generatePinScreen';
import ValidatePin from './screens/validatePinScreen';
import Profile from './screens/profileTabScreen';
import AboutUs from './screens/aboutUsTabScreen';
import HomeScreen from './screens/home';
import EditNote from './screens/editNoteScreen';
import CreateNote from './screens/createNoteScreen';

import profileIcon from './assets/profileIcon.png';
import aboutUsIcon from './assets/awardIcon.png';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const iconSelector = (route) => {
  switch (route.name) {
    case 'Profile':
      return <Image source={profileIcon} style={{width: 25, height: 25}}/>;
    case 'About Us':
      return <Image source={aboutUsIcon} style={{width: 27, height: 30}}/>;
  }
};

function ConfigTab() {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({ tabBarIcon: () => iconSelector(route)})}
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopColor: 'red',
          elevation: 1,
          height: 60,
        }
      }}
    >
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="About Us" component={AboutUs} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator >
          {/* Defina a rota para a tela de teste */}
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="PresentationOne" component={PresentationScreenOne} />
          <Stack.Screen name="PresentationTwo" component={PresentationScreenTwo} />
          <Stack.Screen name="EmailRegister" component={EmailRegister} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EditNote" component={EditNote} />
          <Stack.Screen name="NameRegister" component={NameRegister} />
          <Stack.Screen name="PasswordRegister" component={PasswordRegister} />
          <Stack.Screen name='GeneratePin' component={GeneratePin} />
          <Stack.Screen name='ValidatePin' component={ValidatePin} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name='CreateNote' component={CreateNote} />
          <Stack.Screen name='ConfigTab' component={ConfigTab} options={{
            headerTitle: '',
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
