import React, { createContext, useContext, useState } from "react";

export interface SidebarData {
    buttons:JSX.Element,
    data: JSX.Element
}

interface SidebarContextProps {
    data: SidebarData;
    setSidebar: React.Dispatch<React.SetStateAction<SidebarData>>;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarData, setSidebarData] = useState<SidebarData>({
        buttons: <div></div>,
        data: <div></div>
    } );
    return (
        <SidebarContext.Provider value={{ data: sidebarData, setSidebar: setSidebarData }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebarContext must be used within a SidebarProvider");
    }
    return context;
};