import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login.tsx";
import {AdminHome} from "../Home/AdminHome.tsx";
import {CompanyHome} from "../Coupany/CompanyHome.tsx";
import {CustomerHome} from "../Home/CustomerHome.tsx";
import {CouponEdit} from "../Coupany/CouponEdit.tsx";

export function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path = "/" Component={Login}/>
            <Route path = "/admin" Component={AdminHome}/>
            <Route path = "/company/:id" Component={CompanyHome}/>
            <Route path="/coupon/:id" Component={CouponEdit}/>

            <Route path = "/customer/:id" Component={CustomerHome}/>
        </Routes>
    );
}