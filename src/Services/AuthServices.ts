import axios from "axios";

//admin@admin.com admin
export class AuthServices {
    async Login(email: string, password: string, role: string) {

        return (await axios.post<string>(
            `http://localhost:8080/login`,
            {"email": email, "password": password, "role": role},
            {headers: {'Content-Type': 'application/json'}} // Ensure proper Content-Type header
        )).data;
    }

    async Logout(token: string) {
        return (await axios.delete(`http://localhost:8080/logout?token=${token}`));
    }

}
const authServices = new AuthServices();
export default authServices;