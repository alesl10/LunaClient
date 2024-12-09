import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_baseurl,
    withCredentials:false //Cambiar cuando cambiemos cors en el api
})


export default instance;