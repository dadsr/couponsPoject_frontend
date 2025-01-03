import axios from "axios";
import {interceptorInit} from "./AxiosInterseptor.ts";
import {errorHandler} from "../errors/errorHandler.ts";


interceptorInit();

//admin@admin.com admin
export class AuthServices {
    async login(email: string, password: string, role: string) {
        try {
            let token = (await axios.post<string>(`/login`, {
                "email": email,
                "password": password,
                "role": role
            })).data;
            token = token.split("Bearer ")[1];
            localStorage.setItem("token", token);
            return token;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

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