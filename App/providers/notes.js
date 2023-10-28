import axios from 'axios';
const baseURL = 'https://vance-drab.vercel.app/api/notes/';

const notesApi = {
    getNotes: async (form) => {
        console.log('entrou', form)
        try {
            const response = await axios.post(baseURL+'get', form);
            return response.data.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    postNotes: async (form) => {
        try {
            const response = await axios.post(baseURL, form);
            return response.data.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    editNotes: async (obj, id) => {
        try {
            const response = await axios.put(baseURL+id, obj);
            return response.data.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    deleteNote: async (form) => {

    },
};

export default notesApi;