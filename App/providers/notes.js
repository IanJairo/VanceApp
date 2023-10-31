import axios from 'axios';
const baseURL = 'https://vance-drab.vercel.app/api/notes/';
import AsyncStorage from '@react-native-async-storage/async-storage';

// pegar dados do usuário do banco local
const getUser = async () => {
    const response = await AsyncStorage.getItem('user');
    if (response !== null) {
        // console.log('response', JSON.parse(response));
        return JSON.parse(response);
    }
}
const notesApi = {
    getNotes: async (form) => {
        console.log('entrou', form)
        const userDetails = await getUser();
        // console.log("Aqui deveria ter o token", userDetails);
        try {
            const response = await axios.post(baseURL+'get', form, {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                  }
            });
            return response.data.data;
        } catch (error) {
            console.log('Erro ao pegar as notas, '+error);
            return [];
        }
    },
    getFavoriteNotes: async () => {
        try {
            const userDetails = await getUser();
            const reponse = await axios.get(baseURL+'favorites/'+userDetails.id, {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                }
            });
            return reponse.data.data;
        } catch (error) {
            console.log('Erro ao pegas as notas favoritas, '+error);
            return [];
        }
    },
    postNotes: async (form) => {
        try {
            const userDetails = await getUser();
            const response = await axios.post(baseURL, form, {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                  }
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    editNotes: async (obj, id) => {
        try {
            const userDetails = await getUser();
            const response = await axios.put(baseURL+id, obj, {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                  }
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    deleteNote: async (noteId) => {
        try {
            const userDetails = await getUser();
            const response = await axios.delete(baseURL+noteId, {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                  }
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }

    },
};

export default notesApi;