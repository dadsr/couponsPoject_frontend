import "./Login.css";

import {useNavigate} from "react-router-dom";
import {useState} from "react";
import authServices from "../../Services/AuthServices.ts";

export function Login(): JSX.Element {

    const [loginFormData,setLoginFormData] = useState({email: "",password: "",role: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLoginFormData((prevData) =>({
            ...prevData, [name]: value
        }));
    };

    const submitLogin = (event) => {
        event.preventDefault();
        const navigate = useNavigate();
        const { email, password, role } = loginFormData;
        authServices.Login(email, password, role)
            .then((token) => {
                localStorage.token = token;
                alert("HELLO");
                switch (role) {
                    case "ADMINISTRATOR":
                        navigate("/AdminHome");
                        break;
                    case "COMPANY":
                        navigate("/CompanyHome"); // Assuming a different route for COMPANY
                        break;
                    case "CUSTOMER":
                        navigate("/CustomerHome"); // Assuming a different route for CUSTOMER
                        break;
                    default:
                        console.error("Unknown role");
                }
            })
            .catch(error => {
                console.error("Login failed:", error);
            });
    }

    //String email, String password, ClientTypeEnum clientType
    return (
        <form onSubmit={submitLogin}>
            <label>Email: </label>
            <input type="email" name="email" required value={loginFormData.email} onChange={handleChange}/><br/>
            <label>Password: </label>
            <input type="password" name="password" required value={loginFormData.password}
                   onChange={handleChange}/><br/>
            <fieldset>
                <legend>Your Role</legend>
                <input type="radio" name="role" value="Administrator" checked={loginFormData.role === "ADMINISTRATOR"}/>Administrator<br/>
                <input type="radio" name="role" value="Company" checked={loginFormData.role === "COMPANY"}/>Company<br/>
                <input type="radio" name="role" value="Customer"
                       checked={loginFormData.role === "CUSTOMER"}/>Customer<br/>
            </fieldset>

            <button type="submit">Login</button>
        </form>
    );
}