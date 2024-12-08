import axios from "axios";
import {BASE_URL} from "../constants.ts";

//admin@admin.com admin
export class AuthServices {
    async Login(email: string, password: string, role: string) {

        return (await axios.post<string>(
            `${BASE_URL}/login`,
            {"email": email, "password": password, "role": role},
            {headers: {'Content-Type': 'application/json'}} // Ensure proper Content-Type header
        )).data;
    }

    async Logout(token: string) {
        return (await axios.delete(`${BASE_URL}/logout?token=${token}`));
    }


}
const authServices = new AuthServices();
export default authServices;