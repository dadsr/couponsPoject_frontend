import "./Header.css";
import { useAuth } from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";

export function Header(): JSX.Element {
    const { isLoggedIn, userData, logout } = useAuth();
    const navigate = useNavigate();
    const onLogout = () =>{
        alert("have a nice day")
        navigate("/login");
        logout();
    }
    return (
        <header className="header">
            <div className="header-content">
                {isLoggedIn ? (
                    <>
                        <button onClick={onLogout} className="logout-button">
                            Logout
                        </button>
                        <div className="user-info">
                            <p>Welcome, {userData.name} Email: {userData.email}</p>
                        </div>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            window.location.href = "/"; // Redirect to the login page
                        }}
                        className="login-button"
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}