import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login.tsx";
import {CustomerHome} from "../Customer/CustomerHome.tsx";
import {CompanyHome} from "../Company/CompanyHome.tsx";
import {CompanyCouponEdit} from "../Company/CompanyCouponEdit.tsx";
import {AdminHome} from "../Administrator/AdminHome.tsx";
import {AdminCompanyEdit} from "../Administrator/AdminCompanyEdit.tsx";
import {AdminCustomerEdit} from "../Administrator/AdminCustomerEdit.tsx";

export function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path = "/" Component={Login}/>
            <Route path = "/login" Component={Login}/>

            <Route path = "/admin" Component={AdminHome}/>
            <Route path = "admin/company/:id" Component={AdminCompanyEdit}/>
            <Route path = "admin/customer/:id" Component={AdminCustomerEdit}/>


            <Route path = "/company/:id" Component={CompanyHome}/>
            <Route path="/coupon/:id" Component={CompanyCouponEdit}/>

            <Route path = "/customer/:id" Component={CustomerHome}/>


        </Routes>
    );
}