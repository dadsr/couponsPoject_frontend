import "./Css/CustomerCouponCard.css"

import {Coupon} from "../../Models/Coupon.ts";
import {Customer} from "../../Models/Customer.ts";
import categoryColors from "../../Models/CategoryEnum.tsx";

import customerServices from "../../services/CustomerServices.ts";

interface couponProps {
    coupon: Coupon;
    customer: Customer;
    handleClickMode: "PURCHASE" | "NOTHING";
    onSuccess?: (couponId: number) => void;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function CustomerCouponCard(props: couponProps): JSX.Element {
    const backgroundColor = categoryColors[props.coupon.category] || "#ffffff";


    const handleClick = () => {
        if (props.handleClickMode === "PURCHASE") {
            customerServices.postCouponPurchase(props.customer.id, props.coupon.id)
                .then(() => {
                    if (props.onSuccess) {
                        props.onSuccess(props.coupon.id);
                    }

                })
                .catch((res) => {
                    console.log(res)
                    props.setError("Failed to complete purchase. Please try again later.");
                })
        }
    };

    return (
        <div className="CustomerCouponCard" style={{backgroundColor}}>
            <div className="card-inner" onClick={handleClick}>
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