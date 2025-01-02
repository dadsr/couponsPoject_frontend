import "./Css/AdminCustomerEdit.css";

import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Customer} from "../../Models/Customer.ts";
import administratorServices from "../../services/AdministratorServices.ts";

interface LocationState {
    state: {
        customer: Customer | null;
        mode: string;
    };
}

export function AdminCustomerEdit(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation() as LocationState;
    const {customer, mode} = location.state;

    const [customerFormData, setCustomerFormData] = useState<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;

    }>({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: ""

    });

    useEffect(() => {
        if (customer) {
            setCustomerFormData(prevState => ({
                ...prevState,
                id: customer.id || prevState.id,
                firstName: customer.firstName || prevState.firstName,
                lastName: customer.lastName || prevState.lastName,
                email: customer.email || prevState.email,
                password: customer.password || prevState.password
            }));

        }
    }, [customer]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setCustomerFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitEdit = async (event: React.FormEvent) => {
        event.preventDefault();

        switch (mode) {
            case "edit": {
                await administratorServices
                    .updateCustomer(
                        new Customer(
                            customerFormData.id,
                            customerFormData.firstName,
                            customerFormData.lastName,
                            customerFormData.email,
                            null
                        )
                    );
            }
                break;
            case "add": {
                await administratorServices
                    .addCustomer(
                        new Customer(
                            0,
                            customerFormData.firstName,
                            customerFormData.lastName,
                            customerFormData.email,
                            customerFormData.password
                        )
                    )
            }
                break;
        }
        navigate(`/admin`);
    }

    return (
        <form onSubmit={submitEdit} className="customerEdit-form">
            {mode === "edit" && <p>id: {customerFormData.id}</p>}
            <label>firstName: </label>
            <input type="text" name="firstName" value={customerFormData.firstName} onChange={handleChange} required/><br/>
            <label>lastName: </label>
            <input type="text" name="lastName" value={customerFormData.lastName} onChange={handleChange} required/><br/>
            <label>email: </label>
            <input type="email" name="email" value={customerFormData.email} onChange={handleChange} required/><br/>
            {mode === "add" && <label>password: </label>}
            {mode === "add" && <input type="password" name="password" value={customerFormData.password} onChange={handleChange} required/>}
            <br/>
            <button type="submit">{mode === "add" ? "Add" : "Update"}</button>
        </form>
    );
}