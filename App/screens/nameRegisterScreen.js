import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import arrowBack from '../assets/backArrow.png';
import axios from 'axios';
import { route } from '@react-navigation/native';

const baseURL = 'https://vance-drab.vercel.app/api/login';
const windowWidth = Dimensions.get('window').width;
2
export default function NameRegister({ navigation, route }) {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
    }, []);

    let { credentials } = route.params;
    const [name, setName] = useState('');
    const [cancelView, setCancelView] = useState(false);

    const handleDeleteCancel = () => {
            setCancelView(false);
    };

    const handleDeleteConfirm = () => {
            setCancelView(false);
            navigation.navigate('Intro');
    };

    async function VerifyName(name, credentials) {
        if (name === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        console.log('name : ', name)
        console.log('credentials : ', credentials)
        credentials['name'] = name;
        console.log('credentials : ', credentials)

        navigation.navigate('PasswordRegister', {credentials})


    }


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.navigateView}>
                    <View style={styles.arrowView}>
                        <TouchableOpacity onPress={() => navigation.navigate('EmailRegister')}>
                            <Image source={arrowBack} style={styles.arrowIcon} onPress={() => navigation.navigate('EmailRegister')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cancelView}>
                        <Text style={styles.linkText} onPress={() => setCancelView(true)}>
                            Cancelar
                        </Text>
                    </View>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.Title}>Digite seu nome</Text>
                </View>
                <View style={styles.formView}>
                    <View style={styles.inputView}>
                        <TextInput style={styles.input} onChangeText={setName} placeholder="nome" />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={() => VerifyName(name, credentials)}>
                        <Text style={styles.buttonText}>Continuar</Text>
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
        minHeight: '15%',
    },
    arrowView: {
        width: windowWidth * 0.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    arrowIcon: {
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    cancelView: {
        width: windowWidth * 0.5,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    linkText: {
        right: 20,
        fontSize: 14,
        color: '#00C0CE',
    },
    formView: {
        width: windowWidth,
        height: '30%',
        minHeight: '30%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleView: {
        width: windowWidth,
        alignItems: 'flex-start',
        height: '25%',
        minHeight: '15%',
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
        textAlign: 'left',
    },
    buttonView: {
        width: windowWidth,
        height: '30%',
        minHeight: '30%',
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
