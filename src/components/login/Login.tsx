import "./Login.css"

import authServices from "../../services/AuthServices.ts";
import {DecodeToken} from "../../services/DecodeToken.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, UserData} from "../../contexts/AuthContext.tsx";
import {useErrorHandler} from "../../errors/errorHandler.ts";
import ErrorPopup from "../popups/ErrorPop.tsx";

/**
 * Functional component for the Login page.
 *
 * This component provides a login form where users can enter their email, password,
 * and role (Administrator, Company, or Customer). It handles form submission,
 * authenticates the user, decodes the token, and navigates to the appropriate page
 * based on the user's role. Errors are displayed using a reusable `ErrorPopup` component.
 *
 * @returns {JSX.Element} A JSX element rendering the login form and error popup.
 */
export function Login(): JSX.Element {
    const navigate = useNavigate();
    const {setAuthState} = useAuth();
    const {error, handleError, closeError} = useErrorHandler();


    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    /**
     * Handles changes in input fields and updates the login form state.
     *
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} event - The change event from input/select elements.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Handles login form submission.
     *
     * Authenticates the user by calling the `authServices.login` method with the provided credentials.
     * Decodes the token to retrieve user data and navigates to the appropriate page based on the user's role.
     * Displays an error popup if authentication fails or if an unknown role is encountered.
     *
     * @param {React.FormEvent} event - The form submission event.
     */
    const submitLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        await authServices.login(loginFormData.email, loginFormData.password, loginFormData.role)
            .then((token) => {
                const decodedToken = DecodeToken.decode(token) as UserData;
                console.log(decodedToken);
                if (decodedToken) {
                    localStorage.setItem("userData", JSON.stringify(decodedToken));
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
                            handleError("Unknown role");
                    }
                } else
                    handleError("Unknown user");
            })
            .catch((err) => handleError(err))
    };

    return (
        <>
            <form onSubmit={submitLogin} className="login-form">
                <label>Email:</label>
                <input type="email" name="email" value={loginFormData.email} onChange={handleChange} required/>

                <label>Password:</label>
                <input type="password" name="password" value={loginFormData.password} onChange={handleChange} required/>
                <fieldset className="role-radio">
                    <legend>Your Role</legend>
                    <input type="radio" name="role" value="ADMINISTRATOR"
                           checked={loginFormData.role === "ADMINISTRATOR"}
                           onChange={handleChange}/>Administrator<br/>
                    <input type="radio" name="role" value="COMPANY" checked={loginFormData.role === "COMPANY"}
                           onChange={handleChange}/>Company<br/>
                    <input type="radio" name="role" value="CUSTOMER" checked={loginFormData.role === "CUSTOMER"}
                           onChange={handleChange}/>Customer<br/>
                </fieldset>
                <button type="submit">Login</button>
            </form>

            <ErrorPopup
                open={error.show}
                status={error.status}
                message={error.message}
                onClose={closeError}
            />
        </>
    );
}