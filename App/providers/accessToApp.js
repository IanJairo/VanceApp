import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const accessToApp = {
    signUp: async (form) => {
        const baseURL = "https://vance-drab.vercel.app/api/signup"
        try {
            const response = await axios.post(baseURL, form);
            console.log(response.data)
            if (response.data.error === null || response.data.error === '') {
                return { message: response.data.message, sucess: true };
            } else {
                return { message: response.data.message, sucess: false };
            }
        } catch (e) {
            console.log(e)
            return { message: "Problema ao criar conta. Tente novamente", sucess: false }
        }

    },
    login: async (email, password) => {
        const credentials = { email, password };
        const baseURL = 'https://vance-drab.vercel.app/api/login';

        try {
            const response = await axios.post(baseURL, credentials);

            if (response.data.error === null || response.data.error === '') {
                await AsyncStorage.setItem('user', JSON.stringify(response.data));
                return { message: response.data.data.message, sucess: true };
            } else {
                return { message: response.data.error, sucess: false };
            }

        } catch (error) {
            console.log(error);
            return "Problema ao fazer login. Tente novamente"
        }
    },

    generatePin: async (email) => {
        const baseURL = `https://vance-drab.vercel.app/api/forgot-password/${email}/code/`;
        try {
            const response = await axios.get(baseURL);

            if (response.data.error === null || response.data.error === '') {
                return { message: response.data.message, sucess: true };
            } else {
                return { message: response.data.message, sucess: false };
            }
        }
        catch (error) {
            console.log(error);
            return {message: "Problema ao gerar o Pin. Tente novamente", sucess: false}
        }
    },

    validatePin: async (obj) => { 
        const baseURL = 'https://vance-drab.vercel.app/api/validate-pin/'

        console.log(obj)
        try {
            const response = await axios.post(baseURL, obj);
            console.log(response.data)
            if (response.data.error === null || response.data.error === '') {
                return { message: response.data.message, sucess: true };
            } else {
                return { message: response.data.message, sucess: false };
            }
        } catch (error) {
            console.log(error);
            return {message: "Problema ao validar o Pin. Tente novamente", sucess: false}
        }
    },

    
    creatNewPassword: async (obj) => {
        const baseURL = 'https://vance-drab.vercel.app/api/reset-password/'

        console.log(obj)
        try {
            const response = await axios.post(baseURL, obj);

            if (response.data.error === null || response.data.error === '') {
                return { message: response.data.message, sucess: true };
            } else {
                return { message: response.data.message, sucess: false };
            }
        } catch (error) {
            console.log(error);
            return {message: "Problema ao criar nova senha. Tente novamente", sucess: false}
        }

    }
};

export default accessToApp;