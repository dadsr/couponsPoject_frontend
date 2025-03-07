import {AuthProvider} from "./contexts/AuthContext.tsx";
import {SidebarProvider} from "./contexts/SidebarContext.tsx";
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./components/Routing/Routing.tsx";
import {Header} from "./components/Header/Header.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";


function App() {
    return (
        <AuthProvider>
            <SidebarProvider>
                <BrowserRouter>
                    <Header/>
                    <Sidebar/>
                    <Routing/>
                </BrowserRouter>
            </SidebarProvider>
        </AuthProvider>
    )
}

export default App
