import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Platform, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import padlockIcon from '../assets/padlockIcon.png';
import { route } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;

import accessToApp from '../providers/accessToApp';


export default function ValidatePin({ navigation, route }) {
  const { email } = route.params;
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

  async function validatePin(pin) {
    console.log(email)

    // juntar pin numa string e depois virar int

    pin = pin.join('')
    pin = parseInt(pin)

    const obj = { pin, email }

    const result = await accessToApp.validatePin(obj);
    if (!result.sucess) {
      Alert.alert('Erro', result.message);
      return;
    }

    navigation.navigate('ResetPassword', { email })
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

        <View style={styles.imageView}>
          <Image source={padlockIcon} style={styles.image} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.title}>Redefinir Senha</Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>Informe o PIN que foi enviado para o e-mail cadastrado.</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={[styles.text, { textAlign: 'flex-start', marginLeft: 10 }]}>Digite o PIN</Text>
          <View style={styles.pinContainer}>{pinInputs}</View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={() => validatePin(pin)}>
            <Text style={styles.buttonText}>Validar Código</Text>
          </TouchableOpacity>
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Voltar ao Login</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageView: {
    width: windowWidth,
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: 140,
    height: 150,
  },
  textView: {
    width: windowWidth * 0.8,
    justifyContent: 'flex-end',
    height: '25%',
    minHeight: '18%',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 22,
    color: '#363636',
  },
  inputView: {
    justifyContent: 'center',
    width: windowWidth * 0.85,
    height: '25%',
    marginBottom: 30,
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
    textAlign: 'center',
    marginRight: 10,
    backgroundColor: '#E9E9E9',
  },
  buttonView: {
    width: windowWidth,
    minHeight: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#00c0ce',
    width: windowWidth * 0.9,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  linkText: {
    top: 10,
    fontSize: 15,
    color: '#00C0CE',
    textDecorationLine: 'underline'
  },
  blueBar: {
    width: windowWidth * 0.85,
    height: 2,
    backgroundColor: '#00C0CE',
  },

});
