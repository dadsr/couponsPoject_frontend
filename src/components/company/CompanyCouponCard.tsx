import "./Css/CompanyCouponCard.css";

import {Company} from "../../models/Company.ts";
import {Coupon} from "../../models/Coupon.ts";
import {useNavigate} from "react-router-dom";
import categoryColors from "../../models/CategoryEnum.tsx";

interface couponProps {
    coupon: Coupon;
    company: Company;
    handleClickMode:  "PURCHASE" | "NOTHING";
    onSuccess?:(couponId: number) => void;
}

export function CompanyCouponCard(props: couponProps): JSX.Element {
    const backgroundColor = categoryColors[props.coupon.category] || "#ffffff";
    const navigate = useNavigate();


    const handleClick = () => {
        props.coupon.companyId = props.company.id;
        navigate("/coupon-edit/" + props.coupon.id,
            {
                state: {
                    coupon: props.coupon,
                    company: props.company,
                    mode: "edit"
                },
            }
        );
    };

    return (
        <div className="CouponCard" style={{ backgroundColor }} onClick={handleClick} >
            <div className="card-inner">
                <h2>{props.coupon.title}</h2>
                <p>id: {props.coupon.id}</p>
                <p>description: {props.coupon.description}</p>
                <p>category: {props.coupon.category}</p>
                <p>startDate: {props.coupon.startDate}</p>
                <p>endDate: {props.coupon.endDate}</p>
                <p>price {props.coupon.price}</p>
                <p>amount: {props.coupon.amount}</p>
                <p>company: {props.company.name}</p>
                <p>image: {props.coupon.image}</p>
            </div>
        </div>
    );
}
