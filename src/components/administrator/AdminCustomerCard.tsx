import "./Css/AdminCustomerCard.css";

import {useNavigate} from "react-router-dom";
import {Customer} from "../../models/Customer.ts";

interface customerProps {
    customer: Customer;
}

/**
 * The `AdminCustomerCard` function component displays a card with customer details
 * and allows navigation to the customer edit page when clicked.
 *
 * @param {customerProps} props - The properties passed to the component, including the customer object.
 * @returns {JSX.Element} The rendered customer card.
 */
export function AdminCustomerCard(props:customerProps): JSX.Element {
    const navigate =useNavigate()

    /**
     * Renders a clickable card displaying customer details.
     * On click, navigates to the customer edit page with the selected customer's data and "edit" mode.
     */
    return (
        <div className="AdminCustomerCard" onClick={() => navigate("/admin/customer-edit/" + props.customer.id ,
            {
                state: {
                    customer: props.customer,
                    mode: "edit"
                },
            })
        }>
            <h2>{props.customer.firstName} {props.customer.lastName}</h2>
            <p>id: {props.customer.id}</p>
            <p>email: {props.customer.email}</p>
        </div>
    );
}