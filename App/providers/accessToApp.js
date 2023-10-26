import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const accessToApp = {
    login: async (email, password) => {
        const credentials = { email, password };
        const baseURL = 'https://vance-drab.vercel.app/api/login';

        try {
            const response = await axios.post(baseURL, credentials);

            if (response.data.error === null || response.data.error === '') {
                await AsyncStorage.setItem('user', JSON.stringify(response.data));
                return {message: response.data.data.message, sucess: true};
            } else {
                return {message: response.data.error, sucess: false};
            }   

        } catch (error) {
            console.log(error);
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

    generateCode: async (email) => {
        email = email.toLowerCase();
        const baseURL = `https://vance-drab.vercel.app/api/forgot-passord/${email}/code`;
        try {
            const response = await axios.post(baseURL, email);
            
            if (response.error != null || response.error !== '') {
                return {message: response.message, sucess: true};
        
        
            }
        }




        catch (e){
            console.log(e)
        }
    }
};

export default accessToApp;