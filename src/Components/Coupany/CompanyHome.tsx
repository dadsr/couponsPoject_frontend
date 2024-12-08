import "../Home/Home.css";
import {useEffect, useState} from "react";
import {Coupon} from "../../Models/Coupon.ts";
import companyServices from "../../Services/CompanyServices.ts";
import {Company} from "../../Models/Company.ts";
import {CouponCard} from "./CouponCard.tsx";
import {useParams} from "react-router-dom";



export function CompanyHome(): JSX.Element {
    const params = useParams();
    const id = Number(params.id);
    const[company, setCompany] = useState<Company>();
    const[coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        companyServices.getCompany(id)
            .then(res =>{
                setCompany(res);
                companyServices.getCoupons(res.id)
                    .then(res => {
                        setCoupons(res);
                    })
                    .catch(err => alert(err));
            })
            .catch(res => console.log(res));
    },[]);
    return (
        <div className="CompanyHome">
            {
                coupons.map(coupon => (<CouponCard key= {coupon.id} coupon= {coupon} company={company!} />))
            }
        </div>
    );
}