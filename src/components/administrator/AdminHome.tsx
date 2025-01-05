import "./Css/AdminHome.css";
import  {useEffect, useState} from "react";
import {Company} from "../../models/Company.ts";
import {Customer} from "../../models/Customer.ts";
import administratorServices from "../../services/AdministratorServices.ts";
import {AdminCompanyCard} from "./AdminCompanyCard.tsx";
import {AdminCustomerCard} from "./AdminCustomerCard.tsx";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";
import {useNavigate} from "react-router-dom";
import {useErrorHandler} from "../../errors/errorHandler.ts";
import ErrorPopup from "../popups/ErrorPop.tsx";


/**
 * The `AdminHome` function component serves as the main admin interface for managing companies and customers.
 * It fetches data, handles navigation, updates the sidebar, and displays error messages when necessary.
 *
 * @returns {JSX.Element} The rendered admin home page.
 */
export function AdminHome(): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const [companies, setCompanies] = useState<Company[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    const {setSidebar} = useSidebarContext();
    const {error, handleError, closeError} = useErrorHandler();

    /**
     * Navigates to the company edit page in "add" mode with a temporary empty company object.
     */
    const handleNewCompany = () => {
        const temp = new Company(0, "", "", "");
        navigate("/admin/company-edit/" + 0,
            {
                state:
                    {
                        company: temp,
                        mode: "add"
                    }
            }
        );
    }

    /**
     * Navigates to the customer edit page in "add" mode with a temporary empty customer object.
     */
    const handleNewCustomer = () => {
        const temp = new Customer(0, "", "", "", "");
        navigate("/admin/customer-edit/" + 0,
            {
                state:
                    {
                        customer: temp,
                        mode: "add"
                    }
            }
        );
    }

    /**
     * Updates the sidebar with buttons for adding new companies and customers,
     * along with placeholder data for additional sidebar content.
     */
    const updateSidebar = () => {
        setSidebar({
            buttons:
                (
                    <div>
                        <button title="New Company" onClick={handleNewCompany}>New Company</button>
                        <br/>
                        <button title="New Customer" onClick={handleNewCustomer}>New Customer</button>
                    </div>
                ),
            data: <div>
                <img
                    src={`${import.meta.env.BASE_URL}assets/admin.gif`}
                    alt="fwb"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        marginTop: '10px'
                    }}
                />
            </div>
        });
    };

    /**
     * Fetches companies and customers data when the component mounts,
     * updates the sidebar, and handles any errors that occur during fetching.
     */
    useEffect(() => {
        Promise.all([
            administratorServices.getCompanies(),
            administratorServices.getCustomers()
        ])
            .then(([companiesData, customersData]) => {
                setCompanies(companiesData);
                setCustomers(customersData);
            })
            .catch((err) => {
                handleError(err);
            })
            .finally(() => {
                updateSidebar();
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    /**
     * Renders the admin home page with lists of companies and customers,
     * as well as an error popup for displaying any errors that occur.
     */
    return (
        <div className="AdminHome">
            <h1>Admin Page</h1>
            <h3>Companies</h3>
            <h4>* click for edit</h4>
            <div className="CompaniesList">
                {companies.map((company) => (<AdminCompanyCard key={company.id} company={company}/>))}
            </div>
            <br/>
            <hr/>
            <br/>
            <h3>Customers</h3>
            <h4>* click for edit</h4>
            <div className="CustomersList">
                {customers.map(customer => (<AdminCustomerCard key={customer.id} customer={customer}/>))}
            </div>

            <ErrorPopup
                open={error.show}
                status={error.status}
                message={error.message}
                onClose={closeError}
            />
        </div>
    )
}