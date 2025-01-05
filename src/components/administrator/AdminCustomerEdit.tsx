import "./Css/AdminCustomerEdit.css";

import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Customer} from "../../models/Customer.ts";
import administratorServices from "../../services/AdministratorServices.ts";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";
import {useErrorHandler} from "../../errors/errorHandler.ts";
import ErrorPopup from "../popups/ErrorPop.tsx";

interface LocationState {
    state: {
        customer: Customer | null;
        mode: string;
    };
}

/**
 * The `AdminCustomerEdit` function component allows administrators to add or edit customer details.
 * It dynamically adjusts its behavior based on the mode ("add" or "edit") passed through navigation state.
 *
 * @returns {JSX.Element} The rendered customer edit page.
 */
export function AdminCustomerEdit(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation() as LocationState;
    const {customer, mode} = location.state;

    const {setSidebar} = useSidebarContext();
    const {error, handleError, closeError} = useErrorHandler();

    /**
     * Updates the sidebar with a "Back" button for navigating back to the admin home page.
     */
    const updateSidebar = () => {
        setSidebar({
            buttons:
                (
                    <div>
                        <br/>
                        <button title="Back" onClick={() => {
                            navigate(`/admin`);
                        }}> Back
                        </button>
                        <br/>
                        {mode === "edit" &&
                            <button title="Delete" onClick={async () => {
                                await administratorServices.deleteCustomer(customer!.id)
                                    .catch((err) => handleError(err));
                                navigate(`/admin`);
                            }}> Delete </button>}
                    </div>
                ),
            data: <div></div>
        });
    };

    /**
     * State to manage form data for the customer being edited or added.
     */
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

    /**
     * Populates the form with existing customer data (if in "edit" mode)
     * and updates the sidebar when the component mounts or the customer changes.
     */
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
        updateSidebar();
    }, [customer]);

    /**
     * Handles changes to form inputs and updates the corresponding state values.
     *
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event - The input change event.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setCustomerFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Submits the form data to either add a new customer or update an existing one
     * depending on the mode ("add" or "edit").
     *
     * @param {React.FormEvent} event - The form submission event.
     */
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
                    )
                    .catch((err) => handleError(err));
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
                    .catch((err) => handleError(err));
            }
                break;
        }
        navigate(`/admin`);
    }

    /**
     * Renders the form for editing or adding a customer, along with an error popup if any errors occur.
     */
    return (
        <>
            {mode === "edit" && <h1>Edit Selected Customer </h1>}
            {mode === "add" && <h1>Add New Customer </h1>}
            <form onSubmit={submitEdit} className="customerEdit-form">
                {mode === "edit" && <p>id: {customerFormData.id}</p>}
                <label>firstName: </label>
                <input type="text" name="firstName" value={customerFormData.firstName} onChange={handleChange}
                       required/><br/>
                <label>lastName: </label>
                <input type="text" name="lastName" value={customerFormData.lastName} onChange={handleChange}
                       required/><br/>
                <label>email: </label>
                <input type="email" name="email" value={customerFormData.email} onChange={handleChange} required/><br/>
                {mode === "add" && <label>password: </label>}
                {mode === "add" &&
                    <input type="password" name="password" value={customerFormData.password} onChange={handleChange}
                           required/>}
                <br/>
                <button type="submit">{mode === "add" ? "Add" : "Update"}</button>
            </form>

            <ErrorPopup
                open={error.show}
                status={error.status}
                message={error.message}
                onClose={closeError}
            />
        </>
    );
}