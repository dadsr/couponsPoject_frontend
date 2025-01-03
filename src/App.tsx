import './App.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import {BrowserRouter} from 'react-router-dom'
import {Routing} from "./components/Routing/Routing.tsx";
import {Header} from "./components/Header/Header.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header/>
                {/*<Sidebar/>*/}
                <Routing/>
            </BrowserRouter>
        </AuthProvider>

    )
}

export default App
