import "./Login.css"

import authServices from "../../services/AuthServices.ts";
import {DecodeToken} from "../../services/DecodeToken.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, UserData} from "../../contexts/AuthContext.tsx";

export function Login(): JSX.Element {
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        await authServices.login(loginFormData.email, loginFormData.password, loginFormData.role)
            .then((token) => {
                const decodedToken = DecodeToken.decode(token) as UserData;
                console.log(decodedToken);
                if(decodedToken){
                    localStorage.setItem("userData",JSON.stringify(decodedToken));
                    setAuthState(decodedToken);

                    switch (decodedToken.role) {
                        case "ADMINISTRATOR":
                            navigate("/admin");
                            break;
                        case "COMPANY":
                            navigate(`/company/${decodedToken.id}`);
                            break;
                        case "CUSTOMER":
                            navigate(`/customer/${decodedToken.id}`);
                            break;
                        default:
                            console.error("Unknown role");
                    }
                }else
                    console.error("Unknown user");

            })
            .catch((error) => console.error("Login failed:", error));
    };

    return (
        <form onSubmit={submitLogin} className="login-form">
            <label>Email:</label>
            <input type="email" name="email" value={loginFormData.email} onChange={handleChange} required/>

            <label>Password:</label>
            <input type="password" name="password" value={loginFormData.password} onChange={handleChange} required/>
            <fieldset className="role-radio">
                <legend>Your Role</legend>
                <input type="radio" name="role" value="ADMINISTRATOR" checked={loginFormData.role === "ADMINISTRATOR"}
                       onChange={handleChange}/>Administrator<br/>
                <input type="radio" name="role" value="COMPANY" checked={loginFormData.role === "COMPANY"}
                       onChange={handleChange}/>Company<br/>
                <input type="radio" name="role" value="CUSTOMER" checked={loginFormData.role === "CUSTOMER"}
                       onChange={handleChange}/>Customer<br/>
            </fieldset>
            <button type="submit">Login</button>
        </form>
    );
}