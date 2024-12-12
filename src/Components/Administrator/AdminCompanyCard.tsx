import "./Css/AdminCard.css"

import {Company} from "../../Models/Company.ts";
import {useNavigate} from "react-router-dom";

interface companyProps {
    company: Company;
}

export function AdminCompanyCard(props:companyProps): JSX.Element {
    const navigate =useNavigate()

    return (
        <div className="AdminCompanyCard" onClick={() => navigate("/company/" + props.company.id)}>
            <h2>{props.company.name}</h2>
            <p>id: {props.company.id}</p>
            <p>id: {props.company.email}</p>
        </div>
    );
}