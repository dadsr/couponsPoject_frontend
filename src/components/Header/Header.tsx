import "./Header.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import authServices from "../../services/AuthServices.ts";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";


/**
 * `Header` Component
 * @description Displays a header with user information and login/logout functionality.
 *
 * @returns {JSX.Element} The JSX element representing the header.
 */
export function Header(): JSX.Element {
    const navigate = useNavigate();
    const {userData, isLoggedIn, setAuthState} = useAuth();
    const {setSidebar} = useSidebarContext();


    /**
     * Handles the logout process for the user.
     * - Displays a farewell message if logged in.
     * - Clears authentication and sidebar state.
     * - Navigates to the login page after logout.
     */
    const onLogout = async () => {
        if (isLoggedIn)
            alert("have a nice day");
        setAuthState(null);
        setSidebar({
            buttons: <div></div>,
            data: <div></div>,
        });
        await authServices.logout();
        navigate("/login");
    }

    return (
        <header className="header">
            <div className="header-content">
                {isLoggedIn && userData ? (
                    <>
                        <button onClick={onLogout} className="logout-button"> Logout</button>
                        <p>Welcome, {userData.name} Email: {userData.email}</p>
                    </>
                ) : (
                    <>
                        <button onClick={onLogout} className="login-button"> Login</button>
                        <p>Welcome, please log in</p>
                    </>
                )}
            </div>
        </header>
    );
}