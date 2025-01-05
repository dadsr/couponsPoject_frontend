import "./Css/AdminCompanyEdit.css";

import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Company} from "../../models/Company.ts";
import administratorServices from "../../services/AdministratorServices.ts";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";
import ErrorPopup from "../popups/ErrorPop.tsx";
import {useErrorHandler} from "../../errors/errorHandler.ts";


interface LocationState {
    state: {
        company: Company | null;
        mode: string;
    };
}
/**
 * The `AdminCompanyEdit` function component allows administrators to add or edit company details.
 * It dynamically adjusts its behavior based on the mode ("add" or "edit") passed through navigation state.
 *
 * @returns {JSX.Element} The rendered company edit page.
 */
export function AdminCompanyEdit(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation() as LocationState;
    const {company, mode} = location.state;
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
                        <button title="Back" onClick={() => {navigate(`/admin`);}}> Back </button>
                        <br/>
                        {mode === "edit" &&
                            <button title="Delete" onClick={async () => {
                                await administratorServices.deleteCompany(company!.id)
                                    .catch((err) => handleError(err));
                                navigate(`/admin`);
                            }}> Delete </button>}
                            </div>
                            ),
                            data: <div></div>
                        });
                        };


    /**
     * State to manage form data for the company being edited or added.
     */
    const [companyFormData, setCompanyFormData] = useState<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>({
        id: 0,
        name: "",
        email: "",
        password: ""
    });

    /**
     * Populates the form with existing company data (if in "edit" mode)
     * and updates the sidebar when the component mounts or the company changes.
     */
    useEffect(() => {
        if (company) {
            setCompanyFormData(prevState => ({
                ...prevState,
                id: company.id || prevState.id,
                name: company.name || prevState.name,
                email: company.email || prevState.email,
                password: company.password || prevState.password
            }));
        }
        updateSidebar();
    }, [company]);

    /**
     * Handles changes to form inputs and updates the corresponding state values.
     *
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event - The input change event.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setCompanyFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Submits the form data to either add a new company or update an existing one
     * depending on the mode ("add" or "edit").
     *
     * @param {React.FormEvent} event - The form submission event.
     */
    const submitEdit = async (event: React.FormEvent) => {
        event.preventDefault();

        switch (mode) {
            case "edit": {
                await administratorServices
                    .updateCompany(
                        new Company(
                            companyFormData.id,
                            companyFormData.name,
                            companyFormData.email,
                            null
                        )
                    )
                    .catch((err) => handleError(err));
            }
                break;
            case "add": {
                await administratorServices
                    .addCompany(
                        new Company(
                            0,
                            companyFormData.name,
                            companyFormData.email,
                            companyFormData.password
                        )
                    )
                    .catch((err) => handleError(err));

            }
                break;
        }
        navigate(`/admin`);
    }

    /**
     * Renders the form for editing or adding a company, along with an error popup if any errors occur.
     */
    return (
        <>
            {mode === "edit" && <h1>Edit Selected Company </h1>}
            {mode === "add" && <h1>Add New Company </h1>}
            <form onSubmit={submitEdit} className="companyEdit-form">
                {mode === "edit" && <p>id: {companyFormData.id}</p>}
                <label>name: </label>
                <input type="text" name="name" value={companyFormData.name} onChange={handleChange} required/><br/>
                <label>email: </label>
                <input type="email" name="email" value={companyFormData.email} onChange={handleChange} required/><br/>
                {mode === "add" && <label>password: </label>}
                {mode === "add" && <input type="password" name="password" value={companyFormData.password} onChange={handleChange} required/>}
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