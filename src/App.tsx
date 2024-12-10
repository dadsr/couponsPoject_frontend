import {Routing} from "./Components/Routing/Routing.tsx";
import {BrowserRouter} from "react-router-dom";
import {Header} from "./Components/Header/Header.tsx";

function App() {

    return (
                <BrowserRouter>
                    <Header/>
                    <Routing/>
                </BrowserRouter>

    )
}

export default App
