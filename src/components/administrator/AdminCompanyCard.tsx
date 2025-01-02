import "./Css/AdminCompanyCard.css";

import {useNavigate} from "react-router-dom";
import {Company} from "../../Models/Company.ts";

interface companyProps {
    company: Company;
}

export function AdminCompanyCard(props: companyProps): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="AdminCompanyCard" onClick={() => navigate("/admin/company-edit/" + props.company.id,
            {
                state: {
                    company: props.company,
                    mode: "edit"
                },
            })
        }>
            <h2>name: {props.company.name}</h2>
            <p>id: {props.company.id}</p>
            <p>email: {props.company.email}</p>
        </div>
    );
}