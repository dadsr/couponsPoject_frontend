import "./Css/CompanyHome.css"
import {Coupon} from "../../Models/Coupon.ts";
import companyServices from "../../Services/CompanyServices.ts";
import {Company} from "../../Models/Company.ts";
import {CompanyCouponCard} from "./CompanyCouponCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSidebarContext} from "../../Context/SidebarContext.tsx";
import ModesEnum from "../../Models/ModesEnum.tsx";


// todo add filter by category/price/date
//todo new  not working
export function CompanyHome(): JSX.Element {
    const navigate = useNavigate();
    const { setSidebarData } = useSidebarContext();

    const params = useParams();
    const id = Number(params.id);

    const[company, setCompany] = useState<Company  | null>(null);
    const[coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        companyServices
            .getCompany(id)
            .then(res =>{
                setCompany(res);
                return companyServices.getCoupons(res.id)
            })
            .then((couponsRes) =>{
                setCoupons(couponsRes);
            })
            .catch(res => console.log(res))
            .finally(() => {
                    setLoading(false);
                }
            );
    },[id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        return <div>Error: Company not found</div>;
    }

    const handleNewCoupon = () => {
        const temp = new Coupon(0,"","",company.id,"DEFAULT", 0,0,"","","");
        navigate("/coupon/" + 0,{state: { couponData: temp }});
    };

    setSidebarData( {
        mode: ModesEnum.COMP_COUPONS,
        buttons: <button title="New" onClick={handleNewCoupon}>New Coupon</button>,
        cards: (
            <>
                {coupons.map(coupon => (
                    <CompanyCouponCard key={coupon.id} coupon={coupon} company={company!} />
                ))}
            </>
        )
    });


    return (
        <>

            <button title="New" onClick={handleNewCoupon}>New Coupon</button>

            <div className="CompanyHome">
                {
                    coupons.map(coupon => (
                        <CompanyCouponCard key={coupon.id} coupon={coupon} company={company}/>
                    ))
                }
            </div>

        </>
    );
}