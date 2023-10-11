import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;


export default function MyTestScreen({ navigation }) {
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
                <Image style={styles.arrowImage} source={require('../assets/blackArrowIcon.png')}/>
            </TouchableOpacity>
        </View>
        <View style={styles.formView}>
            <View style={styles.titleView}>
                <Text style={styles.Title}>Bem-vindo de volta!</Text>
            </View>
            <View style={styles.emailView}>
                <Text style={styles.Text}>Digite seu Email</Text>
                <TextInput style={styles.input} placeholder="email@vance.com"/>
            </View>
            <View style={styles.passwordView}>
                <Text style={styles.Text}>Digite sua senha</Text>
                <View style={styles.passwordSection}>
                    <TextInput style={styles.input} placeholder="**********"/>
                    <Image style={styles.eyeImage} 
                    source={eyeOpen ? require('./assets/openEyeIcon.png') : require('./assets/closedEyeIcon.png')}
                    onPress={() => setEyeOpen(!eyeOpen)}/>
                </View>
                
                <Text style={styles.recoverPassword} onPress={() => navigation.navigate('Intro')}>Recuperar a senha</Text>
            </View>
            </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Intro')}>
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
        backgroundColor: '#f00',
    },
    arrowImage:{
        width: 18,
        height: 18,
        margin: 10,
    },
    formView:{
        width: windowWidth, 
        height:'70%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    Title:{},
    Text:{},
    input:{},
    recoverPassword:{},
    buttonView:{},
    button:{},
    buttonText:{},
});
