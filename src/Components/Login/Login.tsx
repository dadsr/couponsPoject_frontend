import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import authServices from "../../Services/AuthServices.ts";

export function Login(): JSX.Element {
   const navigate = useNavigate(); // Move useNavigate to top level

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password, role } = loginFormData;

        authServices
            .Login(email, password, role)
            .then((token) => {
                localStorage.setItem("token", token);
                alert("Login successful!"+token);
                 switch (role) {
                     case "ADMINISTRATOR":
                        navigate("/admin");
                         break;
                    case "COMPANY":
                        navigate("/company");
                        break;
                    case "CUSTOMER":
                        navigate("/customer");
                        break;
                    default:
                        console.error("Unknown role");
                 }
            })
           .catch((error) => {
               console.error("Login failed:", error);
                alert("Login failed. Please check your credentials.");
            });

    };

    return (
        <>
            <h1>XXX</h1>
            <form onSubmit={submitLogin}>
                <label>Email: </label>
                <input type="email" name="email" required value={loginFormData.email} onChange={handleChange}/><br />
                <label>Password: </label>
                <input type="password" name="password" required value={loginFormData.password} onChange={handleChange}/><br />
                <fieldset>
                    <legend>Your Role</legend>
                    <input type="radio" name="role" value="ADMINISTRATOR" checked={loginFormData.role === "ADMINISTRATOR"} onChange={handleChange}/>Administrator<br />
                    <input type="radio" name="role" value="COMPANY" checked={loginFormData.role === "COMPANY"} onChange={handleChange}/>Company<br />
                    <input type="radio" name="role" value="CUSTOMER" checked={loginFormData.role === "CUSTOMER"} onChange={handleChange}/>Customer<br />
                </fieldset>
                <button type="submit">Login</button>
            </form>
        </>
    );
}