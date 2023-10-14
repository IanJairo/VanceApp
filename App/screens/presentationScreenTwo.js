import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import presentationIcon from '../assets/presentationIcon2.png';
import arrowImage from '../assets/arrowIcon.png';

const windowWidth = Dimensions.get('window').width;

export default function PresentationTwo({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
        <View style={styles.skipView}>
            <Text style={styles.linkText} onPress={() => navigation.navigate('EmailRegister')}>
                Pular
            </Text>
        </View>
        <View style={styles.textView}>
            <Text style={styles.Text} >Escolha sua nota preferida e compartilhe suas ideias com amigos</Text>
        </View>
        <View style={styles.imageView}>
            <Image
                style={styles.image}
                source={presentationIcon}
            />
        </View>
        <View style={styles.botMenu}>
            <TouchableOpacity onPress={() => navigation.navigate('EmailRegister')}>
                <Image style={styles.arrowImage} source={arrowImage}/>
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
        backgroundColor: '#fff',        
    },
    skipView : {
        width: windowWidth, 
        height: '15%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        bottom: 10,
    },
    textView : {
        width: windowWidth, 
        borderRightColor: '#fff',
        borderRightWidth: 100,
        height:'10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageView : {
        width: windowWidth, 
        height:'60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        left: 10,
        width: 270,
        height: 267,
      },
    botMenu: {
        width: windowWidth, 
        height: '20%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    arrowImage: {
        right: 10,
        width: 60,
        height: 60,
    },
    Text: {
        fontSize: 20,
        textAlign: 'left',
        // fontFamily: 'Inter-Medium',
    },
    linkText: {
        top: 10,
        right: 20,
        fontSize: 16,
        color: '#00C0CE',
        textDecorationLine: 'underline'
    }
});
