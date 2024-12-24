import { useLocation } from "react-router-dom";
import { CompanyCouponEdit } from "./CompanyCouponEdit";
import { Coupon } from "../../Models/Coupon";
import { Company } from "../../Models/Company";

interface LocationState {
    couponData: Coupon | null;
    companyData: Company;
    editMode: string;
}

const CompanyCouponEditWrapper = (): JSX.Element | null => {
    const location = useLocation();
    const { couponData, companyData, editMode } = location.state as LocationState || {};

    if (!couponData || !companyData || !editMode) {
        return <div>Error: Missing required data for editing.</div>;
    }

    return (
        <CompanyCouponEdit
            coupon={couponData}
            company={companyData}
            editMode={editMode}
        />
    );
};

export default CompanyCouponEditWrapper;
