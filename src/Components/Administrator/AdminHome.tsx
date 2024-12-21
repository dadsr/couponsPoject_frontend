import "./Css/AdminHome.css";


import {useEffect, useState} from "react";
import {Company} from "../../Models/Company.ts";
import {Customer} from "../../Models/Customer.ts";
import administratorServices from "../../Services/AdministratorServices.ts";
import {AdminCompanyCard} from "./AdminCompanyCard.tsx";
import {AdminCustomerCard} from "./AdminCustomerCard.tsx";


export function AdminHome(): JSX.Element {

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const[companies, setCompanies] = useState<Company[]>([]);
    const[customers, setCustomers] = useState<Customer[]>([]);


    useEffect(() => {
        setIsLoading(true);
        setError(null);

        Promise.all([
            administratorServices.getCompanies(),
            administratorServices.getCustomers()
        ])
            .then(([companiesData, customersData]) => {
                setCompanies(companiesData);
                setCustomers(customersData);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load data. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!companies) {
        return <div>Error: no companies found</div>;
    }
    if (!customers) {
        return <div>Error: no customers found</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h3>Companies</h3>
            <div className="CompaniesList">
                {
                    companies.map((company) => (<AdminCompanyCard key={company.id} company={company}/>))
                }
            </div>
            <br/>
            <br/>
            <h3>Customers</h3>
            <div className="CustomersList">
                {
                    customers.map(customer => (<AdminCustomerCard key={customer.id} customer={customer}/>))
                }
            </div>
        </>
    );

}
