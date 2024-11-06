import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7198/api',
    withCredentials:true
})


export default instance;