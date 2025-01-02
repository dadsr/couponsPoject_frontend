import axios from "axios"



export const interceptorInit = ()=>{
    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.timeout = 10000;

    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(`token`);
            if (token)
                config.headers.Authorization = "Bearer " + token;

            if (config.method === 'put' || config.method === 'post')
                config.headers['Content-Type'] = 'application/json; charset=UTF-8';

            return config;
        }, (error) => {
            console.error('Request Error:', error.message);
            return Promise.reject(error);
        }
    );
}