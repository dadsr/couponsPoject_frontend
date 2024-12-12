import React, {useEffect, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import {Coupon} from "../../Models/Coupon.ts";
import {useAuth} from "../../Context/AuthContext.tsx";
import companyServices from "../../Services/CompanyServices.ts";


export function CompanyCouponEdit(): JSX.Element {
    const location =useLocation();
    const {couponData}  =location.state ;

    const navigate = useNavigate();
    const { login } = useAuth();

    const  [coupon,setCoupon] = useState<Coupon>();
    const [couponFormData,setCouponFormData] =useState({
        title: "",
        description: "",
        category: "",
        startDate: "",
        endDate: "",
        price: "",
        amount: "",
    })


    useEffect(() => {
        setCoupon(couponData);

    }, []);

    if (!coupon) {
        return <div>Error: Company not found</div>;
    }

    const submitEdit= async (event: React.FormEvent) =>{
        event.preventDefault();

        await companyServices
            .updateCoupon(
                new coupon (coupon.id,
                    couponFormData.title,
                    couponFormData.description,
                    couponFormData.category,
                    couponFormData.price,
                    couponFormData.amount,
                    couponFormData.startDate,
                    couponFormData.endDate,coupon.image)
            )
            .then()
            .catch((error) => console.error("Login failed:", error))
    }
    return (
        <form onSubmit={submitEdit} className="couponEdit-form">

            <label>{coupon.title}</label>
            <input type="texst" name="title" value={couponFormData.title} onChange={handleChange} required/>
            <p>id: {coupon.id}</p>
            <label>description: {coupon.description}</label>
            <label>category: {coupon.category}</label>
            <label>startDate: {coupon.startDate}</label>
            <label>endDate: {coupon.endDate}</label>
            <label>price {coupon.price}</label>
            <label>amount: {coupon.amount}</label>
            <p>companyId: {coupon.companyId}</p>
            <button type="submit">Login</button>
        </form>
    );
}