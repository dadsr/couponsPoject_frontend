import "./Css/AdminCard.css"

import {Company} from "../../Models/Company.ts";
import {useNavigate} from "react-router-dom";

interface companyProps {
    company: Company;
}

export function AdminCompanyCard(props:companyProps): JSX.Element {
    const navigate =useNavigate()

    return (
        <div className="AdminCompanyCard" onClick={() => navigate("/admin/company/" + props.company.id ,
        {
            state: { companyData: props.company },
        })}>
            <h2>name: {props.company.name}</h2>
            <p>id: {props.company.id}</p>
            <p>email: {props.company.email}</p>
        </div>
    );
}