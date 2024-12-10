import {Company} from "../../Models/Company.ts";
import {Coupon} from "../../Models/Coupon.ts";
import {useNavigate} from "react-router-dom";

interface couponProps {
    coupon: Coupon;
    company: Company;
}

export function CouponCard(props:couponProps): JSX.Element {
    const navigate =useNavigate()

    return (
        <div className="CouponCard" onClick={() => navigate("/coupon/" + props.coupon.id)}>
            <h2>{props.coupon.title}</h2>
            <p>id: {props.coupon.id}</p>
            <p>description: {props.coupon.description}</p>
            <p>category: {props.coupon.category}</p>
            <p>startDate: {props.coupon.startDate}</p>
            <p>endDate: {props.coupon.endDate}</p>
            <p>price {props.coupon.price}</p>
            <p>amount: {props.coupon.amount}</p>
            <p>company: {props.company.name}</p>
        </div>
    );
}