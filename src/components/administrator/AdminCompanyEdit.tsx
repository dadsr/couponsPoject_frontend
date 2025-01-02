import "./Css/AdminCompanyEdit.css";

import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Company} from "../../Models/Company.ts";
import administratorServices from "../../services/AdministratorServices.ts";


interface LocationState {
    state: {
        company: Company | null;
        mode: string;
    };
}

export function AdminCompanyEdit(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation() as LocationState;
    const {company,mode} = location.state;

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

    useEffect(() => {
        if(company) {
            setCompanyFormData(prevState => ({
                ...prevState,
                id: company.id || prevState.id,
                name: company.name || prevState.name,
                email: company.email || prevState.email,
                password: company.password || prevState.password
            }));
        }
    }, [company]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setCompanyFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


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
                    );
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
            }
                break;
        }
        navigate(`/admin`);
    }

    return (
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
    );
}