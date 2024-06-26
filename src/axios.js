import axios from "axios";


const instance = axios.create({
    baseURL : 'http://127.0.0.1:5000'
})

const token = localStorage.getItem('token');

if(token){
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;