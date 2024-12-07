import axios from "axios";


export class AuthServices{
    async Login(email:string,password:string,role:string){
        return (await axios.post<string>(`http://localhost:8080/login?email=${email}&password=${password}&role=${role}`)).data
    }
}
const authServices = new AuthServices();
export default authServices;