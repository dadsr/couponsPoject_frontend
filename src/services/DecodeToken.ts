import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    id: number;
    name: string;
    email: string;
    role: string;
}

export class DecodeToken {
    public static decode(token:string | null): JwtPayload | null {
        if(!token)
            token = localStorage.getItem("token");
        if (!token)
            return null;
        return jwtDecode<JwtPayload>(token);
    }
}
