import './Css/CompanyCouponEdit.css';

import React, {useEffect, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import {Coupon} from "../../Models/Coupon.ts";
import companyServices from "../../Services/CompanyServices.ts";
import CategoryColors, {Category} from "../../Models/CategoryEnum.tsx";


export function CompanyCouponEdit(): JSX.Element {
    const location =useLocation();
    const {couponData}  =location.state ;
    const mode = couponData.id ===0?"add":"edit";
    const navigate = useNavigate();

    const  [coupon,setCoupon] = useState<Coupon>();
    const [couponFormData, setCouponFormData] = useState<{
        id: number;
        title: string;
        description: string;
        companyId: number;
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
        companyId: 0,
        category: "DEFAULT",
        price: 0,
        amount: 0,
        startDate: "",
        endDate: "",
        image: "",
    });


    useEffect(() => {
        if (couponData) {
            setCoupon(couponData);
        }
    }, [couponData]);

    useEffect(() => {
        if (couponData) {
            setCoupon(couponData);
        }
    }, [couponData]);

    useEffect(() => {
        if (coupon) {
            setCouponFormData(prevState => ({
                ...prevState,
                id: coupon.id || prevState.id,
                title: coupon.title || prevState.title,
                description: coupon.description || prevState.description,
                companyId:coupon.companyId || prevState.companyId,
                category: coupon.category || prevState.category,
                price: coupon.price || prevState.price,
                amount: coupon.amount || prevState.amount,
                startDate: coupon.startDate || prevState.startDate,
                endDate: coupon.endDate || prevState.endDate,
                image: coupon.image || prevState.image
            }));
        }
    }, [coupon]);

    if (!coupon) {
        return <div>Error: Company not found</div>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCouponFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const submitEdit= async (event: React.FormEvent) =>{
        event.preventDefault();

        console.log("id:" + coupon.id + "," +
            "title" + couponFormData.title + "," +
            "description" + couponFormData.description + "," +
            "companyId" + couponFormData.companyId + "," +
            "category" + couponFormData.category + "," +
            "price" + couponFormData.price + "," +
            "amount" + couponFormData.amount + "," +
            "startDate" + couponFormData.startDate + "," +
            "endDate" + couponFormData.endDate + "," +
            "image" + couponFormData.image);

        switch (mode){
            case "edit":{
                await companyServices
                    .updateCoupon(
                        new Coupon (
                            coupon.id,
                            couponFormData.title,
                            couponFormData.description,
                            couponFormData.companyId,
                            couponFormData.category,
                            couponFormData.price,
                            couponFormData.amount,
                            couponFormData.startDate,
                            couponFormData.endDate,
                            couponFormData.image
                        )
                    )
                    .catch((error) => console.error("update failed:", error));
            }break;
            case "add":{
                await companyServices
                    .addCoupon(
                        new Coupon (
                            coupon.id,
                            couponFormData.title,
                            couponFormData.description,
                            couponFormData.companyId,
                            couponFormData.category,
                            couponFormData.price,
                            couponFormData.amount,
                            couponFormData.startDate,
                            couponFormData.endDate,
                            couponFormData.image
                        )
                    )
                    .catch((error) => console.error("adding failed:", error));
            }break;
        }
        navigate(`/company/${coupon.companyId}`);
    }


    return (
        <form onSubmit={submitEdit} className="couponEdit-form">
            <label>title: </label>
            <input type="texst" name="title" value={couponFormData.title} onChange={handleChange} required/>
            <p>id: : {coupon.id}</p>
            <label>description: </label>
            <input type="texst" name="description" value={couponFormData.description} onChange={handleChange} required/><br/>
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