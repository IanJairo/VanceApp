import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import arrowBack from '../assets/blackArrowIcon.png';

const windowWidth = Dimensions.get('window').width;
2
export default function NomeRegister({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
        <View style={styles.navigateView}>
            <View style={styles.arrowView}>
                <TouchableOpacity onPress={() => navigation.navigate('EmailRegister')}>
                    <Image source={arrowBack} style={styles.arrowIcon} onPress={() => navigation.navigate('EmailRegister')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.cancelView}>
                <Text style={styles.linkText} onPress={() => navigation.navigate('Intro')}>
                    Cancelar
                </Text>
            </View> 
        </View>
        <View style={styles.titleView}>
                <Text style={styles.Title}>Digite seu nome</Text>
        </View>
        <View style={styles.formView}>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="nome"/>
            </View>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyTest')}>
              <Text style={styles.buttonText}>Continuar</Text>    
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
    navigateView : {
        width: windowWidth,
        flexDirection: 'row', 
        height: '15%',
    },
    arrowView:{
        width: windowWidth*0.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    arrowIcon:{
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    cancelView:{
        width: windowWidth*0.5,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    linkText: {
        right: 20,
        fontSize: 14,
        color: '#00C0CE',
    },
    formView:{
        width: windowWidth, 
        height:'50%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleView:{
        width: windowWidth,
        alignItems: 'flex-start',
        height: '10%',
    },
    Title:{
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 15,
    },
    input:{
        width: windowWidth*0.85,
        height: 40,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        color: '#A9A4A4',
    },
    inputView:{
        width: windowWidth, 
        height:'20%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '10%',
    },
    buttonView:{
        width: windowWidth, 
        height:'25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        backgroundColor: '#00c0ce',
        width: windowWidth*0.9,
        height: 42,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});
