import "./Css/CustomerHome.css"

import {Coupon} from "../../models/Coupon.ts";
import {useParams} from "react-router-dom";
import {CustomerCouponCard} from "./CustomerCouponCard.tsx";
import {Customer} from "../../models/Customer.ts";
import customerServices from "../../services/CustomerServices.ts";
import {Filters} from "../filters/Filters.tsx";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";
import {useErrorHandler} from "../../errors/errorHandler.ts";
import ErrorPopup from "../popups/ErrorPop.tsx";
import {useEffect, useState} from "react";

/**
 * `CustomerHome` Component
 * @description Displays customer details, available coupons, and purchaseable coupons.
 * It also handles coupon filtering and purchasing logic.
 *
 * @returns {JSX.Element} The JSX element representing the customer home page.
 */
export function CustomerHome(): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useParams();
    const id = Number(params.id);

    const [customer, setCustomer] = useState<Customer | null>(null);

    const [customerCoupons, setCustomerCoupons] = useState<Coupon[]>([]);
    const [purchaseCoupons, setPurchaseCoupons] = useState<Coupon[]>([]);

    const [filteredCustomerCoupons, setFilteredCustomerCoupons] = useState<Coupon[]>([]);
    const [filteredPurchaseCoupons, setFilteredPurchaseCoupons] = useState<Coupon[]>([]);

    const {setSidebar} = useSidebarContext();
    const {error, handleError, closeError} = useErrorHandler();

    /**
     * Updates the sidebar with customer-specific information.
     * @param {Customer} customerData - The customer data to display in the sidebar.
     */
    const updateSidebar = (customerData: Customer) => {
        setSidebar({
            buttons: <div></div>,
            data: (
                <div>
                    <h2>{customerData.firstName} {customerData.lastName}</h2>
                    <p>id: {customerData.id}</p>
                    <p>email: {customerData.email}</p>
                </div>
            )
        });
    };

    /**
     * Fetches customer data and updates state variables on component mount or when `id` changes.
     */
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            customerServices.getCustomer(id),
            customerServices.getCoupons(id),
            customerServices.getPurchaseCoupons(id)
        ])
            .then(([customerData, couponsData, purchaseData]) => {
                setCustomer(customerData);
                updateSidebar(customerData);
                setCustomerCoupons(couponsData);
                setPurchaseCoupons(purchaseData);
                //for updating coupons list before and after purchase
                setFilteredCustomerCoupons(() => [...couponsData]);
                setFilteredPurchaseCoupons(() => [...purchaseData]);
            })
            .catch((err) => handleError(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    /**
     * Handles successful coupon purchases by updating state variables.
     * @param {number} couponId - The ID of the purchased coupon.
     */
    const handlePurchaseSuccess = (couponId: number) => {
        const purchasedCoupon = purchaseCoupons.find(coupon => coupon.id === couponId);

        if (!purchasedCoupon) {
            console.error("Coupon not found in purchaseCoupons");
            handleError("Coupon not found in purchaseCoupons");
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

        setFilteredCustomerCoupons((prev) => [...prev, {...purchasedCoupon}]);
        setFilteredPurchaseCoupons((prev) => prev.filter(coupon => coupon.id !== couponId));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="CustomerHome">
                <h2>Customer Page</h2>
                <h5>Customer Coupons</h5>
<span>
                <Filters coupons={customerCoupons} setFilteredCoupons={setFilteredCustomerCoupons}/>
</span>
                <div className="CustomerCoupons">
                    {filteredCustomerCoupons.length > 0 ?
                        (filteredCustomerCoupons.map(coupon => (
                                <CustomerCouponCard
                                    key={coupon.id}
                                    coupon={coupon}
                                    customer={customer!}
                                    handleClickMode="NOTHING"
                                    setError={handleError}
                                />))
                        )
                        : (<div>No Coupons Available For You</div>)
                    }
                </div>
                <br/>
                <h5>Purchase Coupons</h5>

               <span> <Filters coupons={purchaseCoupons}
                         setFilteredCoupons={setFilteredPurchaseCoupons}/> </span>
                <h6>* click to purchase</h6>
                <div className="PurchaseCoupons">
                    {filteredPurchaseCoupons.length > 0 ?
                        (filteredPurchaseCoupons.map(coupon => (
                                <CustomerCouponCard
                                    key={coupon.id}
                                    coupon={coupon}
                                    customer={customer!}
                                    handleClickMode="PURCHASE"
                                    onSuccess={handlePurchaseSuccess}
                                    setError={handleError}
                                />))
                        )
                        : (<div>No Coupons Available For Purchase</div>)
                    }
                </div>
            </div>

            <ErrorPopup
                open={error.show}
                status={error.status}
                message={error.message}
                onClose={closeError}
            />
        </>
    )
}