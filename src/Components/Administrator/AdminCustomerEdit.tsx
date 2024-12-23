import "./Css/AdminCustomerEdit.css";

import React, {useEffect, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import ModesEnum from "../../Models/ModesEnum.tsx";
import {useSidebarContext} from "../../Context/SidebarContext.tsx";
import {Customer} from "../../Models/Customer.ts";
import administratorServices from "../../Services/AdministratorServices.ts";


export function AdminCustomerEdit(): JSX.Element {
    const location =useLocation();
    const {customerData}  =location.state ;
    const mode = customerData.id ===0?"add":"edit";
    const navigate = useNavigate();
    const { setSidebarData } = useSidebarContext();


    const  [customer,setCustomer] = useState<Customer>();
    const [customerFormData, setCustomerFormData] = useState<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>({
        id: 0,
        firstName: "",
        lastName: "",
        email: ""
    });


    useEffect(() => {
        if (customerData) {
            setCustomer(customerData);
        }
    }, [customerData]);

    useEffect(() => {
        if (customerData) {
            setCustomer(customerData);
        }
    }, [customerData]);

    useEffect(() => {
        if (customer) {
            setCustomerFormData(prevState => ({
                ...prevState,
                id: customer.id || prevState.id,
                title: customer.firstName || prevState.firstName,
                description: customer.lastName || prevState.lastName,
                companyId:customer.email || prevState.email
            }));
        }
        const deleteCustomer = () => {
            if(customer){
                administratorServices.deleteCustomer(customer.id)
                    .then()
                    .catch()
            }
        };

        setSidebarData({
            mode: ModesEnum.CUST_DETAILS,
            buttons: <>
                <button title="Delete" onClick={deleteCustomer}>Delete Customer</button>
            </>,
            cards: <div>
                <h2>Customer edit</h2>
                <p>id: {customer?.id}</p>
                <p>firstName: {customer?.firstName}</p>
                <p>lastName: {customer?.lastName}</p>
                <p>email: {customer?.email}</p>
            </div>
        });

    }, [customer, setSidebarData]);

    if (!customer) {
        return <div>Error: Customer not found</div>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCustomerFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const submitEdit= async (event: React.FormEvent) =>{
        event.preventDefault();

        console.log("id:" + customer.id + "," +
            "firstName" + customerFormData.firstName + "," +
            "lastName" + customerFormData.lastName + "," +
            "email" + customerFormData.email );

        switch (mode){
            case "edit":{
                await administratorServices
                    .updateCustomer(
                        new Customer (
                            customer.id,
                            customerFormData.firstName,
                            customerFormData.lastName,
                            customerFormData.email
                        )
                    )
                    .catch((error) => console.error("update failed:", error));
            }break;
            case "add":{
                await administratorServices
                    .addCustomer(
                        new Customer (
                            0,
                            customerFormData.firstName,
                            customerFormData.lastName,
                            customerFormData.email
                        )
                    )
                    .catch((error) => console.error("adding failed:", error));
            }break;
        }
        navigate(`/admin`);
    }


    return (
        <form onSubmit={submitEdit} className="customerEdit-form">
            <p>id: {customer.id}</p>
            <label>firstName: </label>
            <input type="texst" name="firstName" value={customerFormData.firstName} onChange={handleChange} required/>
            <label>lastName: </label>
            <input type="texst" name="lastName" value={customerFormData.lastName} onChange={handleChange} required/>
            <label>email: </label>
            <input type="email" name="email" value={customerFormData.email} onChange={handleChange} required/>
            <br/>
            <button type="submit">{mode === "add" ? "Add" : "Update"}</button>
        </form>
    );
}