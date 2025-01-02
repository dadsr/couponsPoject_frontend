import "./Css/AdminHome.css";

import {useEffect, useState} from "react";
import {Company} from "../../Models/Company.ts";
import {Customer} from "../../Models/Customer.ts";
import administratorServices from "../../services/AdministratorServices.ts";
import {AdminCompanyCard} from "./AdminCompanyCard.tsx";
import {AdminCustomerCard} from "./AdminCustomerCard.tsx";


export function AdminHome(): JSX.Element {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [companies, setCompanies] = useState<Company[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        Promise.all([
            administratorServices.getCompanies(),
            administratorServices.getCustomers()
        ])
            .then(([companiesData, customersData]) => {
                setCompanies(companiesData);
                setCustomers(customersData);
            })
            .catch((error) => {
                //todo error handle
                setError(error);
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
        return <div>Error: {error}</div>;
    }

    return (<>
            <h3>Companies</h3>
            <h5>* click for edit</h5>
            <div className="CompaniesList">
                {companies.map((company) => (<AdminCompanyCard key={company.id} company={company}/>))}
            </div>
            <br/>
            <hr/>
            <br/>
            <h3>Customers</h3>
            <h5>* click for edit</h5>
            <div className="CustomersList">
                {customers.map(customer => (<AdminCustomerCard key={customer.id} customer={customer}/>))}
            </div>
        </>
    )
}