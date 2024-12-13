import { createContext, ReactNode, useContext, useState } from "react";
import ModesEnum from "../Models/ModesEnum.tsx";

// Define the shape of your sidebar data
interface SidebarData {
    mode: ModesEnum;
    buttons:JSX.Element;
    cards: JSX.Element;
}

interface SidebarContextType {
    data: SidebarData;
    setSidebarData: React.Dispatch<React.SetStateAction<SidebarData>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [sidebarData, setSidebarData] = useState<SidebarData>({
        mode: ModesEnum.COMP_COUPONS,
        buttons: <div>Initial Buttons</div>,
        cards: <div>Initial Cards</div>
    });

    return (
        <SidebarContext.Provider value={{ data: sidebarData, setSidebarData }}>
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
