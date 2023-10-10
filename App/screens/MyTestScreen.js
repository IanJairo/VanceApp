import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function MyTestScreen({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
        <View style={styles.skipView}>
            <Text style={styles.linkText} onPress={() => navigation.navigate('MyTest')}>
                Pular
            </Text>
        </View>
        <View style={styles.textView}>
            
            <Text style={styles.Text} >Pensa, imagina e deixa tudo registrado no Vance</Text>
        </View>
        <View style={styles.imageView}>
            <Image
                style={styles.image}
                source={require('../assets/presentationIcon1.png')}
            />
        </View>
        <View style={styles.botMenu}>
            <TouchableOpacity onPress={() => navigation.navigate('Intro')}>
                <Image style={styles.arrowImage} source={require('../assets/arrowIcon.png')}/>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',        
    },
    skipView : {
        width: windowWidth, 
        height: '15%',
        backgroundColor: 'grey',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textView : {
        width: windowWidth, 
        borderRightWidth: 100,
        height:'10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f',
    },
    imageView : {
        width: windowWidth, 
        height:'60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0ff',
    },
    image: {
        left: 10,
        width: 323,
        height: 331,
      },
    botMenu: {
        width: windowWidth, 
        height: '20%',
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    arrowImage: {
        right: 10,
        width: 60,
        height: 60,
    },
    Text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'Inter-Medium',
    },
    linkText: {
        top: 10,
        right: 20,
        fontSize: 16,
        color: '#00C0CE',
        textDecorationLine: 'underline'
    }
});
