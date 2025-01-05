import "./Css/CustomerCouponCard.css"

import {Coupon} from "../../models/Coupon.ts";
import {Customer} from "../../models/Customer.ts";
import categoryColors from "../../models/CategoryEnum.tsx";

import customerServices from "../../services/CustomerServices.ts";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";
import React from "react";

interface couponProps {
    coupon: Coupon;
    customer: Customer;
    handleClickMode: "PURCHASE" | "NOTHING";
    onSuccess?: (couponId: number) => void;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function CustomerCouponCard(props: couponProps): JSX.Element {
    const {setSidebar} = useSidebarContext();
    const backgroundColor = categoryColors[props.coupon.category] || "#ffffff";

    const updateSidebar = () => {
        setSidebar({
            buttons:
                (
                    <div></div>
                ),
            data: <div>
                <h2>{props.customer.firstName} {props.customer.lastName}</h2>
                <p>id: {props.customer.id}</p>
                <p>email: {props.customer.email}</p>
                <h3>your last purchase :</h3>
                <img
                    src={import.meta.env.BASE_URL + props.coupon.image}
                    alt="Coupon"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        marginTop: '10px'
                    }}
                />
            </div>
        });
    };


    const handlePurchase = () => {
        if (props.handleClickMode === "PURCHASE") {
            customerServices.postCouponPurchase(props.customer.id, props.coupon.id)
                .then(() => {
                    if (props.onSuccess) {
                        props.onSuccess(props.coupon.id);
                    }
                    updateSidebar();
                })
                .catch((res) => {
                    console.log(res)
                    props.setError("Failed to complete purchase. Please try again later.");
                })
        }
    };

    return (
        <div className="CustomerCouponCard" style={{backgroundColor}}>
            <div className="card-inner" onClick={handlePurchase}>
                <h2>{props.coupon.title}</h2>
                <p>id: {props.coupon.id}</p>
                <p>description: {props.coupon.description}</p>
                <p>category: {props.coupon.category}</p>
                <p>startDate: {props.coupon.startDate}</p>
                <p>endDate: {props.coupon.endDate}</p>
                <p>price: {props.coupon.price}</p>
                <p>amount: {props.coupon.amount}</p>
                <p>image: {props.coupon.image}</p>
            </div>
        </div>
    );
}