import './Css/CompanyCouponEdit.css';

import React, {useEffect, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import {Coupon} from "../../Models/Coupon.ts";
import companyServices from "../../Services/CompanyServices.ts";
import CategoryColors from "../../Models/CategoryEnum.tsx";
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
        description: "",
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
        <form onSubmit={submitEdit} className="couponEdit-form">
            <label>title: </label>
            <input type="texst" name="title" value={couponFormData.title} onChange={handleChange} required/>
            <p>id: : {coupon.id}</p>
            <label>description: </label>
            <textarea  name="description" rows={4} cols={78}  value={couponFormData.description} onChange={handleChange} required/><br/>
            <label>category:</label>
            <select name="category" value={couponFormData.category} onChange={handleChange}>
                {couponFormData.category ==="DEFAULT" && <option value="" disabled>--Select a category--</option>}
                {Object.keys(CategoryColors)
                    .filter(category => category !== "DEFAULT")
                    .map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
            </select><br/>
            <label>startDate: </label>
            <input type="date" name="startDate" value={couponFormData.startDate} onChange={handleChange} required/><br/>
            <label>endDate: </label>
            <input type="date" name="endDate" value={couponFormData.endDate} onChange={handleChange} required/><br/>
            <label>price: </label>
            <input type="number" name="price" value={couponFormData.price} onChange={handleChange} required/><br/>
            <label>amount: </label>
            <input type="number" name="amount" value={couponFormData.amount} onChange={handleChange} required/><br/>
            <p>companyId: {coupon.companyId}</p>
            <p>image: {coupon.image}</p>
            <button type="submit">{mode==="add"?"Add":"Update"}</button>
        </form>
    );
}