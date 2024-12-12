import {useNavigate} from "react-router-dom";
import {Coupon} from "../../Models/Coupon.ts";
import {Customer} from "../../Models/Customer.ts";

interface couponProps {
    coupon: Coupon;
    customer: Customer;
}

export function CustomerCouponCard(props:couponProps): JSX.Element {
    const navigate =useNavigate()

    return (
        <div className="CustomerCouponCard" onClick={() => navigate("/coupon/" + props.coupon.id)}>
            <h2>{props.coupon.title}</h2>
            <p>id: {props.coupon.id}</p>
            <p>description: {props.coupon.description}</p>
            <p>category: {props.coupon.category}</p>
            <p>startDate: {props.coupon.startDate}</p>
            <p>endDate: {props.coupon.endDate}</p>
            <p>price {props.coupon.price}</p>
            <p>amount: {props.coupon.amount}</p>
        </div>
    );
}