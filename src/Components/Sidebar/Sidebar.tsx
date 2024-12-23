import React from "react";
import "./Sidebar.css";
import { useSidebarContext } from "../../Context/SidebarContext.tsx";

//todo new  card
//todo filters
const Sidebar: React.FC = () => {
    const { data } = useSidebarContext();

    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            {data ? (
                <>
                    <div className="sidebar-buttons">
                        {data.buttons}
                    </div>
                    <div className="sidebar-cards">
                        {data.cards}
                    </div>
                </>
            ) : (<></>)}
        </div>
    );
};

export default Sidebar;
