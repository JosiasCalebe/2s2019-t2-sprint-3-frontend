import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.4.233:5000/api',
});

export const ENDPOINT = 'http://192.168.4.233:5000';

export default api;
