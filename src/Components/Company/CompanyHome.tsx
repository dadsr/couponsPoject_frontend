import "./Css/CompanyHome.css"
import {useEffect, useState} from "react";
import {CompanyCouponCard} from "./CompanyCouponCard.tsx";
import {Coupon} from "../../Models/Coupon.ts";
import {Company} from "../../Models/Company.ts";
import {useSidebarContext} from "../../Context/SidebarContext.tsx";
import companyServices from "../../Services/CompanyServices.ts";
import {useNavigate, useParams} from "react-router-dom";
import ModesEnum from "../../Models/ModesEnum.tsx";
import {CouponsFilters} from "../Filters/CouponsFilters.tsx";


export function CompanyHome(): JSX.Element {
        const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useParams();
    const id = Number(params.id);

    const [company, setCompany] = useState<Company | null>(null);

    const [companyCoupons, setCompanyCoupons] = useState<Coupon[]>([]);
    const [filteredCompanyCoupons, setFilteredCompanyCoupons] = useState<Coupon[]>([]);

    const { setSidebarData } = useSidebarContext();




    useEffect(() => {
        setIsLoading(true);
        setError(null);

        Promise.all([
            companyServices.getCompany(id),
            companyServices.getCoupons(id)
        ])
            .then(([companyData, compCoupons]) => {
                setCompany(companyData);
                setCompanyCoupons(compCoupons);
                setFilteredCompanyCoupons(compCoupons);
            })
            .catch((err) =>{
                console.error(err);
                setError("Failed to load data. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    },[id]);

    const handleNewCoupon = () => {
        const temp = new Coupon(0,"","",0,"DEFAULT", 0,0,"","","");
        navigate("/coupon/" + 0,{state: { couponData: temp }});
    };
    useEffect(() => {
        setSidebarData({
            mode: ModesEnum.COMP_DETAILS,
            buttons: <>
                <button title="New" onClick={handleNewCoupon}>New Coupon</button>
            </>,
            cards: <div>
                <h2>Company</h2>
                <p>name: {company?.name}</p>
                <p>email: {company?.email}</p>
            </div>
        });
    }, [company, setSidebarData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        return <div>Error: Company not found</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="CompanyHome">
                <CouponsFilters coupons={companyCoupons}
                                setFilteredCoupons={setFilteredCompanyCoupons}/> <br/>
                <div className="CompanyCoupons">
                    {
                        filteredCompanyCoupons.map(coupon => (
                            <CompanyCouponCard
                                key={coupon.id}
                                coupon={coupon}
                                company={company}
                                handleClickMode="NOTHING"
                            />)
                        )
                    }
                </div>
            </div>
        </>
    );


}
