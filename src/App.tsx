import './App.css'
import { BrowserRouter } from 'react-router-dom'
import {Routing} from "./Components/Routing/Routing.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routing/>
      </BrowserRouter>
  )
}

export default App
