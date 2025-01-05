import "./PageNotFound.css"
import {useNavigate} from "react-router-dom";

/**
 * Functional component to display a "404 Page Not Found" error.
 *
 * @returns {JSX.Element} A JSX element rendering an image for the 404 error page.
 */
export function PageNotFound(): JSX.Element {
    const navigate = useNavigate();

    return (
            <img
                className="img-404"
                src={`${import.meta.env.BASE_URL}assets/404.gif`}
                alt="404"
                onClick={() => navigate("/login")}
            />
    );
}