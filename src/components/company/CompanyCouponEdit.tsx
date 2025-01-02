import "./Css/CompanyCouponEdit.css";

import React, {useEffect, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import {Coupon} from "../../Models/Coupon.ts";
import CategoryColors, {Category} from "../../Models/CategoryEnum.tsx";
import {Company} from "../../Models/Company.ts";
import companyServices from "../../services/CompanyServices.ts";

interface LocationState {
    state: {
        coupon: Coupon | null;
        company: Company;
        mode: string;
    };
}


export function CompanyCouponEdit(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation() as LocationState;
    const {coupon, company,mode } = location.state;

    const [couponFormData, setCouponFormData] = useState<{
        id: number;
        title: string;
        description: string;
        companyName: string;
        category: Category;
        price: number;
        amount: number;
        startDate: string;
        endDate: string;
        image: string;
    }>({
        id: 0,
        title: "",
        description: "",
        companyName: "",
        category: "DEFAULT",
        price: 0,
        amount: 0,
        startDate: "",
        endDate: "",
        image: "",
    });


    useEffect(() => {
            if(coupon && company) {
                setCouponFormData(prevState => ({
                    ...prevState,
                    id: coupon.id || prevState.id,
                    title: coupon.title || prevState.title,
                    description: coupon.description || prevState.description,
                    companyName: company.name || prevState.companyName,
                    category: coupon.category || prevState.category,
                    price: coupon.price || prevState.price,
                    amount: coupon.amount || prevState.amount,
                    startDate: coupon.startDate || prevState.startDate,
                    endDate: coupon.endDate || prevState.endDate,
                    image: coupon.image || prevState.image
                }));
            }

    }, [coupon , company]);

    if (!(company)) {
        return <div>Error: Company not found</div>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setCouponFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const submitEdit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (coupon && company) {
            switch (mode) {
                case "edit": {
                    await companyServices
                        .updateCoupon(
                            new Coupon(
                                couponFormData.id,
                                couponFormData.title,
                                couponFormData.description,
                                company.id,
                                couponFormData.category,
                                couponFormData.price,
                                couponFormData.amount,
                                couponFormData.startDate,
                                couponFormData.endDate,
                                couponFormData.image
                            )
                        )
                        .catch((error) => console.error("update failed:", error));
                }
                    break;
                case "add": {
                    await companyServices
                        .addCoupon(
                            new Coupon(
                                0,
                                couponFormData.title,
                                couponFormData.description,
                                company.id,
                                couponFormData.category,
                                couponFormData.price,
                                couponFormData.amount,
                                couponFormData.startDate,
                                couponFormData.endDate,
                                couponFormData.image
                            )
                        )
                        .catch((error) => console.error("adding failed:", error));
                }
                    break;
            }
            navigate(`/company/${coupon.companyId}`);
        }
    }


    return (
        <form onSubmit={submitEdit} className="couponEdit-form">
            <label>title: </label>
            <input type="text" name="title" value={couponFormData.title} onChange={handleChange} required/>
            <p>id: : {couponFormData.id}</p>
            <label>description: </label>
            <textarea name="description" rows={4} cols={78} value={couponFormData.description} onChange={handleChange}
                      required/><br/>
            <label>category:</label>
            <select name="category" value={couponFormData.category} onChange={handleChange}>
                {couponFormData.category === "DEFAULT" && <option value="" disabled>--Select a category--</option>}
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
            <p>company name: {couponFormData.companyName}</p>
            <p>image: {couponFormData.image}</p>
            <button type="submit">{mode === "add" ? "Add" : "Update"}</button>
        </form>
    );
}