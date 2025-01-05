import "./Css/CompanyHome.css";

import {useNavigate, useParams} from "react-router-dom";
import {Company} from "../../models/Company.ts";
import {Coupon} from "../../models/Coupon.ts";
import companyServices from "../../services/CompanyServices.ts";
import {Filters} from "../filters/Filters.tsx";
import {CompanyCouponCard} from "./CompanyCouponCard.tsx";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";
import {useCallback, useEffect, useState} from "react";
import {useErrorHandler} from "../../errors/errorHandler.ts";
import ErrorPopup from "../popups/ErrorPop.tsx";

export function CompanyHome(): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const params = useParams();
    const id = Number(params.id);

    const [company, setCompany] = useState<Company | null>(null);

    const [companyCoupons, setCompanyCoupons] = useState<Coupon[]>([]);
    const [filteredCompanyCoupons, setFilteredCompanyCoupons] = useState<Coupon[]>([]);

    const {setSidebar} = useSidebarContext();
    const {error, handleError, closeError} = useErrorHandler();


    const updateSidebar = (comapnyData: Company) => {
        setSidebar({
            buttons: <div>
                <button title="New Coupon" onClick={() => handleNewCoupon(comapnyData)}>New Coupon</button>
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
            .catch((err) => {
                handleError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const handleNewCoupon = useCallback((company: Company) => {
        const temp = new Coupon(0, "", "", id, "DEFAULT", 0, 0, "", "", "assets/coupon-animated.gif");
        navigate("/coupon-edit/" + 0, {
            state: {
                coupon: temp,
                company: company,
                mode: "add"
            }
        });
    }, [id, navigate]);


    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>

            <div className="CompanyHome">
                <Filters coupons={companyCoupons} setFilteredCoupons={setFilteredCompanyCoupons}/>
                <br/>
                <div className="CompanyCoupons">
                    {filteredCompanyCoupons.map(coupon => ((
                        company && (<CompanyCouponCard key={coupon.id} coupon={coupon} company={company} handleClickMode="NOTHING"/>)
                    )))}
                </div>
            </div>

            <ErrorPopup
                open={error.show}
                status={error.status}
                message={error.message}
                onClose={closeError}
            />
        </>
    );

}
