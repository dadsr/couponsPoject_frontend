import "./Css/CustomerHome.css"
import {Coupon} from "../../Models/Coupon.ts";
import {useParams} from "react-router-dom";
import customerServices from "../../Services/CustomerServices.ts";
import {CustomerCouponCard} from "./CustomerCouponCard.tsx";
import {Customer} from "../../Models/Customer.ts";
import {CustomerCouponsFilters} from "./CustomerCouponsFilters.tsx";
import {useEffect, useState} from "react";


export function CustomerHome(): JSX.Element {
    const params = useParams();
    const id = Number(params.id);

    const[customer, setCustomer] = useState<Customer>();
    const[customerCoupons, setCustomerCoupons] = useState<Coupon[]>([]);
    const[customerFilterdCoupons, setCustomerFilterdCoupons] = useState<Coupon[]>([]);
    const [loadingCustomerCoupons, setLoadingCustomerCoupons] = useState<boolean>(true);

    const[purchaseCoupons, setPurchaseCoupons] = useState<Coupon[]>([]);
    const[purchaseFilteredCoupons, setPurchaseFilteredCoupons] = useState<Coupon[]>([]);
    const [loadingPurchaseCoupons, setLoadingPurchaseCoupons] = useState<boolean>(true);

    useEffect(() => {
        setLoadingCustomerCoupons(true);
        setLoadingPurchaseCoupons(true);

        //customer coupons
        customerServices
            .getCustomer(id)
            .then(res => {
                setCustomer(res);
                return customerServices.getCoupons(res.id)
            })
            .then(res =>{
                setCustomerCoupons(res);
                setCustomerFilterdCoupons(res);
            })
            .catch(res => console.log(res))
            .finally(() => {
                setLoadingCustomerCoupons(false);
            });
        //purchase coupons
        customerServices
            .getCouponsToPurchase(id)
            .then(res =>{
                setPurchaseCoupons(res);
                setPurchaseFilteredCoupons(res);
            })
            .catch(res => console.log(res))
            .finally(() => {
                setLoadingPurchaseCoupons(false);
            });
    },[id]);

    if (loadingCustomerCoupons && loadingPurchaseCoupons) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>Error: Customer not found</div>;
    }


    return (
        <>
            <div className="CustomerHome">
                <CustomerCouponsFilters coupons={customerCoupons} setCoupons={setCustomerFilterdCoupons}/> <br/>
                <div className="CustomerCoupons">
                    {
                        customerFilterdCoupons.map(coupon => (
                            <CustomerCouponCard key={coupon.id} coupon={coupon} customer={customer}/>))
                    }
                </div>
                <br/>
                <br/>
                <CustomerCouponsFilters coupons={purchaseCoupons} setCoupons={setPurchaseFilteredCoupons}/> <br/>
                <div className="PurchaseCoupons">
                    {
                        purchaseFilteredCoupons.map(coupon => (
                            <CustomerCouponCard key={coupon.id} coupon={coupon} customer={customer}/>))
                    }
                </div>
            </div>
        </>
    );
}