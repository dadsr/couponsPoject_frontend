import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {Routing} from "./components/Routing/Routing.tsx";

function App() {
    return (
        <BrowserRouter>
            {/*<Header/>*/}
            {/*<Sidebar/>*/}
            <Routing/>
        </BrowserRouter>
    )
}

export default App
