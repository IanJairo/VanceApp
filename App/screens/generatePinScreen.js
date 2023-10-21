import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import padlockIcon from '../assets/padlockIcon.png'

const windowWidth = Dimensions.get('window').width;

export default function GeneratePin({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={padlockIcon} style={styles.image}/>
      </View> 
      <View style={styles.textView}>
        <Text style={styles.title}>Redefinir Senha</Text>
        <Text style={[styles.text, {textAlign:'center'}]}>Informe o e-mail da conta para a qual deseja redefinir a senha.</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={[styles.text, { marginLeft: 10}]}>Digite seu Email</Text>
        <TextInput style={styles.input} placeholder="email@vance.com"/>
        <Text style={styles.blueBar}></Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ValidatePin')}>
          <Text style={styles.buttonText}>Gerar PIN</Text>    
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
      width: 160,
      height: 160,
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
      top: 15,
      bottom: 15,
      width: windowWidth*0.85,
      height: '20%',
    },
    input : {
      width: windowWidth*0.85,
      height: 40,
      marginLeft: 12,
      color: '#C2BDBC'
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
