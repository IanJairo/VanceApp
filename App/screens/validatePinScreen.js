import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import padlockIcon from '../assets/padlockIcon.png'

const windowWidth = Dimensions.get('window').width;

export default function ValidatePin({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handlePinChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < 5) {
        inputRefs.current[index + 1].focus();
    }
    };

    const pinInputs = [];
    for (let i = 0; i < 6; i++) {
    pinInputs.push(
        <TextInput
        key={i}
        ref={(ref) => (inputRefs.current[i] = ref)}
        style={styles.pinInput}
        value={pin[i]}
        onChangeText={(text) => handlePinChange(text, i)}
        keyboardType="numeric"
        maxLength={1}
        />
    );
    }

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={padlockIcon} style={styles.image}/>
      </View> 
      <View style={styles.textView}>
        <Text style={styles.title}>Redefinir Senha</Text>
        <Text style={[styles.text, {textAlign:'center'}]}>Informe o PIN que foi enviado para o e-mail cadastrado.</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={[styles.text, {textAlign:'flex-start', marginLeft: 10}]}>Digite o PIN</Text>
        <View style={styles.pinContainer}>{pinInputs}</View>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.buttonText}>Validar Código</Text>    
        </TouchableOpacity>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login') }>Voltar ao Login</Text>
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
    imageView : {
      width: windowWidth,
      height: '35%',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    image : {
      width: 165,
      height: 165,
    },
    textView : {
      width: windowWidth*0.8,
      justifyContent: 'flex-end',
      height: '25%',
    },
    title : {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text : {
      fontSize: 22,
      color: '#363636',
    },
    inputView : {
      justifyContent: 'center',
      width: windowWidth*0.85,
      height: '20%',
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 15,
    },
    pinInput: {
        width: 40,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        marginRight: 10,
      },
    buttonView : {
      width: windowWidth,
      height: '25%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button : {
      backgroundColor: '#00c0ce',
      width: 355,
      height: 42,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText : {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },
    linkText : {
      top: 10,
      fontSize: 15,
      color: '#00C0CE',
      textDecorationLine: 'underline'
    },
    blueBar : {
      width: windowWidth*0.85,
      height: 2,
      backgroundColor: '#00C0CE',
    },

});