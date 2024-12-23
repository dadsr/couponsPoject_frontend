import "./Css/AdminCompanyEdit.css";

import React, {useEffect, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import ModesEnum from "../../Models/ModesEnum.tsx";
import {useSidebarContext} from "../../Context/SidebarContext.tsx";
import {Company} from "../../Models/Company.ts";
import administratorServices from "../../Services/AdministratorServices.ts";


export function AdminCompanyEdit(): JSX.Element {
    const location =useLocation();
    const {companyData}  =location.state ;
    const mode = companyData.id ===0?"add":"edit";
    const navigate = useNavigate();
    const { setSidebarData } = useSidebarContext();


    const  [company,setCompany] = useState<Company>();
    const [companyFormData, setCompanyFormData] = useState<{
        id:number;
        name:string;
        email:string;
    }>({
        id: 0,
        name: "",
        email: ""
    });


    useEffect(() => {
        if (companyData) {
            setCompany(companyData);
        }
    }, [companyData]);

    useEffect(() => {
        if (company) {
            setCompanyFormData(prevState => ({
                ...prevState,
                id: company.id || prevState.id,
                name: company.name || prevState.name,
                email: company.email || prevState.email
            }));
        }
        //todo
        const deleteCompany = () => {
            if(company){
                administratorServices.deleteCompany(company.id)
                    .then()
                    .catch()
            }
        };

        setSidebarData({
            mode: ModesEnum.COMP_DETAILS,
            buttons: <>
                <button title="Delete" onClick={deleteCompany}>Delete Company</button>
            </>,
            cards: <div>
                <h2>Company edit</h2>
                <p>id: {company?.id}</p>
                <p>name: {company?.name}</p>
                <p>email: {company?.email}</p>
            </div>
        });

    }, [company, setSidebarData]);

    if (!company) {
        return <div>Error: Company not found</div>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCompanyFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const submitEdit= async (event: React.FormEvent) =>{
        event.preventDefault();

        console.log("id:" + company.id + "," +
            "name" + companyFormData.name + "," +
            "email" + companyFormData.email);

        switch (mode){
            case "edit":{
                await administratorServices
                    .updateCompany(
                        new Company (
                            company.id,
                            companyFormData.name,
                            companyFormData.email
                        )
                    )
                    .catch((error) => console.error("update failed:", error));
            }break;
            case "add":{
                await administratorServices
                    .addCompany(
                        new Company (
                            0,
                            companyFormData.name,
                            companyFormData.email
                        )
                    )
                    .catch((error) => console.error("adding failed:", error));
            }break;
        }
        navigate(`/admin`);
    }


    return (
        <form onSubmit={submitEdit} className="companyEdit-form">
            <p>id: {company.id}</p>
            <label>name: </label>
            <input type="texst" name="name" value={companyFormData.name} onChange={handleChange} required/><br/>
            <label>email: </label>
            <input type="email" name="email" value={companyFormData.email} onChange={handleChange} required/><br/>
            <br/>
            <button type="submit">{mode === "add" ? "Add" : "Update"}</button>
        </form>
    );
}