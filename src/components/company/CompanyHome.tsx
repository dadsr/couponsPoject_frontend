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

/**
 * The `CompanyHome` component serves as the main interface for a company to manage its coupons.
 * It fetches company details and coupons, provides filtering functionality, and displays coupon cards.
 *
 * @returns {JSX.Element} The rendered CompanyHome page.
 */
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

    /**
     * Updates the sidebar with company details and a button to add new coupons.
     *
     * @param {Company} companyData - The company data to display in the sidebar.
     */
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

    /**
     * Fetches company details and coupons when the component mounts or when the ID changes.
     */
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

    /**
     * Handles navigation to the "Add New Coupon" page with a temporary coupon object.
     *
     * @param {Company} company - The current company data.
     */
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

    /**
     * Renders the main content of the CompanyHome page.
     */
    return (
        <>
            <h1>Company Page</h1>
            <div className="CompanyHome">
                <Filters coupons={companyCoupons} setFilteredCoupons={setFilteredCompanyCoupons}/>
                <br/>
                <h3>Company Coupons</h3>
                <h4>* click for edit or delete</h4>
                <div className="CompanyCoupons">
                    {filteredCompanyCoupons.map(coupon => ((
                        company && (<CompanyCouponCard key={coupon.id} coupon={coupon} company={company}
                                                       handleClickMode="NOTHING"/>)
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
