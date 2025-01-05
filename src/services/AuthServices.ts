import axios from "axios";
import {interceptorInit} from "./AxiosInterseptor.ts";

interceptorInit(); // Initializes the interceptor.

/**
 * The `AuthServices` class provides methods to handle authentication functionalities,
 * such as login and logout operations.
 */
export class AuthServices {

    /**
     * Logs in the user by sending their credentials to the server and retrieves a token.
     * The token is then stored in the browser's local storage for future authenticated requests.
     *
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @param {string} role - The role of the user (e.g., admin, customer).
     * @returns {Promise<string>} A promise that resolves to the authentication token.
     */
    async login(email: string, password: string, role: string) {
            let token = (await axios.post<string>(`/login`, {
                "email": email,
                "password": password,
                "role": role
            })).data;
            token = token.split("Bearer ")[1];
            localStorage.setItem("token", token);
            return token;
            }

    /**
     * Logs out the user by invalidating their session on the server
     * and removing their data from local storage.
     */
    async logout() {
        const token = localStorage.getItem("token");
        if (token) {
            try{
                await axios.delete(`/logout?token=${token}`);
            }catch (error)
            {
                console.log(error);
            }finally {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
            }
        }
    }

//
}

const authServices = new AuthServices();
export default authServices;