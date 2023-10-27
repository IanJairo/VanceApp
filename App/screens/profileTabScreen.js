import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

import logoutIcon from '../assets/logoutIcon.png';
import profileIcon from '../assets/neyDayFlamengo.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Profile({ navigation }) {

  const [userDetails, setUserDetails] = useState({}); // [nome, função para alterar o nome

    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);
    
    useEffect(() => {
      async function fetchData() {
          const response = await AsyncStorage.getItem('user');
          if (response !== null) {
          setUserDetails(JSON.parse(response));
          }
      }
      fetchData();
      }, []); 

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      <View style={styles.imageView}>
        <Image 
          style={styles.image} 
          source={profileIcon} 
        />
        <Text style={styles.name}>Neymar Jr</Text>
      </View>
      <View style={styles.signOutView}>
        <TouchableOpacity style={styles.signOutButton} onPress={() => navigation.navigate('Login') }>
          <Text style={styles.signOutText}>Sair</Text>
          <Image 
            style={styles.logoutIcon} 
            source={logoutIcon}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.statisticView}>
        <View style={styles.statistic}>
          <Text style={styles.identificationText}>Email</Text>
          <Text style={{ textDecorationLine: 'underline', fontSize: 18 }}>neymarjr@vance.com</Text>
        </View>
        <View style={styles.statistic}>
          <Text style={styles.identificationText}>Total de notas:</Text>
          <Text>numero</Text>
        </View>
        <View style={styles.statistic}>
          <Text style={styles.identificationText}>Compartilhadas:</Text>
          <Text>numero</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',        
    },
    titleView: {
        width: windowWidth,
        height: windowHeight * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#5D5C5C',
      // fontFamily: 'Poppins',
    },
    imageView: {
      width: windowWidth,
      height: windowHeight * 0.24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 160,
      height: 160,
      borderRadius: 25,
    },
    name: {
      top: 10,
      fontSize: 25,
      fontWeight: 'bold',
      color: '#5D5C5C',
      // fontFamily: 'Poppins',
    },
    signOutView: {
      top: 8,
      width: windowWidth,
      height: windowHeight * 0.05,
    },
    signOutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signOutText: {
      fontSize: 15,
      color: '#00C0CE',
      marginLeft: 10,
    },
    logoutIcon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    statisticView: {
      width: windowWidth,
      height: windowHeight * 0.4,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    statistic: {
      width: windowWidth * 0.85,
      height: windowHeight * 0.1,
      left: 20,
    },
    identificationText:{
      fontSize: 20,
      color: '#00C0CE',
      // fontFamily: 'Poppins',
    },
  });