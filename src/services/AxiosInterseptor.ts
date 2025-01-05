import axios from "axios"


/**
 * Initializes Axios interceptors to set up default configurations for all HTTP requests.
 * This includes setting the base URL, timeout, and adding authorization headers if a token is present.
 */
export const interceptorInit = ()=>{
    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.timeout = 10000;
    /**
     * Adding an interceptor to handle request configurations before they are sent.
     */
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