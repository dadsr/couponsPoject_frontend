import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login.tsx";

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