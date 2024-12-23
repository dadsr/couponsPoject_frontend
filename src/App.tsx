import {Routing} from "./Components/Routing/Routing.tsx";
import {BrowserRouter} from "react-router-dom";
import {Header} from "./Components/Header/Header.tsx";
import {SidebarProvider} from "./Context/SidebarContext.tsx";
import Sidebar from "./Components/Sidebar/Sidebar.tsx";
import ErrorBoundary from "./Services/ErrorHandling/ErrorBoundary.tsx";

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <SidebarProvider>
                    <div id="root">
                        <Header />
                        <div className="app-container">
                            <Sidebar />
                            <div className="content">
                                <Routing />
                            </div>
                        </div>
                    </div>
                </SidebarProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;
