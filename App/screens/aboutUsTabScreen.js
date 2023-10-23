import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';

import icon from '../assets/logo.png';
import pfi1 from '../assets/JD_profileIcon.png';
import pfi2 from '../assets/IJ_profileIcon.png';
import pfi3 from '../assets/PF_profileIcon.png';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AboutUs({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      <View style={styles.imageView}>
        <Image 
          style={styles.image} 
          source={icon} 
        />
        <Text style={styles.text}>Somos graduandos em Sistemas de Informação, desenvolvendo um projeto na força do ódio.</Text>
      </View>
        <Text style={styles.h2}>Conheça a equipe</Text>
      <View style={styles.abautUs}>
        <Text style={styles.subtitle}>Gerente de Projeto:</Text>
        <View style={styles.profileView}>
          <View style={styles.photoView}>
            <Image 
              style={styles.photo}
              source={pfi1}
            />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.name}>João Gabriel</Text>
            <Text style={styles.fnc}>Scrum Master</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Desenvolvimento:</Text>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.profileView}>
          <View style={styles.photoView}>
            <Image 
              style={styles.photo}
              source={pfi3}
            />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.name}>Péricles Feitoza</Text>
            <Text style={styles.fnc}>FullStack Developer</Text>
          </View>
        </View>

        <View style={styles.profileView}>
          <View style={styles.photoView}>
            <Image 
              style={styles.photo}
              source={pfi2}
            />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.name}>Ian Jairo</Text>
            <Text style={styles.fnc}>FullStack Developer</Text>
          </View>
        </View>
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
        height: windowHeight * 0.10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#5D5C5C',
    },
    imageView: {
      width: windowWidth,
      height: windowHeight * 0.3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 160,
      height: 160,
    },
    h2: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#5D5C5C',
      top: 10,
    },
    text : {
      textAlign: 'center',
      fontSize: 18,
      marginLeft: 40,
      marginRight: 40,
      color: '#5D5C5C',
    },
    abautUs: {
      width: windowWidth,
      height: windowHeight * 0.38,
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 20,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#00c0ce',
    },
    profileView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginRight: 20,
    },
    photoView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    photo: {
      width: 50,
      height: 50,
    },
    nameView: {
      justifyContent: 'center',
    },
    name: {
      fontSize: 18,
      color: '#00c0ce',
    },
    fnc: {
      fontSize: 12,
      color: '#000',
    },
  });