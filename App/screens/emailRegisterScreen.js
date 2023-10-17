import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
2
export default function EmailRegister({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
        <View style={styles.skipView}>
            <Text style={styles.linkText} onPress={() => navigation.navigate('Intro')}>
                Cancelar
            </Text>
        </View>
        <View style={styles.formView}>
            <View style={styles.titleView}>
                    <Text style={styles.Title}>Crie sua conta</Text>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.Text}>Digite seu Email</Text>
                <TextInput style={styles.input} placeholder="email@vance.com"/>
                <Text style={styles.Text}>Repita seu email</Text>
                <TextInput style={styles.input} placeholder="email@vance.com"/>
            </View>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NomeRegister')}>
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
    skipView : {
        width: windowWidth, 
        height: '10%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    linkText: {
        right: 20,
        fontSize: 14,
        color: '#00C0CE',
    },
    formView:{
        width: windowWidth, 
        height:'75%',
        alignItems: 'flex-start',
    },
    titleView:{
        width: windowWidth,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 150,
    },
    Title:{
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 15,
    },
    Text:{
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 10,
        color: '#00c0ce',
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
        height:'15%',
        alignItems: 'center',
        justifyContent: 'top',
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
