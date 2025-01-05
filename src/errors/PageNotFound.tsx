import "./PageNotFound.css"
import {useNavigate} from "react-router-dom";

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