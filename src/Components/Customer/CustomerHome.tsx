import "./Css/CustomerHome.css"
import {Coupon} from "../../Models/Coupon.ts";
import {useParams} from "react-router-dom";
import customerServices from "../../Services/CustomerServices.ts";
import {CustomerCouponCard} from "./CustomerCouponCard.tsx";
import {Customer} from "../../Models/Customer.ts";
import {CustomerCouponsFilters} from "./CustomerCouponsFilters.tsx";
import {useEffect, useState} from "react";
import {useSidebarContext} from "../../Context/SidebarContext.tsx";
import ModesEnum from "../../Models/ModesEnum.tsx";


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

    const { setSidebarData } = useSidebarContext();



    //for updating coupons list before and after purchase
    useEffect(() => {
        setFilteredCustomerCoupons(customerCoupons);
        setFilteredPurchaseCoupons(purchaseCoupons);

    }, [customerCoupons,purchaseCoupons]);



    const handlePurchaseSuccess = (couponId: number)=> {
        const purchasedCoupon = purchaseCoupons.find(coupon => coupon.id === couponId);
        if(!purchasedCoupon){
            console.error("Coupon not found in purchaseCoupons");
            return;
        }
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

    setSidebarData( {
        mode: ModesEnum.CLINT_DETAILS,
        buttons:<></>,
        cards: <div>
            <h2>client</h2>
            <p>first name: {customer?.firstName}</p>
            <p>last name: {customer?.lastName}</p>
            <p>email: {customer?.email}</p>
        </div>
    });

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
                <CustomerCouponsFilters  coupons={customerCoupons}
                                        setFilteredCoupons={setFilteredCustomerCoupons}/> <br/>
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
                <CustomerCouponsFilters coupons={purchaseCoupons}
                                        setFilteredCoupons={setFilteredPurchaseCoupons}/> <br/>
                <h3>click to purchase</h3>

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