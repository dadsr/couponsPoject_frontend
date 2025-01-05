import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    id: number;
    name: string;
    email: string;
    role: string;
}
/**
 * Decodes a given JWT token or retrieves the token from localStorage if not provided.
 *
 * @param {string | null} token - The JWT token to decode. If null, it fetches the token from localStorage.
 * @returns {JwtPayload | null} The decoded payload of the JWT token, or null if no token is available.
 */
export class DecodeToken {
    public static decode(token:string | null): JwtPayload | null {
        if(!token)
            token = localStorage.getItem("token");
        if (!token)
            return null;
        return jwtDecode<JwtPayload>(token);
    }
}
