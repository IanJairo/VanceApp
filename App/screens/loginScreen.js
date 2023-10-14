import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import eyeOpened from '../assets/openEyeIcon.png'
import eyeClosed from '../assets/closedEyeIcon.png'
import arrowImage from '../assets/blackArrowIcon.png'

const windowWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

export default function LoginScreen({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

      const [eyeOpen, setEyeOpen] = useState(true);


  return (
    <View style={styles.container}>
        <View style={styles.arrowView}>
            <TouchableOpacity onPress={() => navigation.navigate('Intro')}>
                <Image style={styles.arrowImage} source={arrowImage}/>
            </TouchableOpacity>
        </View>
        <View style={styles.formView}>
            <View style={styles.titleView}>
                <Text style={styles.Title}>Bem-vindo de volta!</Text>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.Text}>Digite seu Email</Text>
                <TextInput style={styles.input} placeholder="email@vance.com"/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.Text}>Digite sua senha</Text>
                <View style={styles.passwordSection}>
                    <TextInput style={styles.input} placeholder="**********"/>
                    <TouchableOpacity onPress={() => setEyeOpen(!eyeOpen)}>
                        <Image style={styles.eyeImage} 
                        source={eyeOpen ? eyeOpened : eyeClosed}/>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.recoverPassword} onPress={() => navigation.navigate('Intro')}>Recuperar a senha</Text>
            </View>
            </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyTestScreen')}>
              <Text style={styles.buttonText}>Continuar</Text>    
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: windowWidth,
        height: windowsHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',        
    },
    arrowView:{
        width: windowWidth, 
        height:'10%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    arrowImage:{
        width: 18,
        height: 18,
        marginLeft: 20,
    },
    formView:{
        width: windowWidth, 
        height:'60%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    titleView:{
        width: windowWidth, 
        marginBottom: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    Title:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 10,
    },
    Text:{
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
    },
    input:{
        width: windowWidth*0.85,
        height: 40,
        marginLeft: 20,
        color: '#C2BDBC',
    },
    recoverPassword:{
        width: windowWidth*0.85,
        height: '20%',
        top: 10,
        fontSize: 12,
        color: '#00C0CE',
        textDecorationLine: 'underline',
        marginLeft: 10,
    },
    inputView:{
        width: windowWidth, 
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    passwordSection:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyeImage:{
        width: 18,
        height: 18,
    },
    buttonView:{
        width: windowWidth, 
        height:'10%',
        alignItems: 'center',
        justifyContent: 'top',
    },
    button:{
        backgroundColor: '#00c0ce',
        width: windowWidth*0.9,
        height: 42,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonText:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});