import axios from "axios";
import {interceptorInit} from "./AxiosInterseptor.ts";
import {errorHandler} from "../errors/errorHandler.ts";

interceptorInit();

//admin@admin.com admin
export class AuthServices {
    async Login(email: string, password: string, role: string) {
        try {
            let token = (await axios.post<string>(`/login`, {
                "email": email,
                "password": password,
                "role": role
            })).data;
            token =token.split("Bearer ")[1];
            localStorage.setItem("token", token);
            return token;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    //todo not working
    async Logout() {
        try {
            await axios.delete(`/logout?token=${localStorage.getItem("token")}`);
            localStorage.removeItem("token");
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

//
}

const authServices = new AuthServices();
export default authServices;