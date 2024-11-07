import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_baseurl,
    withCredentials:true
})


export default instance;