import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, Alert, Platform, Keyboard, KeyboardAvoidingView, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import eyeOpened from '../assets/openEyeIcon.png';
import eyeClosed from '../assets/closedEyeIcon.png';
import { route } from '@react-navigation/native';

import accessToApp from '../providers/accessToApp';

const windowWidth = Dimensions.get('window').width;

export default function ResetPassword({ navigation, route }) {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
    }, []);

    const [eyeOpen, setEyeOpen] = useState(true);

    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const email = route.params.email;
    const [cancelView, setCancelView] = useState(false);

    const handleDeleteCancel = () => {
            setCancelView(false);
    };

    const handleDeleteConfirm = () => {
            setCancelView(false);
            navigation.navigate('Intro');
    };

    async function resetPassword(password, verifyPassword) {
        console.log('pass', password)
        console.log('verify', verifyPassword)
        if (password === '' || verifyPassword === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        } else if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve conter pelo menos 6 caracteres.');
            return;
        } else if (password !== verifyPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        const obj = { email, newPassword: password }
        const result = await accessToApp.creatNewPassword(obj);

        if (!result.sucess) {
            Alert.alert('Erro', result.message);
            return;
        }
        navigation.navigate('Login')

    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

                <View style={styles.navigateView}>
                    <View style={styles.cancelView}>
                        <Text style={styles.linkText} onPress={() => setCancelView(true)}>
                            Cancelar
                        </Text>
                    </View>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.Title}>Crie uma senha</Text>
                    <Text style={[{ right: 0, left: 20 }, styles.linkText]}>
                        A senha deve conter pelo menos 6 caracteres
                    </Text>
                </View>
                <View style={styles.formView}>
                    <View style={styles.inputView}>
                        <Text style={[styles.linkText, { right: 0, left: 20 }]}>Digite sua senha</Text>
                        <View style={styles.passwordSection}>
                            <TextInput style={styles.input} secureTextEntry={eyeOpen} onChangeText={setPassword} value={password} placeholder="**********" />
                            <TouchableOpacity onPress={() => setEyeOpen(!eyeOpen)}>
                                <Image style={styles.eyeImage}
                                    source={eyeOpen ? eyeOpened : eyeClosed} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.linkText, { right: 0, left: 20 }]} >Repita sua senha</Text>
                        <View style={styles.passwordSection}>
                            <TextInput style={styles.input} secureTextEntry={eyeOpen} onChangeText={setVerifyPassword} value={verifyPassword} placeholder="**********" />
                            <TouchableOpacity onPress={() => setEyeOpen(!eyeOpen)}>
                                <Image style={styles.eyeImage}
                                    source={eyeOpen ? eyeOpened : eyeClosed} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={() => resetPassword(password, verifyPassword)}>
                        <Text style={styles.buttonText}>Redefinir Senha</Text>
                    </TouchableOpacity>
                </View>
                 <Modal
                  animationType="slide"
                  transparent={true}
                  visible={cancelView}
                  onRequestClose={() => {
                      setCancelView(false);
                  }}
                  >
                  <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                      <Text style={styles.modalText}>Tem certeza?</Text>
                      <Text style={styles.modalText}>Ao confirmar, a assão não poderá ser desfeita, apenas refeita</Text>
                      <View style={styles.modalButtonsContainer}>
                          <TouchableOpacity style={styles.modalButtonNo} onPress={() => handleDeleteCancel()}>
                              <Text style={styles.modalButtonTextNo}>Não, continuar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.modalButtonYes} onPress={() => handleDeleteConfirm()}>
                              <Text style={styles.modalButtonTextYes}>Sim, cancelar</Text>
                          </TouchableOpacity>
                      </View> 
                      </View>
                  </View>
              </Modal>
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
    navigateView: {
        width: windowWidth,
        flexDirection: 'row',
        height: '15%',
    },
    cancelView: {
        width: windowWidth,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    linkText: {
        right: 20,
        fontSize: 15,
        color: '#00C0CE',
    },
    formView: {
        width: windowWidth,
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleView: {
        width: windowWidth,
        alignItems: 'flex-start',
        height: '10%',
    },
    Title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 15,
    },
    input: {
        width: windowWidth * 0.85,
        height: 40,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        color: '#A9A4A4',
    },
    inputView: {
        width: windowWidth,
        height: '20%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '10%',
    },
    passwordSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyeImage: {
        width: 18,
        height: 18,
    },
    buttonView: {
        width: windowWidth,
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#00c0ce',
        width: windowWidth * 0.9,
        height: 42,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth*0.7,
      },
      modalButtonYes: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderWidth: 1,
      },
      modalButtonNo: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderWidth: 1,
      },
      modalButtonTextYes: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
      },
      modalButtonTextNo: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
      },
});
