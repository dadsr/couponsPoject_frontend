import "./Header.css";
import { useAuth } from "../../Context/AuthContext";

export function Header(): JSX.Element {
    const { isLoggedIn, userData, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-content">
                {isLoggedIn ? (
                    <>
                        <button onClick={logout} className="logout-button">
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