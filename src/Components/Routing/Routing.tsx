import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login.tsx";
import {AdminHome} from "../Administrator/AdminHome.tsx";
import {CompanyHome} from "../Company/CompanyHome.tsx";
import {CustomerHome} from "../Customer/CustomerHome.tsx";
import {CouponEdit} from "../Company/CouponEdit.tsx";

export function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path = "/login" Component={Login}/>
            <Route path = "/admin" Component={AdminHome}/>
            <Route path = "/company/:id" Component={CompanyHome}/>
            <Route path="/coupon/:id" Component={CouponEdit}/>

            <Route path = "/customer/:id" Component={CustomerHome}/>
        </Routes>
    );
}