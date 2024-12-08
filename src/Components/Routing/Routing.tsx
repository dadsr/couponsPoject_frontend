import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login.tsx";
import {AdminHome} from "../Home/AdminHome.tsx";
import {CompanyHome} from "../Home/CompanyHome.tsx";
import {CustomerHome} from "../Home/CustomerHome.tsx";

export function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path = "/" Component={Login}/>
            <Route path = "/admin/home" Component={AdminHome}/>
            <Route path = "/company/home" Component={CompanyHome}/>
            <Route path = "/customer/home" Component={CustomerHome}/>
        </Routes>
    );
}