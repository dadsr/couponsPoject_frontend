import "./Css/CompanyHome.css";

import {useParams} from "react-router-dom";
import {Company} from "../../Models/Company.ts";
import {Coupon} from "../../Models/Coupon.ts";
import companyServices from "../../services/CompanyServices.ts";
import {Filters} from "../filters/Filters.tsx";
import {CompanyCouponCard} from "./CompanyCouponCard.tsx";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";
import {useEffect, useState} from "react";

export function CompanyHome(): JSX.Element {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useParams();
    const id = Number(params.id);

    const [company, setCompany] = useState<Company | null>(null);

    const [companyCoupons, setCompanyCoupons] = useState<Coupon[]>([]);
    const [filteredCompanyCoupons, setFilteredCompanyCoupons] = useState<Coupon[]>([]);

    const { setSidebar } = useSidebarContext();

    const updateSidebar = (comapnyData: Company) => {
        setSidebar({
            buttons: <div>
                <button type="button">New Coupon</button>
            </div>,
            data: (
                <div>
                    <h2>{comapnyData.name} </h2>
                    <p>id: {comapnyData.id}</p>
                    <p>email: {comapnyData.email}</p>
                </div>
            )
        });
    };

    useEffect(() => {
        setIsLoading(true);

        Promise.all([
            companyServices.getCompany(id),
            companyServices.getCoupons(id)
        ])
            .then(([companyData, compCoupons]) => {
                setCompany(companyData);
                updateSidebar(companyData);
                setCompanyCoupons(compCoupons);
                setFilteredCompanyCoupons(compCoupons);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        setError("Error: Company not found");
        return <div>Error: Company not found</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <>
            <div className="CompanyHome">
                <Filters coupons={companyCoupons} setFilteredCoupons={setFilteredCompanyCoupons}/>
                <br/>
                <div className="CompanyCoupons">
                    { filteredCompanyCoupons.map(coupon => ( <CompanyCouponCard key={coupon.id} coupon={coupon} company={company} handleClickMode="NOTHING" />)) }
                </div>
            </div>
        </>
    );

}
