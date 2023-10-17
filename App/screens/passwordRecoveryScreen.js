import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import eyeOpened from '../assets/openEyeIcon.png';
import eyeClosed from '../assets/closedEyeIcon.png';

const windowWidth = Dimensions.get('window').width;
2
export default function ResetPassword({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

    const [eyeOpen, setEyeOpen] = useState(true);

  return (
    <View style={styles.container}>
        <View style={styles.navigateView}>
            <View style={styles.cancelView}>
                <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
                    Cancelar
                </Text>
            </View> 
        </View>
        <View style={styles.titleView}>
                <Text style={styles.Title}>Crie uma senha</Text>
                <Text style={[{right: 0, left: 20}, styles.linkText]}>
                    A senha deve conter pelo menos 6 caracteres
                </Text>
        </View>
        <View style={styles.formView}>
            <View style={styles.inputView}>
              <Text style={[styles.linkText, {right:0, left:20}]}>Digite sua senha</Text>
              <View style={styles.passwordSection}>
                    <TextInput style={styles.input} placeholder="**********"/>
                    <TouchableOpacity onPress={() => setEyeOpen(!eyeOpen)}>
                        <Image style={styles.eyeImage} 
                        source={eyeOpen ? eyeOpened : eyeClosed}/>
                    </TouchableOpacity>
                </View>
              <Text style={[styles.linkText, {right:0, left:20}]}>Repita sua senha</Text>
              <View style={styles.passwordSection}>
                    <TextInput style={styles.input} placeholder="**********"/>
                    <TouchableOpacity onPress={() => setEyeOpen(!eyeOpen)}>
                        <Image style={styles.eyeImage} 
                        source={eyeOpen ? eyeOpened : eyeClosed}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Redefinir Senha</Text>    
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
    cancelView:{
        width: windowWidth,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    linkText: {
        right: 20,
        fontSize: 15,
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
