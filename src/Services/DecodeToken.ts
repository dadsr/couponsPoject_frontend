import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    id: number;
    name: string;
    email: string;
    role: string;
    exp: number; // Expiration time
}

export class DecodeToken {
    public static decode(token:string | null): JwtPayload | null {
        if(!token)
            token = localStorage.getItem("token");
        token = token ?token.split("Bearer ")[1] : null;

        if (!token)
            return null;
        return jwtDecode<JwtPayload>(token);
    }
}
