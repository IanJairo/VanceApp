import axios from 'axios';
import { AsyncStorage } from 'react-native';


const accessToApp = {
    login: async (email, password) => {
        const credentials = { email, password };
        const baseURL = 'https://vance-drab.vercel.app/api/login';

        try {
            const response = await axios.post(baseURL, credentials);
            console.log(response.data);
            // navigation.navigate(''); // Aqui vai o nome da próxima tela
            
            if (response.error !== '') {
                await AsyncStorage.setItem('user', JSON.stringify(response.data));
                return {message: response.message, sucess: true};
            } else {
                return {message: response.message, sucess: false};
            }   

        } catch (error) {
            return "Problema ao fazer login. Tente novamente"
        }
    },
    signUp: async (form) => {
        const baseURL = 'https://vance-drab.vercel.app/api/signup'
        try {
            const response = await axios.post(baseURL, form);

  
        }
        catch (e){
            console.log(e)
        }
    },
    loginWithFacebook: function () {
        // código para fazer login com o Facebook
    },
};

export default accessToApp;