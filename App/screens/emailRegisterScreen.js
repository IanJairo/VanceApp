import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import { StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
2
export default function EmailRegister({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
    }, []);

    const [email, setEmail] = useState('');
    const [verifyEmail, setVerifyEmail] = useState('');
    const [cancelView, setCancelView] = useState(false);

    const handleDeleteCancel = () => {
        setCancelView(false);
    };

    const handleDeleteConfirm = () => {
            setCancelView(false);
            navigation.navigate('Intro');
    };

    async function VerifyEmail(email, verifyEmail) {
        let credentials = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        email = email.toLowerCase();
        verifyEmail = verifyEmail.toLowerCase();
        if (email === '' || verifyEmail === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        } else if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido.');
        } else if (email != verifyEmail) {
            Alert.alert('Erro', 'Os emails não coincidem.');
        }

        credentials.email = email;
        navigation.navigate('NameRegister', {credentials})
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

                <View style={styles.skipView}>
                    <Text style={styles.linkText} onPress={() => setCancelView(true)}>
                        Cancelar
                    </Text>
                </View>
                <View style={styles.formView}>
                    <View style={styles.titleView}>
                        <Text style={styles.Title}>Crie sua conta</Text>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.Text}>Digite seu Email</Text>
                        <TextInput style={styles.input} onChangeText={setEmail}  placeholder="email@vance.com" />
                        <Text style={styles.Text}>Repita seu email</Text>
                        <TextInput style={styles.input} onChangeText={setVerifyEmail}  placeholder="email@vance.com" />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={() => VerifyEmail(email, verifyEmail)}>
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
    skipView: {
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
    formView: {
        width: windowWidth,
        height: '75%',
        alignItems: 'flex-start',
    },
    titleView: {
        width: windowWidth,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 150,
    },
    Title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 15,
    },
    Text: {
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 10,
        color: '#00c0ce',
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
    buttonView: {
        width: windowWidth,
        height: '15%',
        alignItems: 'center',
        justifyContent: 'top',
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
