import "./Css/AdminHome.css";
import {useEffect, useState} from "react";
import {Company} from "../../Models/Company.ts";
import {useParams} from "react-router-dom";
import administratorServices from "../../Services/AdministratorServices.ts";
import {AdminCompanyCard} from "./AdminCompanyCard.tsx";
import {AdminCustomerCard} from "./AdminCustomerCard.tsx";
import {Customer} from "../../Models/Customer.ts";


export function AdminHome(): JSX.Element {
    const params = useParams();
    const id = Number(params.id);

    const[companies, setCompanies] = useState<Company[]>([]);
    const[customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        //companies
        administratorServices.getCompanies()
            .then(res =>{
                setCompanies(res);
                //customers
                administratorServices.getCustomers()
                    .then(res => setCustomers(res))
                    .catch(err => console.log(err));
            })
            .catch(res => console.log(res))
            .finally(() => setLoading(false));
    },[id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!companies) {
        return <div>Error: no companies found</div>;
    }
    if (!customers) {
        return <div>Error: no customers found</div>;
    }
    return (
        <>
            <div className="CompaniesList">
                {
                    companies.map((company) => (<AdminCompanyCard key={company.id} company={company}/>))
                }
            </div>

            <div className="CustomersList">
                {
                    customers.map(customer => (<AdminCustomerCard key={customer.id} customer={customer}/>))
                }
            </div>
        </>
    );
}