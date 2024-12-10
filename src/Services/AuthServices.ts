import axios from "axios";
import {BASE_URL} from "../constants.ts";

//admin@admin.com admin
export class AuthServices {
    async Login(email: string, password: string, role: string) {
        const token =(await axios.post<string>(
            `${BASE_URL}/login`,
            {"email": email, "password": password, "role": role},
            {headers: {'Content-Type': 'application/json'}} // Ensure proper Content-Type header
        )).data;
        localStorage.setItem("token", token);
        return token;
    }

    async Logout() {
         (await axios.delete(`${BASE_URL}/logout?token=${localStorage.getItem("token")}`)
            .then(() => localStorage.removeItem("token"))
            .catch((error) => console.log(error)));
    }

}
const authServices = new AuthServices();
export default authServices;