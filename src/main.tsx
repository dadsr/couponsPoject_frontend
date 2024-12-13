import './styles.css';

import {createRoot} from 'react-dom/client'
import App from "./App.tsx";
import {StrictMode} from "react";
import {AuthProvider} from "./Context/AuthContext.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
)
