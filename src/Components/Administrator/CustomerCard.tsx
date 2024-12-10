import {useNavigate} from "react-router-dom";
import {Customer} from "../../Models/Customer.ts";

interface customerProps {
    customer: Customer;
}

export function CustomerCard(props:customerProps): JSX.Element {
    const navigate =useNavigate()

    return (
        <div className="CustomerCard" onClick={() => navigate("/customer/" + props.customer.id)}>
            <h2>{props.customer.firstName} {props.customer.lastName}</h2>
            <p>id: {props.customer.id}</p>
            <p>email: {props.customer.email}</p>
        </div>
    );
}