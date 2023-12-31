import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import vanceLogo from '../assets/logo.png';

const windowWidth = Dimensions.get('window').width;

export default function IntroScreen({ navigation }) {
        
    useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image 
                    style={styles.image}
                    source={vanceLogo}
                />
            </View>
            <View style={styles.botMenu}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.Text}>Entrar</Text>    
                </TouchableOpacity>
                <Text style={styles.linkText} onPress={() => navigation.navigate('PresentationOne')}>
                    Novo por aqui? Crie sua conta
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageView : {
        width: windowWidth, 
        height:'75%',
        alignItems: 'center',
    },
    image: {
        top: 100,
        left: 10,
        width: 323,
        height: 331,
      },
    botMenu: {
        width: windowWidth, 
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#00c0ce',
        width: 355,
        height: 42,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    linkText: {
        top: 10,
        fontSize: 16,
        color: '#00C0CE',
        textDecorationLine: 'underline'
    }
});
