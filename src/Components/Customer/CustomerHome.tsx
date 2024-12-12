import {useEffect, useState} from "react";
import {Coupon} from "../../Models/Coupon.ts";
import {useParams} from "react-router-dom";
import customerServices from "../../Services/CustomerServices.ts";
import {CustomerCouponCard} from "./CustomerCouponCard.tsx";
import {Customer} from "../../Models/Customer.ts";

export function CustomerHome(): JSX.Element {
    const params = useParams();
    const id = Number(params.id);

    const[customer, setCustomer] = useState<Customer>();
    const[coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        customerServices.getCustomer(id)
            .then(res =>{
                setCustomer(res);
                customerServices.getCoupons(res.id)
                    .then(res => {
                        setCoupons(res);
                    })
                    .catch(err => alert(err));
            })
            .catch(res => console.log(res))
            .finally(() => setLoading(false));
    },[id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>Error: Company not found</div>;
    }
    return (
        <>
            <div className="CustomerHome">
                {
                    coupons.map(coupon => (<CustomerCouponCard key= {coupon.id} coupon= {coupon} customer={customer} />))
                }
            </div>
        </>
    );
}