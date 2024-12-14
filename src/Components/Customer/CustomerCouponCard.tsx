import "./Css/CustomerCouponCard.css"
import {Coupon} from "../../Models/Coupon.ts";
import {Customer} from "../../Models/Customer.ts";
import categoryColors from "../../Models/CategoryEnum.tsx";

interface couponProps {
    coupon: Coupon;
    customer: Customer;
}

export function CustomerCouponCard(props:couponProps): JSX.Element {
    const backgroundColor = categoryColors[props.coupon.category] || "#ffffff";


    return (
        <div className="CustomerCouponCard" style={{backgroundColor}} >
                <div className="card-inner">
                    <h2>{props.coupon.title}</h2>
                    <p>id: {props.coupon.id}</p>
                    <p>description: {props.coupon.description}</p>
                    <p>category: {props.coupon.category}</p>
                    <p>startDate: {props.coupon.startDate}</p>
                    <p>endDate: {props.coupon.endDate}</p>
                    <p>price {props.coupon.price}</p>
                    <p>amount: {props.coupon.amount}</p>
                    <p>image: {props.coupon.image}</p>
                </div>
            </div>
            );
            }