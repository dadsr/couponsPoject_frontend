import {Route, Routes} from "react-router-dom";
import {AdminHome} from "../administrator/AdminHome.tsx";
import {AdminCompanyEdit} from "../administrator/AdminCompanyEdit.tsx";
import {AdminCustomerEdit} from "../administrator/AdminCustomerEdit.tsx";
import {Login} from "../login/Login.tsx";
import {CompanyHome} from "../company/CompanyHome.tsx";
import {CustomerHome} from "../customer/CustomerHome.tsx";
import {CompanyCouponEdit} from "../company/CompanyCouponEdit.tsx";
import {PageNotFound} from "../../errors/PageNotFound.tsx";



export function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path = "/" Component={Login}/>
            <Route path = "/login" Component={Login}/>

            <Route path = "/admin" Component={AdminHome}/>
            <Route path = "/company/:id" Component={CompanyHome}/>
            <Route path = "/customer/:id" Component={CustomerHome}/>


            <Route path = "/admin/company-edit/:id" Component={AdminCompanyEdit}/>
            <Route path = "/admin/customer-edit/:id" Component={AdminCustomerEdit}/>
            <Route path="/coupon-edit/:id" Component={CompanyCouponEdit}/>

            <Route path="*" Component={PageNotFound} />
        </Routes>
    );
}