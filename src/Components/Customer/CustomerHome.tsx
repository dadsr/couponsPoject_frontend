import "./Css/CustomerHome.css"
import {Coupon} from "../../Models/Coupon.ts";
import {useParams} from "react-router-dom";
import customerServices from "../../Services/CustomerServices.ts";
import {CustomerCouponCard} from "./CustomerCouponCard.tsx";
import {Customer} from "../../Models/Customer.ts";
import {CustomerCouponsFilters} from "./CustomerCouponsFilters.tsx";
import {useEffect, useState} from "react";


export function CustomerHome(): JSX.Element {

    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const id = Number(params.id);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [customer, setCustomer] = useState<Customer | null>(null);

    const [customerCoupons, setCustomerCoupons] = useState<Coupon[]>([]);
    const [purchaseCoupons, setPurchaseCoupons] = useState<Coupon[]>([]);
    const [filteredCustomerCoupons, setFilteredCustomerCoupons] = useState<Coupon[]>([]);
    const [filteredPurchaseCoupons, setFilteredPurchaseCoupons] = useState<Coupon[]>([]);


    const handlePurchaseSuccess = (couponId: number)=> {
        const purchasedCoupon = purchaseCoupons.find(coupon => coupon.id === couponId);
        if(!purchasedCoupon){
            console.error("Coupon not found in purchaseCoupons");
            return;
        }
        setCustomerCoupons((prev) => [...prev, purchasedCoupon]);
        setPurchaseCoupons((prev) => prev.filter(coupon => coupon.id !== couponId));
    };

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        Promise.all([
            customerServices.getCustomer(id),
            customerServices.getPurchaseCoupons(id)
        ])
            .then(([customerData, purchaseData]) => {
                setCustomer(customerData);
                return customerServices.getCoupons(customerData.id)
                    .then((coupons) => {
                        setCustomerCoupons(coupons);
                        setPurchaseCoupons(purchaseData);
                    });
            })
            .catch((err) => {
                console.error(err)
                setError("Failed to load data. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    },[id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>Error: Customer not found</div>;
    }

    if (error) {
    return <div>{error}</div>;
    }

    return (
        <>
            <div className="CustomerHome">
                <CustomerCouponsFilters coupons={customerCoupons} setFilteredCoupons={setFilteredCustomerCoupons}/> <br/>
                <div className="CustomerCoupons">
                    {
                        filteredCustomerCoupons.map(coupon => (
                            <CustomerCouponCard
                                key={coupon.id}
                                coupon={coupon}
                                customer={customer}
                                handleClickMode="NOTHING"
                            />))
                    }
                </div>
                <br/>
                <br/>
                <CustomerCouponsFilters coupons={purchaseCoupons} setFilteredCoupons={setFilteredPurchaseCoupons}/> <br/>
                <div className="PurchaseCoupons">
                    {
                        filteredPurchaseCoupons.map(coupon => (
                            <CustomerCouponCard
                                key={coupon.id}
                                coupon={coupon}
                                customer={customer}
                                handleClickMode="PURCHASE"
                                onSuccess={handlePurchaseSuccess}
                            />))
                    }
                </div>
            </div>
        </>
    );
}