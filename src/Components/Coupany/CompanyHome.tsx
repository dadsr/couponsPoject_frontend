import "../Home/Home.css";
import {useEffect, useState} from "react";
import {Coupon} from "../../Models/Coupon.ts";
import companyServices from "../../Services/CompanyServices.ts";
import {Company} from "../../Models/Company.ts";
import {CouponCard} from "./CouponCard.tsx";

interface companyProps {
    currentCompany:Company;
}

export function CompanyHome(props:companyProps): JSX.Element {
    const company = props.currentCompany;
    const[coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        companyServices.getCoupons(company.id)
            .then(res => {
                setCoupons(res);
            })
            .catch(err => alert(err));
    },[]);
    return (
        <div className="CompanyHome">
            {
                coupons.map(coupon => (<CouponCard key= {coupon.id} coupon= {coupon} company={company} />))
            }
        </div>
    );
}