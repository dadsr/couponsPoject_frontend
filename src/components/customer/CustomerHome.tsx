import "./Css/CustomerHome.css"


import {Coupon} from "../../Models/Coupon.ts";
import {useParams} from "react-router-dom";
import {CustomerCouponCard} from "./CustomerCouponCard.tsx";
import {Customer} from "../../Models/Customer.ts";
import {useEffect, useState} from "react";
import customerServices from "../../services/CustomerServices.ts";
import {Filters} from "../filters/Filters.tsx";

export function CustomerHome(): JSX.Element {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useParams();
    const id = Number(params.id);

    const [customer, setCustomer] = useState<Customer | null>(null);

    const [customerCoupons, setCustomerCoupons] = useState<Coupon[]>([]);
    const [purchaseCoupons, setPurchaseCoupons] = useState<Coupon[]>([]);

    const [filteredCustomerCoupons, setFilteredCustomerCoupons] = useState<Coupon[]>([]);
    const [filteredPurchaseCoupons, setFilteredPurchaseCoupons] = useState<Coupon[]>([]);


    useEffect(() => {
        setIsLoading(true);
        setError(null);

        Promise.all([
            customerServices.getCustomer(id),
            customerServices.getCoupons(id),
            customerServices.getPurchaseCoupons(id)
        ])
            .then(([customerData, couponsData, purchaseData]) => {
                setCustomer(customerData);
                setCustomerCoupons(couponsData);
                setPurchaseCoupons(purchaseData);
                //for updating coupons list before and after purchase
                setFilteredCustomerCoupons(()=> [...couponsData]);
                setFilteredPurchaseCoupons(()=> [...purchaseData]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);


    const handlePurchaseSuccess = (couponId: number) => {
        const purchasedCoupon = purchaseCoupons.find(coupon => coupon.id === couponId);

        if (!purchasedCoupon) {
            console.error("Coupon not found in purchaseCoupons");
            setError("Coupon not found in purchaseCoupons");
            return;
        }
        purchasedCoupon.amount--;

        setCustomerCoupons((prev) => {
            const updated = [...prev, purchasedCoupon];
            console.log("Updated customer coupons:", updated);
            return updated;
        });
        setPurchaseCoupons((prev) => {
            const updated = prev.filter(coupon => coupon.id !== couponId);
            console.log("Updated purchase coupons:", updated);
            return updated;
        });

        setFilteredCustomerCoupons((prev) => [...prev, { ...purchasedCoupon }]);
        setFilteredPurchaseCoupons((prev) => prev.filter(coupon => coupon.id !== couponId));

        if (error) {
            console.error("XXX");
            return;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        setError("Error: Customer not found");
        return <div>Error: Customer not found</div>;

    }

    return (
        <>
            <div className="CustomerHome">
                <Filters coupons={customerCoupons}
                         setFilteredCoupons={setFilteredCustomerCoupons}/> <br/>
                <div className="CustomerCoupons">
                    {filteredCustomerCoupons.length > 0 ?
                        (filteredCustomerCoupons.map(coupon => (
                                <CustomerCouponCard
                                    key={coupon.id}
                                    coupon={coupon}
                                    customer={customer}
                                    handleClickMode="NOTHING"
                                    setError={setError}
                                />))
                        )
                        : (<div>No Coupons Available For You</div>)
                    }
                </div>
                <br/>
                <br/>
                <Filters coupons={purchaseCoupons}
                         setFilteredCoupons={setFilteredPurchaseCoupons}/> <br/>
                <h3>click to purchase</h3>

                <div className="PurchaseCoupons">
                    {filteredPurchaseCoupons.length > 0 ?
                        (filteredPurchaseCoupons.map(coupon => (
                                <CustomerCouponCard
                                    key={coupon.id}
                                    coupon={coupon}
                                    customer={customer}
                                    handleClickMode="PURCHASE"
                                    onSuccess={handlePurchaseSuccess}
                                    setError={setError}
                                />))
                        )
                        : (<div>No Coupons Available For Purchase</div>)
                    }
                </div>
            </div>
        </>
    )
}