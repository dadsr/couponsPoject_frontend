import "./Css/AdminCompanyCard.css";

import {useNavigate} from "react-router-dom";
import {Company} from "../../models/Company.ts";

interface companyProps {
    company: Company;
}

/**
 * The `AdminCompanyCard` function component displays a card with company details
 * and allows navigation to the company edit page when clicked.
 *
 * @param {companyProps} props - The properties passed to the component, including the company object.
 * @returns {JSX.Element} The rendered company card.
 */
export function AdminCompanyCard(props: companyProps): JSX.Element {
    const navigate = useNavigate()

    /**
     * Renders a clickable card displaying company details.
     * On click, navigates to the company edit page with the selected company's data and "edit" mode.
     */
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